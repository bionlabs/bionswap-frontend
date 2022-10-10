import { createReducer } from "@reduxjs/toolkit";

import {
  Field,
  replaceSwapState,
  selectCurrency,
  setRecipient,
  setFees,
  setMaxFee,
  setPriorityFee,
  switchCurrencies,
  typeInput,
} from "./actions";

export interface SwapState {
  readonly independentField: Field;
  readonly typedValue: string;
  readonly [Field.INPUT]: {
    readonly currencyId: string | undefined;
  };
  readonly [Field.OUTPUT]: {
    readonly currencyId: string | undefined;
  };
  // the typed recipient address or ENS name, or null if swap should go to sender
  readonly recipient?: string;
  readonly maxFee?: string;
  readonly maxPriorityFee?: string;
}

const initialState: SwapState = {
  independentField: Field.INPUT,
  typedValue: "",
  [Field.INPUT]: {
    currencyId: "",
  },
  [Field.OUTPUT]: {
    currencyId: "",
  },
  recipient: undefined,
  maxFee: undefined,
  maxPriorityFee: undefined,
};

export default createReducer<SwapState>(initialState, (builder) =>
  builder
    .addCase(
      replaceSwapState,
      (
        state,
        { payload: { typedValue, field, inputCurrencyId, outputCurrencyId } }
      ) => {
        return {
          [Field.INPUT]: {
            currencyId: inputCurrencyId,
          },
          [Field.OUTPUT]: {
            currencyId: outputCurrencyId,
          },
          independentField: field,
          typedValue: typedValue,
        };
      }
    )
    .addCase(setRecipient, (state, { payload: recipient }) => {
      state.recipient = recipient;
    })
    .addCase(selectCurrency, (state, { payload: { currencyId, field } }) => {
      const otherField = field === Field.INPUT ? Field.OUTPUT : Field.INPUT;
      if (currencyId === state[otherField].currencyId) {
        // the case where we have to swap the order
        return {
          ...state,
          independentField:
            state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
          [field]: { currencyId: currencyId },
          [otherField]: { currencyId: state[field].currencyId },
        };
      } else {
        // the normal case
        return {
          ...state,
          [field]: { currencyId: currencyId },
        };
      }
    })
    .addCase(switchCurrencies, (state) => {
      return {
        ...state,
        independentField:
          state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
        [Field.INPUT]: { currencyId: state[Field.OUTPUT].currencyId },
        [Field.OUTPUT]: { currencyId: state[Field.INPUT].currencyId },
      };
    })
    .addCase(typeInput, (state, { payload: { field, typedValue } }) => {
      return {
        ...state,
        independentField: field,
        typedValue,
      };
    })
    .addCase(setFees, (state, { payload: { maxFee, maxPriorityFee } }) => {
      state.maxFee = maxFee;
      state.maxPriorityFee = maxPriorityFee;
    })
    .addCase(setMaxFee, (state, { payload: maxFee }) => {
      state.maxFee = maxFee;
    })
    .addCase(setPriorityFee, (state, { payload: setPriorityFee }) => {
      state.maxPriorityFee = setPriorityFee;
    })
);
