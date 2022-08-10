import SocketClient from "./SocketClient";
import BinanceAPI, { CandleChartInterval_LT, CandleChartResult, Symbol } from "binance-api-node";
import { useEffect, useMemo, useState } from "react";

type CandleChartType = CandleChartResult & { time: number };

class Datafeed {
  // private host: string;
  private client;
  private ws: SocketClient;
  public symbols: Symbol[] = [];

  constructor() {
    this.ws = new SocketClient();
    this.client = BinanceAPI();
  }

  // async binanceSymbols() {
  //   const res = await fetch(this.host + "/api/v1/exchangeInfo");
  //   const json = await res.json();
  //   return json.symbols;
  // }

  async fetchAndInitSymbols() {
    if (this.symbols.length === 0) {
      const res = await this.client.exchangeInfo();
      this.symbols = res.symbols;
    }
    return this.symbols;
  }

  // async binanceKlines(symbol: string, interval: string, startTime: number, endTime: number, limit: number) {
  //   const url = `${this.host}/api/v1/klines?symbol=${symbol}&interval=${interval}${
  //     startTime ? `&startTime=${startTime}` : ""
  //   }${endTime ? `&endTime=${endTime}` : ""}${limit ? `&limit=${limit}` : ""}`;

  //   const res = await fetch(url);
  //   const json = await res.json();
  //   return json;
  // }

  async fetchKlines(
    symbol: string,
    interval: CandleChartInterval_LT,
    startTime: number,
    endTime: number,
    limit: number = 500
  ): Promise<CandleChartType[]> {
    const res = await this.client.candles({
      symbol,
      interval,
      startTime,
      endTime,
      limit,
    });

    return res.map((k) => ({ ...k, time: k.openTime }));
  }

  // chart specific functions below, impt that their function names stay same
  async onReady(callback: (props: any) => void) {
    console.debug("Datafeed: onReady called");

    if (this.symbols.length === 0) {
      await this.fetchAndInitSymbols();
    }

    callback({
      supports_marks: false,
      supports_timescale_marks: false,
      supports_time: true,
      supported_resolutions: ["1", "3", "5", "15", "30", "60", "120", "240", "360", "480", "720", "1D", "3D", "1W", "1M"],
    });
  }

  // searchSymbols(userInput: string, exchange: string, symbolType: string, onResultReadyCallback: any) {
  //   userInput = userInput.toUpperCase();
  //   onResultReadyCallback(
  //     this.symbols
  //       .filter((symbol) => {
  //         return symbol.symbol.indexOf(userInput) >= 0;
  //       })
  //       .map((symbol) => {
  //         return {
  //           symbol: symbol.symbol,
  //           full_name: symbol.symbol,
  //           description: symbol.baseAsset + " / " + symbol.quoteAsset,
  //           ticker: symbol.symbol,
  //           exchange: "Binance",
  //           type: "crypto",
  //         };
  //       })
  //   );
  // }

  resolveSymbol(
    symbolName: string,
    onSymbolResolvedCallback: (props: any) => void,
    onResolveErrorCallback: (message: string) => void
  ) {
    // this.debug && console.log("👉 resolveSymbol:", symbolName);

    const comps = symbolName.split(":");
    symbolName = (comps.length > 1 ? comps[1] : symbolName).toUpperCase();

    function pricescale(symbol: Symbol) {
      for (let filter of symbol.filters) {
        if (filter.filterType == "PRICE_FILTER") {
          return Math.round(1 / parseFloat(filter.tickSize));
        }
      }
      return 1;
    }

    for (let symbol of this.symbols) {
      if (symbol.symbol == symbolName) {
        setTimeout(() => {
          onSymbolResolvedCallback({
            name: symbol.symbol,
            description: symbol.baseAsset + " / " + symbol.quoteAsset,
            ticker: symbol.symbol,
            // exchange: "Binance",
            // listed_exchange: "Binance",
            type: "crypto",
            session: "24x7",
            minmov: 1,
            pricescale: pricescale(symbol),
            // timezone: 'UTC',
            has_intraday: true,
            has_daily: true,
            has_weekly_and_monthly: true,
            currency_code: symbol.quoteAsset,
          });
        }, 0);
        return;
      }
    }
    // minmov/pricescale will give the value of decimal places that will be shown on y-axis of the chart
    //
    onResolveErrorCallback("not found");
  }

  async getBars(
    symbolInfo: { name: string },
    resolution: string,
    from: number,
    to: number,
    onHistoryCallback: (data: any[], options: { noData: boolean }) => void,
    onErrorCallback: (message: string) => void
  ) {
    const interval = this.ws.tvIntervals[resolution];
    if (!interval) {
      onErrorCallback("Invalid interval");
    }

    let totalKlines: CandleChartType[] = [];
    const kLinesLimit = 500;
    const finishKlines = () => {
      if (totalKlines.length === 0) {
        onHistoryCallback([], { noData: true });
      } else {
        let historyCBArray = totalKlines.map((kline) => ({
          time: kline.openTime,
          open: parseFloat(kline.open),
          high: parseFloat(kline.high),
          low: parseFloat(kline.low),
          close: parseFloat(kline.close),
          volume: parseFloat(kline.volume),
        }));
        onHistoryCallback(historyCBArray, { noData: false });
      }
    };

    const getKlines = async (from: number, to: number) => {
      try {
        const data = await this.fetchKlines(symbolInfo.name, interval, from, to, kLinesLimit);
        totalKlines = totalKlines.concat(data);
        if (data.length === kLinesLimit) {
          from = data[data.length - 1].openTime + 1;
          getKlines(from, to);
        } else {
          finishKlines();
        }
      } catch (e) {
        console.error(e);
        onErrorCallback(`Error in 'getKlines' func`);
      }
    };

    from *= 1000;
    to *= 1000;
    getKlines(from, to);
  }

  subscribeBars(
    symbolInfo: any,
    resolution: any,
    onRealtimeCallback: any,
    subscriberUID: any,
    onResetCacheNeededCallback: any
  ) {
    this.ws.subscribeOnStream(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback);
  }

  unsubscribeBars(subscriberUID: string) {
    this.ws.unsubscribeFromStream(subscriberUID);
  }
}

const instance = new Datafeed();
export default instance;

export function usePairSupportedChart(pairSymbol: string) {
  const [supportedSymbols, setSupportedSymbols] = useState(instance.symbols);
  const symbols: [string, string] = useMemo(() => {
    const parsed = pairSymbol.split(":");

    return [`${parsed[0]}${parsed[1]}`, `${parsed[1]}${parsed[0]}`];
  }, [pairSymbol]);

  useEffect(() => {
    if (supportedSymbols.length === 0) {
      instance.fetchAndInitSymbols().then((s) => setSupportedSymbols(s));
    }
  }, [supportedSymbols]);

  const supportedPair = useMemo(() => {
    return supportedSymbols.filter((supported) => supported.symbol === symbols[0] || supported.symbol === symbols[1])[0]
      ?.symbol;
  }, [supportedSymbols, symbols]);

  return supportedPair;
}
