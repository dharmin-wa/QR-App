/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "@emotion/styled";
import {
  Grid,
  Paper,
  Checkbox,
  IconButton,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import QRBox from "../../shared/QRBox";
import QRButton from "../../shared/QRButton";

export const StyledPaper = styled(Paper)`
  border: 1px solid #ccc;
  border-radius: 12px;
  margin: auto;
  padding: 20px 0;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  flex-direction: column; /* Responsive layout */
`;

export const StyledGridItem = styled(Grid)`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column; /* Responsive layout */
`;

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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 16px;

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
