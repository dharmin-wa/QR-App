/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Temp from "../assets/svg/allQR.svg";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: {
    labels?: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
  options: any;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, options }) => {
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
