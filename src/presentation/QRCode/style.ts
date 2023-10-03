import styled from "@emotion/styled";
import { Grid, Paper } from "@mui/material";
import QRBox from "../../shared/QRBox";
import QRButton from "../../shared/QRButton";

export const StyledPaper = styled(Paper)`
  border: 1px solid #ccc;
  border-radius: 12px;
  margin: auto;
  padding: 10px 6px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  flexgrow: 1;
`;

export const GridContainer = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  justifyContent: "center",
  flex: 1,
  padding: 5,
  flexDirection: "column",
}));

export const StyledGridItem = styled(Grid)`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
`;

export const ItemContainer = styled(QRBox)(({ theme }: any) => ({
  padding: theme.spacing(1),
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
    padding: "7px 55px",
    color: "#37498A",
    border: "1px solid #37498A",
  },
}));

export const StyledTextSection = styled.div`
  & > div > svg {
    margin-right: 8px;
  }
`;

export const StyledLocationText = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

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
