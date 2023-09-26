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
}

const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 0,
      bottom: 0,
      // right: 0,
      left: 0,
    },
  },
  plugins: {
    legend: {
      // display: false,
      position: "right",
      labels: {
        align: "end",
        // spacing: 50,
        border: "1px solid #000",
        margin: 40,
        font: {
          size: 15,
        },
        // boxWidth: 50,
        boxHeight: 15,
        padding: 10,
      },
    },
  },
};

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
  return (
    <div
      style={{
        position: "relative",
        height: "20vh",
        width: "100%",
        marginRight: "auto",
      }}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
