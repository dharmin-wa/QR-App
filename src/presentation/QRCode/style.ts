/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "@emotion/styled";
import { Grid, Paper, Link } from "@mui/material";
import QRBox from "../../shared/QRBox";
import QRButton from "../../shared/QRButton";
import QRTypography from "../../shared/QRTypography";

export const StyledPaper = styled(Paper)`
  box-shadow: 0px 0px 4px 0px #00000040;
  border-radius: 12px;
  margin: auto;
  padding: 20px 0px;
  margin: 10px 5px 10px 5px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  flexgrow: 1;
`;

export const StyledGridItem = styled(Grid)`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
`;

export const ItemContainer = styled(QRBox)(({ theme }: any) => ({
  // padding: theme.spacing(1),
  textAlign: "center",
  overflow: "hidden",
  // whiteSpace: "nowrap",
  textOverflow: "ellipsis",
}));

export const StyledDurationButton = styled(QRBox)(() => ({
  marginTop: "8px",
  fontSize: "0.875rem",
  color: "#294C8F",
  background: "#E9E9E9",
  fontWeight: 600,
  alignItems: "center",
  width: "235px",
  height: "31px",
  display: "flex",
  justifyContent: "center",
  borderRadius: "6px",
}));

export const StyledDownloadButton = styled(QRButton)(() => ({
  "&.MuiButton-root": {
    width: "fit-content !important",
    marginBottom: "8px",
    // padding: "7px 55px",
    color: "#37498A",
    border: "1px solid #37498A",
  },
}));

export const StyledTypography = styled(QRTypography)(({ theme }: any) => ({
  fontSize: "20px",
  fontWeight: 500,
  lineHeight: "35px",
  letterSpacing: "0.01em",
  color: "#9FA1A5",
  [theme.breakpoints.down("1400")]: {
    fontSize: "16px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "18px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
}));

export const StyledText = styled(QRTypography)(({ theme }: any) => ({
  fontSize: "20px",
  fontWeight: 600,
  lineHeight: "35px",
  letterSpacing: "0.01em",
  color: "#1B294B",
  textDecoration: "none",
  [theme.breakpoints.down("1400")]: {
    fontSize: "16px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "18px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
}));

export const StyledLink = styled(Link)(({ theme }: any) => ({
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "19px",
  letterSpacing: "0.01em",
  color: "#0075FF",
  textDecoration: "none",
  [theme.breakpoints.down("1400")]: {
    fontSize: "14px",
  },
}));

export const StyledMiddleText = styled(QRTypography)(({ theme }: any) => ({
  fontSize: "18px",
  fontWeight: 600,
  letterSpacing: "0.01em",
  color: "#1B294B",
  [theme.breakpoints.down("1400")]: {
    fontSize: "16px",
  },
}));

export const StyledLocation = styled(QRTypography)(({ theme }: any) => ({
  fontSize: "13px",
  fontWeight: 600,
  lineHeight: "19px",
  letterSpacing: "0.01em",
  textAlign: "left",
  color: "#1B294B",
}));

export const StyledIp = styled(QRTypography)(() => ({
  fontSize: "13px",
  fontWeight: 400,
  lineHeight: "18px",
  letterSpacing: "0.01em",
  textAlign: "left",
  color: "#1B294B",
}));

export const StyledLocationFont = styled(QRTypography)(() => ({
  fontSize: "13px",
  fontWeight: 400,
  lineHeight: "35px",
  letterSpacing: "0.01em",
  textAlign: "left",
  color: "#1B294B",
}));

export const StyledViewMore = styled(Link)(() => ({
  fontSize: "13px",
  fontWeight: 400,
  lineHeight: "18px",
  letterSpacing: "0.01em",
  textAlign: "left",
  fontStyle: "italic",
}));

export const StyledEditQRText = styled.span`
  margin-left: 8px;
  font-size: 0.875rem;
  color: #224b99;
`;

export const StyledEditContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 10px;
}}
`;
