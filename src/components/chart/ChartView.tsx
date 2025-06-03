import { ChartViewProps, VisibleRange } from '@/types/chart';
import Datafeed from '@/utils/chart/datafeed';
import { IChartingLibraryWidget, TradingTerminalFeatureset, widget } from 'public/static/charting_library';
import {
    LanguageCode,
    ResolutionString,
    TradingTerminalWidgetOptions
} from 'public/static/charting_library/charting_library';
import { useEffect, useRef } from 'react';

const defaultChartProps: any = {
    interval: '1D' as ResolutionString,
    library_path: '/static/charting_library/',
    locale: 'en' as LanguageCode,
    // charts_storage_url: "https://saveload.tradingview.com",
    charts_storage_url: 'https://tradingview.tradido.com',
    charts_storage_api_version: 'v11',
    client_id: 'tradingview.com',
    user_id: 'public_user_id',
    autosize: true,
    container: ''
};


const ChartView: React.FC<ChartViewProps> = ({
    lastChartContent,
    isReadonly,
    chartFeedContent,
    marketType,
    visibleRange,
    onChartLoaded
}) => {

    const chartContainerRef = useRef<any>(null);
    const tvWidgetRef = useRef<IChartingLibraryWidget>(null);

    function onChartLoad(loaded: boolean) {
        if (onChartLoaded) {
            onChartLoaded(loaded);
        }
    }

    useEffect(() => {
        if (chartContainerRef.current) {
            const widgetOptions: TradingTerminalWidgetOptions = {
                symbol: "Binance:BTC/USDT",
                studies_overrides: {
                    'volume.volume.color.0': '#f23645',
                    'volume.volume.color.1': '#089981',
                    'volume.volume.transparency': 50,
                    'volume.volume.price_scale': 'left'
                },
                ...defaultChartProps,
                datafeed: Datafeed,
                container: chartContainerRef.current
            };

            if (isReadonly) {
                const features: TradingTerminalFeatureset[] = [
                    'left_toolbar',
                    'right_toolbar',
                    'header_widget',
                    'drawing_templates',
                    'control_bar',
                    'order_panel_undock'
                ];
                // widgetOptions.disabled_features = [...widgetOptions.disabled_features!!, ...features];
                widgetOptions.disabled_features = [
                    ...(widgetOptions.disabled_features || []),
                    ...features
                ];
            }

            tvWidgetRef.current = new widget(widgetOptions);
            const { current: tvWidget } = tvWidgetRef;
            tvWidget.onChartReady(() => {

                function lockAllShapes() {
                    const shapes = tvWidget.activeChart().getAllShapes();
                    shapes.map((shape) => {
                        tvWidget.activeChart().getShapeById(shape.id).setUserEditEnabled(false);
                    });
                }

                if (chartFeedContent?.chart_content) {
                    tvWidget.load(chartFeedContent.chart_content);
                }

                function updateSymbol() {
                    if (lastChartContent) {
                        const [exchange, pair] = tvWidget.activeChart().symbol().split(':');
                        lastChartContent.exchange = exchange;
                        lastChartContent.pair = pair;
                    }
                }
                updateSymbol();

                function updateScreenShot() {
                    tvWidget.takeClientScreenshot().then((r) => {
                        if (lastChartContent) {
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');

                            // Set canvas dimensions to 16:9 aspect ratio
                            const aspectRatio = 16 / 9;
                            const width = r.width;
                            const height = width / aspectRatio;
                            canvas.width = width;
                            canvas.height = height;

                            // Draw the image onto the canvas
                            const img = new Image();
                            img.src = r.toDataURL();
                            img.onload = () => {
                                ctx?.drawImage(img, 0, 0, width, height);
                                lastChartContent.base64ImageData = canvas.toDataURL();
                            };
                        }
                    });
                }
                updateScreenShot();

                function moveToVisibleRange(range: VisibleRange) {
                    tvWidget
                        .activeChart()
                        .setVisibleRange(range)
                        .then((r) => {
                            console.log('Successfully moved: ', r);
                        })
                        .catch((e) => {
                            console.log('Move error: ', e);
                        });
                }

                tvWidget
                    .activeChart()
                    .onSymbolChanged()
                    .subscribe(null, () => {
                        onChartLoad(false);
                        updateSymbol();
                    });

                tvWidget
                    .activeChart()
                    .onDataLoaded()
                    .subscribe(null, () => {
                        onChartLoad(true);
                        if (isReadonly) {
                            lockAllShapes();
                        }
                        if (visibleRange) {
                            moveToVisibleRange(visibleRange);
                        }
                    });

                tvWidget.headerReady().then(() => {
                    const drawingButton = tvWidget.createButton();
                    drawingButton.setAttribute('title', 'Click to delete all drawings');
                    drawingButton.classList.add('apply-common-tooltip');
                    drawingButton.innerHTML = 'Clear All';
                });
            });
        }
    }, [chartContainerRef]);

    return (
        <div style={{ height: "100vh" }} ref={chartContainerRef} />
    );
}

export default ChartView;