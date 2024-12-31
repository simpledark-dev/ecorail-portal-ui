import React from "react";
import Chart from "chart.js/auto";
import moment from "moment";
import { cn } from "@/utils/common.util";

export interface FuelSavingsChartWidgetProps {
  dates: Date[];
  compliance: {
    data: number[];
    unit: string;
  };
  fuelSaving: {
    data: number[];
    unit: string;
  };
}

enum MetricKey {
  COMPLIANCE = "COMPLIANCE",
  FUEL_SAVING = "FUEL_SAVING",
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

export const FuelSavingsChartWidget = (props: FuelSavingsChartWidgetProps) => {
  const { dates, compliance, fuelSaving } = props;

  const canvasContainerRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = React.useRef<Chart | null>(null);

  const [showComplianceMetric, setShowComplianceMetric] = React.useState(true);
  const [showFuelSavingMetric, setShowFuelSavingMetric] = React.useState(true);

  const initializeChart = () => {
    if (!canvasContainerRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasBoundingRect = canvasContainerRef.current.getBoundingClientRect();

    const maxCompliance = Math.max(...compliance.data);
    const minCompliance = Math.min(...compliance.data);

    const maxFuelSaving = Math.max(...fuelSaving.data);
    const minFuelSaving = Math.min(...fuelSaving.data);

    const globalMax = Math.max(
      showComplianceMetric ? maxCompliance : 0.01,
      showFuelSavingMetric ? maxFuelSaving : 0.01,
    );
    const globalMin = Math.min(
      showComplianceMetric ? minCompliance : 0,
      showFuelSavingMetric ? minFuelSaving : 0,
    );
    const sumGlobalMaxMin = globalMax + Math.abs(globalMin);

    const globalPositiveHeight = (globalMax / sumGlobalMaxMin) * canvasBoundingRect.height;

    const compliancePositiveRange = maxCompliance > 0 ? maxCompliance : 0;
    const fuelSavingPositiveRange = maxFuelSaving > 0 ? maxFuelSaving : 0;

    const compliancePositiveHeight = (compliancePositiveRange / globalMax) * globalPositiveHeight;
    const fuelSavingPositiveHeight = (fuelSavingPositiveRange / globalMax) * globalPositiveHeight;

    const gradientCompliance = ctx.createLinearGradient(
      0,
      globalPositiveHeight - compliancePositiveHeight - 25,
      0,
      globalPositiveHeight,
    );
    gradientCompliance.addColorStop(0, "rgba(132,124,251,0.6)");
    gradientCompliance.addColorStop(0.9, "rgba(132,124,251,0)");

    const gradientFuelSaving = ctx.createLinearGradient(
      0,
      globalPositiveHeight - fuelSavingPositiveHeight - 25,
      0,
      globalPositiveHeight,
    );
    gradientFuelSaving.addColorStop(0, "rgba(97,215,138,0.6)");
    gradientFuelSaving.addColorStop(0.9, "rgba(97,215,138,0)");

    const data = {
      labels: dates.map((v) => moment(v).format("YYYY-MM-DD")),
      datasets: [
        {
          label: `Daily Compliance (${fuelSaving.unit})`,
          data: compliance.data,
          fill: true,
          backgroundColor: gradientCompliance,
          borderColor: "#847CFB",
          pointRadius: 5,
          pointBorderWidth: 1.5,
          pointBackgroundColor: "#847CFB",
          pointBorderColor: "#ffffff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#847CFB",
          tension: 0.4,
          _height: compliancePositiveHeight,
          hidden: !showComplianceMetric,
          _key: MetricKey.COMPLIANCE,
        },
        {
          label: `Daily Fuel Savings (${compliance.unit})`,
          data: fuelSaving.data,
          fill: true,
          backgroundColor: gradientFuelSaving,
          borderColor: "#61D78A",
          pointRadius: 5,
          pointBorderWidth: 1.5,
          pointBackgroundColor: "#61D78A",
          pointBorderColor: "#ffffff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#61D78A",
          tension: 0.4,
          _height: fuelSavingPositiveHeight,
          hidden: !showFuelSavingMetric,
          _key: MetricKey.FUEL_SAVING,
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
  }, [dates, compliance, fuelSaving, showComplianceMetric, showFuelSavingMetric]);

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
        <h2 className="mb-2 text-base font-semibold text-navy-700">Fuel Savings Trends</h2>
        <div className="flex flex-wrap items-center justify-start gap-x-5 gap-y-2">
          <button
            className="flex items-center justify-start gap-2"
            onClick={() => {
              toggleDatasetVisibility(MetricKey.COMPLIANCE);
              setShowComplianceMetric(!showComplianceMetric);
            }}
          >
            <div className="h-3 w-3 shrink-0 rounded-full border-2 border-white bg-[#847CFB] shadow-sm" />
            <p
              className={cn("text-sm font-medium text-navy-500 transition-all duration-150", {
                "line-through": !showComplianceMetric,
              })}
            >
              Daily Compliance ({compliance.unit})
            </p>
          </button>
          <button
            className="flex items-center justify-start gap-2"
            onClick={() => {
              toggleDatasetVisibility(MetricKey.FUEL_SAVING);
              setShowFuelSavingMetric(!showFuelSavingMetric);
            }}
          >
            <div className="h-3 w-3 shrink-0 rounded-full border-2 border-white bg-[#61D78A] shadow-sm" />
            <p
              className={cn("text-sm font-medium text-navy-500 transition-all duration-150", {
                "line-through": !showFuelSavingMetric,
              })}
            >
              Daily Fuel Savings ({fuelSaving.unit})
            </p>
          </button>
        </div>
      </div>
      <div ref={canvasContainerRef} className="max-h-[350px] min-h-[250px]">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
    </div>
  );
};
