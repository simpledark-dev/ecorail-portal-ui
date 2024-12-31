import React from "react";
import Chart from "chart.js/auto";
import moment from "moment";
import { cn } from "@/utils/common.util";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "@/components/spinner";

export interface FuelUsedChartWidgetProps {
  dates: Date[];
  fuelConsumption: {
    data: number[];
    unit: string;
  };
  estimatedFuelConsumption: {
    data: number[];
    unit: string;
  };
  distanceTraveled: {
    data: number[];
    unit: string;
  };
  loading?: boolean;
}

enum MetricKey {
  FUEL_CONSUMPTION = "FUEL_CONSUMPTION",
  ESTIMATE_FUEL_CONSUMPTION = "ESTIMATE_FUEL_CONSUMPTION",
  DISTANCE_TRAVELED = "DISTANCE_TRAVELED",
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: "#E8EAEE40",
      },
      ticks: {
        color: "#8793AB",
      },
      border: {
        color: "#8793AB",
      },
    },
    y: {
      grid: {
        color: "#E8EAEE",
      },
      ticks: {
        color: "#8793AB",
      },
      border: {
        color: "#8793AB",
      },
    },
  },
};

export const FuelUsedChartWidget = (props: FuelUsedChartWidgetProps) => {
  const { dates, fuelConsumption, estimatedFuelConsumption, distanceTraveled, loading } = props;

  const canvasContainerRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = React.useRef<Chart | null>(null);

  const [showFuelConsumptionMetric, setShowFuelConsumptionMetric] = React.useState(true);
  const [showEstFuelConsumptionMetric, setShowEstFuelConsumptionMetric] = React.useState(true);
  const [showDistanceTraveledMetric, setShowDistanceTraveledMetric] = React.useState(true);
  const isEmptyData = React.useMemo(() => {
    return (
      distanceTraveled.data.every((v) => v === 0) &&
      fuelConsumption.data.every((v) => v === 0) &&
      estimatedFuelConsumption.data.every((v) => v === 0)
    );
  }, [fuelConsumption, estimatedFuelConsumption]);

  const initializeChart = () => {
    if (!canvasContainerRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasBoundingRect = canvasContainerRef.current.getBoundingClientRect();

    const maxDistanceTraveled = Math.max(...distanceTraveled.data);
    const minDistanceTraveled = Math.min(...distanceTraveled.data);

    const maxFuelConsumption = Math.max(...fuelConsumption.data);
    const minFelConsumption = Math.min(...fuelConsumption.data);

    const maxEstFuelConsumption = Math.max(...estimatedFuelConsumption.data);
    const minEstFuelConsumption = Math.min(...estimatedFuelConsumption.data);

    const globalMax = Math.max(
      showDistanceTraveledMetric ? maxDistanceTraveled : 0.01,
      showFuelConsumptionMetric ? maxFuelConsumption : 0.01,
      showEstFuelConsumptionMetric ? maxEstFuelConsumption : 0.01,
      0.01,
    );
    const globalMin = Math.min(
      showDistanceTraveledMetric ? minDistanceTraveled : 0.01,
      showFuelConsumptionMetric ? minFelConsumption : 0.01,
      showEstFuelConsumptionMetric ? minEstFuelConsumption : 0.01,
      0.01,
    );
    const sumGlobalMaxMin = globalMax + Math.abs(globalMin);

    const globalPositiveHeight = (globalMax / sumGlobalMaxMin) * canvasBoundingRect.height;

    const distanceTraveledPositiveRange = maxDistanceTraveled > 0 ? maxDistanceTraveled : 0;
    const fuelConsumptionPositiveRange = maxFuelConsumption > 0 ? maxFuelConsumption : 0;
    const estFuelConsumptionPositiveRange = maxEstFuelConsumption > 0 ? maxEstFuelConsumption : 0;

    const fuelConsumptionPositiveHeight =
      (fuelConsumptionPositiveRange / globalMax) * globalPositiveHeight;
    const estFuelConsumptionPositiveHeight =
      (estFuelConsumptionPositiveRange / globalMax) * globalPositiveHeight;
    const distanceTraveledPositiveHeight =
      (distanceTraveledPositiveRange / globalMax) * globalPositiveHeight;

    const gradientDistanceTraveled = ctx.createLinearGradient(
      0,
      globalPositiveHeight - distanceTraveledPositiveHeight - 25,
      0,
      globalPositiveHeight,
    );
    gradientDistanceTraveled.addColorStop(0, "rgba(243,181,48,0.6)");
    gradientDistanceTraveled.addColorStop(0.8, "rgba(243,181,48,0)");

    const gradientFuelConsumption = ctx.createLinearGradient(
      0,
      globalPositiveHeight - fuelConsumptionPositiveHeight - 25,
      0,
      globalPositiveHeight,
    );
    gradientFuelConsumption.addColorStop(0, "rgba(132,124,251,0.6)");
    gradientFuelConsumption.addColorStop(0.9, "rgba(132,124,251,0)");

    const gradientEstFuelConsumption = ctx.createLinearGradient(
      0,
      globalPositiveHeight - estFuelConsumptionPositiveHeight - 25,
      0,
      globalPositiveHeight,
    );
    gradientEstFuelConsumption.addColorStop(0, "rgba(244,94,93,0.6)");
    gradientEstFuelConsumption.addColorStop(0.9, "rgba(244,94,93,0)");

    const data = {
      labels: dates.map((v) => moment(v).format("YYYY-MM-DD")),
      datasets: [
        {
          label: `Distances Traveled (${distanceTraveled.unit})`,
          data: loading ? [] : distanceTraveled.data,
          fill: true,
          backgroundColor: gradientDistanceTraveled,
          borderColor: "#F3B530",
          pointRadius: 5,
          pointBorderWidth: 1.5,
          pointBackgroundColor: "#F3B530",
          pointBorderColor: "#ffffff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#F3B530",
          tension: 0.4,
          _height: distanceTraveledPositiveHeight,
          hidden: !showDistanceTraveledMetric,
          _key: MetricKey.DISTANCE_TRAVELED,
        },
        {
          label: `Fuel Consumed (${fuelConsumption.unit})`,
          data: loading ? [] : fuelConsumption.data,
          fill: true,
          backgroundColor: gradientFuelConsumption,
          borderColor: "#847CFB",
          pointRadius: 5,
          pointBorderWidth: 1.5,
          pointBackgroundColor: "#847CFB",
          pointBorderColor: "#ffffff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#847CFB",
          tension: 0.4,
          _height: fuelConsumptionPositiveHeight,
          hidden: !showFuelConsumptionMetric,
          _key: MetricKey.FUEL_CONSUMPTION,
        },
        {
          label: `Estimated Fuel Consumed (${estimatedFuelConsumption.unit})`,
          data: loading ? [] : estimatedFuelConsumption.data,
          fill: true,
          backgroundColor: gradientEstFuelConsumption,
          borderColor: "#F45E5D",
          pointRadius: 5,
          pointBorderWidth: 1.5,
          pointBackgroundColor: "#F45E5D",
          pointBorderColor: "#ffffff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#F45E5D",
          tension: 0.4,
          _height: estFuelConsumptionPositiveHeight,
          hidden: !showEstFuelConsumptionMetric,
          _key: MetricKey.ESTIMATE_FUEL_CONSUMPTION,
        },
      ].sort((a, b) => a._height - b._height),
    };

    const newChart = new Chart(ctx, {
      type: "line",
      data,
      options: chartOptions as any,
    });

    chartInstanceRef.current = newChart;
  };

  const toggleDatasetVisibility = (key: MetricKey) => {
    if (!chartInstanceRef.current) return;

    const chart = chartInstanceRef.current;
    const datasetIndex = chart.data.datasets.findIndex((dataset) => (dataset as any)._key === key);

    if (datasetIndex === -1) return;

    const dataset = chart.data.datasets[datasetIndex];
    dataset.hidden = !dataset.hidden;

    chart.update();
  };

  React.useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    React.startTransition(() => {
      initializeChart();
    });
  }, [
    dates,
    fuelConsumption,
    estimatedFuelConsumption,
    distanceTraveled,
    showDistanceTraveledMetric,
    showFuelConsumptionMetric,
    showEstFuelConsumptionMetric,
  ]);

  React.useEffect(() => {
    const handleResize = () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }

      React.startTransition(() => {
        initializeChart();
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="rounded-[12px] border border-gray-400 bg-white p-[24px] shadow-sm md:p-[32px]">
      <div className="mb-[24px] md:mb-[32px]">
        <h2 className="mb-2 text-base font-semibold text-navy-700">
          Total Fuel Used & Miles Traveled
        </h2>
        <div className="flex flex-wrap items-center justify-start gap-x-5 gap-y-2">
          <button
            className="flex items-center justify-start gap-2"
            onClick={() => {
              toggleDatasetVisibility(MetricKey.DISTANCE_TRAVELED);
              setShowDistanceTraveledMetric(!showDistanceTraveledMetric);
            }}
          >
            <div className="h-3 w-3 shrink-0 rounded-full border-2 border-white bg-[#F3B530] shadow-sm" />
            <p
              className={cn("text-sm font-medium text-navy-500", {
                "line-through": !showDistanceTraveledMetric,
              })}
            >
              Distances Traveled ({distanceTraveled.unit})
            </p>
          </button>
          <button
            className="flex items-center justify-start gap-2"
            onClick={() => {
              toggleDatasetVisibility(MetricKey.FUEL_CONSUMPTION);
              setShowFuelConsumptionMetric(!showFuelConsumptionMetric);
            }}
          >
            <div className="h-3 w-3 shrink-0 rounded-full border-2 border-white bg-[#847CFB] shadow-sm" />
            <p
              className={cn("text-sm font-medium text-navy-500 transition-all duration-150", {
                "line-through": !showFuelConsumptionMetric,
              })}
            >
              Fuel Consumed ({fuelConsumption.unit})
            </p>
          </button>
          <button
            className="flex items-center justify-start gap-2"
            onClick={() => {
              toggleDatasetVisibility(MetricKey.ESTIMATE_FUEL_CONSUMPTION);
              setShowEstFuelConsumptionMetric(!showEstFuelConsumptionMetric);
            }}
          >
            <div className="h-3 w-3 shrink-0 rounded-full border-2 border-white bg-[#F45E5D] shadow-sm" />
            <p
              className={cn("text-sm font-medium text-navy-500 transition-all duration-150", {
                "line-through": !showEstFuelConsumptionMetric,
              })}
            >
              Estimated Fuel Consumed ({estimatedFuelConsumption.unit})
            </p>
          </button>
        </div>
      </div>
      <div ref={canvasContainerRef} className="relative max-h-[350px] min-h-[250px]">
        <AnimatePresence>
          {!loading && isEmptyData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-white/[10%] backdrop-blur-[2px]"
            >
              <p className="-translate-y-[32px] text-base font-medium text-neutral-600">
                No Data to Display
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-white/[10%] backdrop-blur-[2px]"
            >
              <Spinner className="-translate-y-[32px]" />
            </motion.div>
          )}
        </AnimatePresence>

        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    </div>
  );
};
