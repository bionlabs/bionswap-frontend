import { Box } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef } from "react";
import Datafeed, { usePairSupportedChart } from "./Datafeed";

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
    "paneProperties.background": "#000a0d",
    "paneProperties.vertGridProperties.color": "rgba(0, 0, 0, 0.06)",
    "paneProperties.horzGridProperties.color": "rgba(0, 0, 0, 0.06)",
    "paneProperties.crossHairProperties.color": "#758696",
    "scalesProperties.lineColor": "rgba(0, 0, 0, 0.12)",
    "scalesProperties.textColor": "rgba(178, 181, 190, 1)",
  },
  loading_screen: {
    backgroundColor: "transparent",
  },
};

function getLocalLanguage() {
  return navigator.language.split("-")[0] || "en";
}

const TradingViewChart = ({ widgetProps = initialWidgetProps, pairSymbol }: TradingViewChartProps) => {
  // const [isReady, setIsReady] = useState(false);
  const isPairSupportedChart = usePairSupportedChart(pairSymbol);

  const datafeed = useRef(Datafeed);
  const widgetOptions = useRef({
    container_id: "chart_container",
    datafeed: datafeed.current,
    library_path: "/scripts/charting_library/",
    disabled_features: ["header_undo_redo", "header_symbol_search", "header_compare"],
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
    if (isPairSupportedChart) {
      tradingViewWidget.current = (window as any).tvWidget = new (window as any).TradingView.widget({
        ...widgetOptions.current,
        symbol: pairSymbol,
      });
      chartReady();
    }
  }, [chartReady, isPairSupportedChart, pairSymbol]);

  return (
    <>
      {isPairSupportedChart && (
        <Box sx={{ width: "100%", height: "70vh", borderRadius: "8px", overflow: "hidden" }} id="chart_container"></Box>
      )}
    </>
  );
};

export default TradingViewChart;
