import { Box } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import Datafeed from "./Datafeed";

type TradingViewChartProps = {
  widgetProps?:
    | {
        locale: string;
        debug: boolean;
        fullscreen: boolean;
        interval: string;
        theme: string;
        allow_symbol_change: boolean;
        timezone: string;
        autosize: boolean;
        overrides: any;
      }
    | any;
  pairSymbol: string;
};

const initialWidgetProps: TradingViewChartProps["widgetProps"] = {
  locale: getLocalLanguage(),
  debug: false,
  fullscreen: false,
  interval: "60",
  theme: "dark",
  allow_symbol_change: true,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  autosize: true,
  overrides: {
    "paneProperties.background": "rgba(19, 23, 34, 1)",
    "paneProperties.vertGridProperties.color": "rgba(42, 46, 57, 1)",
    "paneProperties.horzGridProperties.color": "rgba(42, 46, 57, 1)",
    "scalesProperties.lineColor": "rgba(120, 123, 134, 1)",
    "scalesProperties.textColor": "rgba(209, 212, 220, 1)",
  },
  loading_screen: {
    backgroundColor: "transparent",
  },
};

function getLocalLanguage() {
  return navigator.language.split("-")[0] || "en";
}

const datafeedInstance = new Datafeed({ debug: false });

const TradingViewChart = ({ widgetProps = initialWidgetProps, pairSymbol }: TradingViewChartProps) => {
  // const [isReady, setIsReady] = useState(false);
  const datafeed = useRef(datafeedInstance);
  const widgetOptions = useRef({
    container_id: "chart_container",
    datafeed: datafeed.current,
    library_path: "/scripts/charting_library/",
    disabled_features: ["timeframes_toolbar", "header_undo_redo", "header_symbol_search", "header_compare"],
    ...widgetProps,
  });
  const tradingViewWidget = useRef<any>(null);
  const chartObject = useRef<any>(null);

  const chartReady = useCallback(() => {
    if (!tradingViewWidget.current) return;
    tradingViewWidget.current.onChartReady(() => {
      chartObject.current = tradingViewWidget.current.activeChart();
    });
  }, []);

  useEffect(() => {
    tradingViewWidget.current = (window as any).tvWidget = new (window as any).TradingView.widget({
      ...widgetOptions.current,
      symbol: pairSymbol,
    });

    chartReady();
  }, [chartReady, pairSymbol]);

  return <Box sx={{ width: "1000px", height: "100vh" }} id="chart_container"></Box>;
};

export default TradingViewChart;
