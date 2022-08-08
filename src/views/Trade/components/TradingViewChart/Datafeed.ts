import SocketClient from "./SocketClient";

type Symbol = { symbol: string; baseAsset: string; quoteAsset: string; filters: any[] };

export default class Datafeed {
  private host: string;
  private debug: boolean;
  private ws: SocketClient;
  private symbols: Symbol[] = [];

  constructor(options: any) {
    this.host = "https://api.binance.com";
    this.debug = options.debug || false;
    this.ws = new SocketClient();
  }

  async binanceSymbols() {
    const res = await fetch(this.host + "/api/v1/exchangeInfo");
    const json = await res.json();
    return json.symbols;
  }

  async binanceKlines(symbol: string, interval: string, startTime: number, endTime: number, limit: number) {
    const url = `${this.host}/api/v1/klines?symbol=${symbol}&interval=${interval}${
      startTime ? `&startTime=${startTime}` : ""
    }${endTime ? `&endTime=${endTime}` : ""}${limit ? `&limit=${limit}` : ""}`;

    const res = await fetch(url);
    const json = await res.json();
    return json;
  }

  // chart specific functions below, impt that their function names stay same
  onReady(callback: (props: any) => void) {
    this.binanceSymbols()
      .then((symbols) => {
        this.symbols = symbols;
        callback({
          supports_marks: false,
          supports_timescale_marks: false,
          supports_time: true,
          supported_resolutions: [
            "1",
            "3",
            "5",
            "15",
            "30",
            "60",
            "120",
            "240",
            "360",
            "480",
            "720",
            "1D",
            "3D",
            "1W",
            "1M",
          ],
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  searchSymbols(userInput: string, exchange: string, symbolType: string, onResultReadyCallback: any) {
    userInput = userInput.toUpperCase();
    onResultReadyCallback(
      this.symbols
        .filter((symbol) => {
          return symbol.symbol.indexOf(userInput) >= 0;
        })
        .map((symbol) => {
          return {
            symbol: symbol.symbol,
            full_name: symbol.symbol,
            description: symbol.baseAsset + " / " + symbol.quoteAsset,
            ticker: symbol.symbol,
            exchange: "Binance",
            type: "crypto",
          };
        })
    );
  }

  resolveSymbol(
    symbolName: string,
    onSymbolResolvedCallback: (props: any) => void,
    onResolveErrorCallback: (message: string) => void
  ) {
    this.debug && console.log("👉 resolveSymbol:", symbolName);

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
            exchange: "Binance",
            listed_exchange: "Binance",
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

  getBars(
    symbolInfo: { name: string },
    resolution: string,
    from: number,
    to: number,
    onHistoryCallback: (
      arg0: { time: any; open: number; high: number; low: number; close: number; volume: number }[],
      arg1: { noData: boolean }
    ) => void,
    onErrorCallback: (arg0: string) => void,
    firstDataRequest: any
  ) {
    const interval = this.ws.tvIntervals[resolution];
    if (!interval) {
      onErrorCallback("Invalid interval");
    }

    let totalKlines: any[] = [];
    const kLinesLimit = 500;
    const finishKlines = () => {
      if (totalKlines.length === 0) {
        onHistoryCallback([], { noData: true });
      } else {
        let historyCBArray = totalKlines.map((kline) => ({
          time: kline[0],
          open: parseFloat(kline[1]),
          high: parseFloat(kline[2]),
          low: parseFloat(kline[3]),
          close: parseFloat(kline[4]),
          volume: parseFloat(kline[5]),
        }));
        onHistoryCallback(historyCBArray, { noData: false });
      }
    };

    const getKlines = async (from: number, to: number) => {
      try {
        const data = await this.binanceKlines(symbolInfo.name, interval, from, to, kLinesLimit);
        totalKlines = totalKlines.concat(data);
        if (data.length === kLinesLimit) {
          from = data[data.length - 1][0] + 1;
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
