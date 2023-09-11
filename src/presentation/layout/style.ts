import { styled } from "@mui/material/styles";
import QRBox from "../../shared/QRBox";

export const QRBoxContainer = styled(QRBox)(({ theme }) => ({
  height: 51,
  border: 1,
  color: "#FFFFFF",
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const AuthLayoutUpperContainer = styled(QRBox)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export const QRContainer = styled(QRBox)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginTop: theme.spacing(1),
}));

export const OutletContainer = styled(QRBox)(() => ({
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "20px",
  width: "405px",
  maxWidth: "100%",
  margin: "auto",
  textAlign: "center",
}));
