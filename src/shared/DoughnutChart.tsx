import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: {
    labels?: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

const options: any = {
  plugins: {
    legend: {
      position: "right",
      labels: {
        usepointstyle: true,
        pointstyle: "circle",
      },
    },
  },
};

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
