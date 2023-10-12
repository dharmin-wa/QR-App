/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import QRTypography from "../../shared/QRTypography";
import { useTranslation } from "react-i18next";
import DoughnutChart from "../../shared/DoughnutChart";
import { ReactComponent as KpiQR } from "../../assets/svg/kpiQR.svg";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import QRBox from "../../shared/QRBox";

export interface ChartContainerProps {
  Indicator: React.FC;
  title: string;
  value: number;
}

const data = {
  labels: ["Active QR <strong>70%<strong>", "Disable QR <strong>30%</strong>"],
  datasets: [
    {
      hoverOffset: 1,
      label: "# of Votes",
      data: [70, 30],
      backgroundColor: ["#356ABA", "#ECE9FF"],
      cutout: 45,
      borderColor: ["#356ABA", "#ECE9FF"],
      // borderWidth: 2,
    },
  ],
};

const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const columnStyle: any = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "5px 8px",
};

const ChartContainer = () => {
  const [selectedLabels, setSelectedLabels] = useState<any>([]);

  const handleLabelClick = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(
        selectedLabels.filter((selectedLabel: any) => selectedLabel !== label),
      );
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  const filteredData = {
    labels: data.labels.filter((label) => !selectedLabels.includes(label)),
    datasets: [
      {
        data: data.datasets[0].data.filter(
          (_, index) => !selectedLabels.includes(data.labels[index]),
        ),
        backgroundColor: data.labels
          .filter((label) => !selectedLabels.includes(label))
          .map((label) => {
            const labelIndex = data.labels.indexOf(label);
            return data.datasets[0].backgroundColor[labelIndex];
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
        {data?.labels?.map((label, index) => (
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
