import {
  Currency,
  CurrencyAmount,
  currencyEquals,
  JSBI,
  Percent,
  Token,
  TradeType,
} from "@bionswap/core-sdk";
import { ONE_HUNDRED_PERCENT, ZERO_PERCENT } from "constants/common";
import { BigNumber } from "ethers";
import { Trade } from "types";

// returns whether tradeB is better than tradeA by at least a threshold percentage amount
export function isTradeBetter(
  tradeA: Trade | undefined | null,
  tradeB: Trade | undefined | null,
  minimumDelta: Percent = ZERO_PERCENT
): boolean | undefined {
  if (tradeA && !tradeB) return false;
  if (tradeB && !tradeA) return true;
  if (!tradeA || !tradeB) return undefined;

  if (
    tradeA.tradeType !== tradeB.tradeType ||
    !tradeA.inputAmount.currency.equals(tradeB.inputAmount.currency) ||
    !tradeB.outputAmount.currency.equals(tradeB.outputAmount.currency)
  ) {
    throw new Error("Comparing incomparable trades");
  }

  if (minimumDelta.equalTo(ZERO_PERCENT)) {
    return tradeA.executionPrice.lessThan(tradeB.executionPrice);
  } else {
    return tradeA.executionPrice.asFraction
      .multiply(minimumDelta.add(ONE_HUNDRED_PERCENT))
      .lessThan(tradeB.executionPrice);
  }
}

export function computeFiatValuePriceImpact(
  fiatValueInput: CurrencyAmount<Token> | undefined | null,
  fiatValueOutput: CurrencyAmount<Token> | undefined | null
): Percent | undefined {
  if (!fiatValueOutput || !fiatValueInput) return undefined;
  if (!fiatValueInput.currency.equals(fiatValueOutput.currency))
    return undefined;
  if (JSBI.equal(fiatValueInput.quotient, JSBI.BigInt(0))) return undefined;
  const pct = ONE_HUNDRED_PERCENT.subtract(
    fiatValueOutput.divide(fiatValueInput)
  );
  return new Percent(pct.numerator, pct.denominator);
}

// add 20%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000 + 2000)).div(BigNumber.from(10000));
}

/**
 * Returns true if the trade requires a confirmation of details before we can submit it
 * @param tradeA trade A
 * @param tradeB trade B
 */
export function tradeMeaningfullyDiffers(
  tradeA: Trade,
  tradeB: Trade
): boolean {
  return (
    tradeA.tradeType !== tradeB.tradeType ||
    !currencyEquals(tradeA.inputAmount.currency, tradeB.inputAmount.currency) ||
    !tradeA.inputAmount.equalTo(tradeB.inputAmount) ||
    !currencyEquals(
      tradeA.outputAmount.currency,
      tradeB.outputAmount.currency
    ) ||
    !tradeA.outputAmount.equalTo(tradeB.outputAmount)
  );
}
