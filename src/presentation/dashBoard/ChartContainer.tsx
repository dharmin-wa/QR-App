import React, { useEffect, useState } from "react";
import DoughnutChart from "../../shared/DoughnutChart";
import { ReactComponent as KpiQR } from "../../assets/svg/kpiQR.svg";
import { List, ListItem, ListItemText } from "@mui/material";

export interface ChartContainerProps {
  activeQrs: number;
  disableQrs: number;
  totalQrs: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    hoverOffset: number;
    label: string;
    data: number[];
    backgroundColor: string[];
    cutout: number;
    borderColor: string[];
  }[];
}

const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const columnStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "5px 8px",
};

const ChartContainer: React.FC<ChartContainerProps> = ({
  activeQrs,
  disableQrs,
  totalQrs,
}) => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [data, setData] = useState<ChartData | null>(null);

  useEffect(() => {
    setData({
      labels: [
        `Active QR <strong>${(activeQrs / totalQrs) * 100}%</strong>`,
        `Disable QR <strong>${(disableQrs / totalQrs) * 100}%</strong>`,
      ],
      datasets: [
        {
          hoverOffset: 1,
          label: "# of Votes",
          data: [activeQrs, disableQrs],
          backgroundColor: ["#356ABA", "#ECE9FF"],
          cutout: 45,
          borderColor: ["#356ABA", "#ECE9FF"],
        },
      ],
    });
  }, [activeQrs, disableQrs, totalQrs]);

  const handleLabelClick = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels((prevSelectedLabels) =>
        prevSelectedLabels.filter((selectedLabel) => selectedLabel !== label),
      );
    } else {
      setSelectedLabels((prevSelectedLabels) => [...prevSelectedLabels, label]);
    }
  };

  const filteredData: any = {
    labels: data?.labels.filter((label) => !selectedLabels.includes(label)),
    datasets: [
      {
        data: data?.datasets[0].data.filter(
          (_, index) => !selectedLabels.includes(data?.labels[index]),
        ),
        backgroundColor: data?.labels
          .filter((label) => !selectedLabels.includes(label))
          .map((label) => {
            const labelIndex = data?.labels.indexOf(label);
            return data?.datasets[0].backgroundColor[labelIndex];
          }),
        cutout: "70%",
      },
    ],
  };

  return (
    <div style={columnStyle}>
      <div
        style={{
          position: "relative",
          width: "27%",
          height: "98px",
          zIndex: 0,
        }}
      >
        <DoughnutChart data={filteredData} options={options} />
        <KpiQR
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "48%",
            zIndex: -1,
          }}
        />
      </div>
      <List>
        {data?.labels.map((label, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => handleLabelClick(label)}
            style={{
              textDecoration: selectedLabels.includes(label)
                ? "line-through"
                : "none",
            }}
          >
            <div
              style={{
                backgroundColor: data.datasets[0].backgroundColor[index],
                width: "24px",
                height: "15px",
                marginRight: "10px",
              }}
            ></div>
            <ListItemText
              primary={<span dangerouslySetInnerHTML={{ __html: label }} />}
              primaryTypographyProps={{
                style: {
                  fontSize: "0.9rem",
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ChartContainer;
