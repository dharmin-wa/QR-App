/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Grid,
  Paper,
  Checkbox,
  IconButton,
  Divider,
  Link as MuiLink,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import QRButton from "../../shared/QRButton";
import QRTypography from "../../shared/QRTypography";
import { ReactComponent as FileIcon } from "../../assets/svg/file.svg";
import { ReactComponent as QRDateIcon } from "../../assets/svg/qrDate.svg";
import { ReactComponent as LinkIcon } from "../../assets/svg/link.svg";
import { ReactComponent as EditIcon } from "../../assets/svg/edit.svg";
import { ReactComponent as ScannerIcon } from "../../assets/svg/scanner.svg";
import { ReactComponent as LocationIcon } from "../../assets/svg/location.svg";
import { ReactComponent as DownloadQRIcon } from "../../assets/svg/downloadQR.svg";
import { ReactComponent as EditQRIcon } from "../../assets/svg/editQR.svg";
import { ReactComponent as EditQRDesignIcon } from "../../assets/svg/editQRDesign.svg";
import { ReactComponent as Timer } from "../../assets/svg/timer.svg";
import QRBox from "../../shared/QRBox";
import {
  StyledDownloadButton,
  StyledDurationButton,
  StyledEditContainer,
  StyledEditQRText,
  StyledGridItem,
  StyledLocationText,
  StyledPaper,
  StyledTextSection,
} from "./style";
import { QRCode } from "react-qrcode-logo";

const QRFrame = ({ qrCodes }: any) => {
  return (
    <>
      {qrCodes.map((qr: any, index: number) => (
        <StyledPaper elevation={0} key={index}>
          <Grid container spacing={2}>
            {/* First Section */}
            <StyledGridItem item xs={12} sm={12} md={12} lg={5} key={qr.id}>
              <QRBox
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: { xs: "center", md: "start" },
                  justifyContent: { xs: "center", lg: "start" },
                  flexDirection: { xs: "column", md: "row" }, // Responsive layout
                  borderRight: { lg: "1px dashed #ccc" }, // Conditional border
                }}
              >
                <Checkbox checked={qr.checked} />
                <QRCode value={"generatedQRCode"} size={130} />
                <QRBox sx={{ p: "0 20px 0 10px" }}>
                  <QRTypography color="#9FA1A5">Link</QRTypography>
                  <QRTypography variant="subtitle1">
                    <MuiLink
                      href={qr.link}
                      sx={{
                        textDecoration: "none",
                        color: "#1B294B",
                        fontSize: "20px",
                      }}
                    >
                      <FileIcon /> {qr.companyName}
                    </MuiLink>
                  </QRTypography>
                  <QRTypography
                    variant="body2"
                    sx={{ color: "#1B294B", fontSize: "20px" }}
                  >
                    <QRDateIcon /> {qr.date}
                  </QRTypography>
                  <QRTypography variant="body2">
                    <LinkIcon />{" "}
                    <MuiLink href={qr.url} color="#0075FF">
                      {qr.url}
                    </MuiLink>{" "}
                    <EditIcon />
                  </QRTypography>
                  <QRTypography variant="caption" color="textSecondary">
                    {qr?.qrLink}
                  </QRTypography>
                </QRBox>
              </QRBox>
            </StyledGridItem>
            {/* Second Section */}
            <StyledGridItem item xs={12} sm={12} md={12} lg={2} key={qr.id}>
              <>
                <StyledTextSection>
                  <StyledLocationText>
                    <ScannerIcon />
                    <QRTypography variant="subtitle2" fontSize="18px">
                      Scans: <span style={{ fontWeight: 700 }}>{qr.scans}</span>
                    </QRTypography>
                  </StyledLocationText>
                  <StyledLocationText
                    style={{
                      alignItems: "start",
                      marginBottom: 5,
                    }}
                  >
                    <LocationIcon />
                    <div>
                      <QRTypography variant="body2" fontSize={18}>
                        Locations:
                      </QRTypography>
                      <QRTypography fontSize={13}>Ahmedabad</QRTypography>
                      <QRTypography fontSize={13}>192.451.3.323.1</QRTypography>
                    </div>
                  </StyledLocationText>
                  <QRTypography fontSize={13}>
                    +22 Locations <MuiLink href="#">View More</MuiLink>
                  </QRTypography>
                </StyledTextSection>
              </>
            </StyledGridItem>
            {/* Third Section */}
            <StyledGridItem item xs={12} sm={12} md={12} lg={5} key={qr.id}>
              <QRBox
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  paddingLeft: 4,
                  borderLeft: { lg: "1px dashed #ccc" },
                }}
              >
                <StyledDownloadButton
                  variant="outlined"
                  startIcon={<DownloadQRIcon />}
                >
                  Download QR
                </StyledDownloadButton>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <StyledEditContainer>
                    <EditQRIcon />
                    <StyledEditQRText>Edit QR</StyledEditQRText>
                  </StyledEditContainer>
                  <StyledEditContainer>
                    <EditQRDesignIcon />
                    <StyledEditQRText>Edit QR Design</StyledEditQRText>
                  </StyledEditContainer>
                </div>
                <StyledDurationButton>
                  <Timer
                    fill="#2D333D"
                    style={{ width: "15.44px", height: "15.44px", margin: 4 }}
                  />{" "}
                  Pack Duration: 15 days
                </StyledDurationButton>
              </QRBox>
            </StyledGridItem>
          </Grid>
          <IconButton
            style={{ position: "absolute", top: "5px", right: "1px" }}
          >
            <MoreVertIcon />
          </IconButton>
        </StyledPaper>
      ))}
    </>
  );
};

export default QRFrame;
