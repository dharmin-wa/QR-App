import { styled } from "@mui/material/styles";
import QRBox from "../../shared/QRBox";
import { ReactComponent as Diamond } from "../../assets/svg/diamond.svg";

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

export const CardStyle = styled(QRBox)(() => ({
  width: "233px",
  height: "122px",
  backgroundColor: "#356ABA",
  borderRadius: "10px",
  position: "relative",
}));

export const CircleStyle = styled(QRBox)(() => ({
  width: "50px",
  height: "50px",
  backgroundColor: "#fff",
  borderRadius: "50%",
  position: "absolute",
  top: "-4px",
  left: "187px",
  opacity: 0.2,
}));

export const InnerCircleStyle = styled(QRBox)(() => ({
  width: "72px",
  height: "72px",
  backgroundColor: "#fff",
  borderRadius: "50%",
  position: "absolute",
  top: "-10px",
  right: "-10px",
  opacity: 0.2,
}));

export const DiamondStyle = styled(Diamond)(() => ({
  position: "absolute",
  top: "-43px",
  right: "-27px",
}));

export const CardContentStyle = styled(QRBox)(() => ({
  padding: "20px",
  color: "#fff",
  fontSize: "10px",
}));
