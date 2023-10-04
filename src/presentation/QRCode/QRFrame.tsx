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
  GridContainer,
  StyledLocationText,
  StyledPaper,
  StyledTextSection,
  ItemContainer,
} from "./style";
import { QRCode } from "react-qrcode-logo";
import moment from "moment";
import QRStack from "../../shared/QRStack";

const QRFrame = ({ qrCodes }: any) => {
  const qrCodess = [
    {
      id: 1,
      checked: false,
      qrCode: "QR_CODE_IMAGE_URL_1",
      link: "https://example.com",
      companyName: "Company A",
      date: "2023-09-15",
      url: "https://example.com/qr1",
      qrLink: "(https://webashlar.com)",
      scans: 100,
      location: "Ahmedabad",
      ip: "192.451.3.323.1",
    },
    {
      id: 2,
      checked: false,
      qrCode: "QR_CODE_IMAGE_URL_2",
      link: "https://example.com",
      companyName: "Company B",
      date: "2023-09-16",
      url: "https://example.com/qr2",
      qrLink: "(https://webashlar.com)",
      scans: 150,
      location: "New York",
      ip: "192.168.0.1",
    },
    // Add more QR codes as needed
  ];
  return (
    <>
      {qrCodess?.map((qr: any, index: number) => (
        <StyledPaper elevation={0} sx={{ flexGrow: 1 }} key={index}>
          <GridContainer
            container
            spacing={0}
            sx={{
              flexDirection: { md: "column", lg: "row" },
            }}
          >
            <Grid item xs={5}>
              <QRStack direction={"row"} spacing={2}>
                <Checkbox checked={qr.checked} />
                <QRCode value={qr?.data?.[qr?.qr_type]} size={130} />

                <QRBox
                  sx={{
                    textAlign: { xs: "center", lg: "start" },
                  }}
                >
                  <QRTypography
                    sx={{
                      fontFamily: "Inter",
                      fontSize: "20px",
                      fontWeight: 500,
                      lineHeight: "24px",
                      letterSpacing: "0.01em",
                      textAlign: "left",
                      color: "#9FA1A5",
                    }}
                  >
                    Link
                  </QRTypography>
                  <QRTypography>
                    <MuiLink
                      href={qr.link}
                      sx={{
                        fontFamily: "Inter",
                        fontSize: "20px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        letterSpacing: "0.01em",
                        textAlign: "left",
                        color: "#1B294B",
                        textDecoration: "none",
                      }}
                    >
                      <FileIcon /> {qr.companyName}
                    </MuiLink>
                  </QRTypography>
                  <QRTypography
                    variant="body2"
                    sx={{
                      fontFamily: "Inter",
                      fontSize: "18px",
                      fontWeight: 600,
                      lineHeight: "24px",
                      letterSpacing: "0.01em",
                      textAlign: "left",
                      color: "#1B294B",
                    }}
                  >
                    <QRDateIcon />{" "}
                    {moment(qr?.created_at).format("MMM D, YYYY")}
                  </QRTypography>
                  <QRTypography
                    variant="body2"
                    sx={{
                      whiteSpace: { sm: "nowrap" },
                    }}
                  >
                    <LinkIcon />{" "}
                    <MuiLink href={qr.url} color="#0075FF" fontSize="small">
                      {qr.url}
                    </MuiLink>{" "}
                    <EditIcon />
                  </QRTypography>
                  <QRTypography variant="caption" color="textSecondary">
                    {qr?.qrLink}
                  </QRTypography>
                </QRBox>
              </QRStack>
            </Grid>
            {/* Second box */}
            <Grid item xs>
              <ItemContainer>
                <StyledTextSection>
                  <StyledLocationText>
                    <ScannerIcon />
                    <QRTypography
                      variant="subtitle2"
                      fontSize="large"
                      whiteSpace="nowrap"
                    >
                      Scans:{" "}
                      <span style={{ fontWeight: 700 }}>{qr?.scans}</span>
                    </QRTypography>
                  </StyledLocationText>
                  <StyledLocationText
                    style={{
                      alignItems: "start",
                    }}
                  >
                    <LocationIcon />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "start",
                        flexDirection: "column",
                      }}
                    >
                      <QRTypography variant="body2" fontSize="large">
                        Locations:
                      </QRTypography>
                      <QRTypography fontSize="small">Ahmedabad</QRTypography>
                      <QRTypography fontSize="small">
                        192.451.3.323.1
                      </QRTypography>
                    </div>
                  </StyledLocationText>
                  <QRTypography fontSize="small">
                    +22 Locations <MuiLink href="#">View More</MuiLink>
                  </QRTypography>
                </StyledTextSection>
              </ItemContainer>
            </Grid>
            <Grid item xs={5}>
              <ItemContainer
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
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
              </ItemContainer>
            </Grid>
            {/* First Section */}
            {/* <GridContainer
              item
              xs={5}
              sx={{ flexDirection: { xs: "column", sm: "row", md: "row" }, bgcolor: "red" }}
            >
              <QRStack direction={"row"} spacing={1}>
                <Checkbox checked={qr.checked} />
                <QRCode value={qr?.data?.[qr?.qr_type]} size={130} />
              </QRStack>
              <QRBox
                sx={{
                  p: "0 20px 0 10px",
                  textAlign: { xs: "center", lg: "start" },
                }}
              >
                <QRTypography sx={{
                  fontFamily: "Inter",
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  letterSpacing: "0.01em",
                  textAlign: "left",
                  color: "#9FA1A5"
                }}>Link</QRTypography>
                <QRTypography >
                  <MuiLink
                    href={qr.link}
                    sx={{
                      fontFamily: 'Inter',
                      fontSize: '20px',
                      fontWeight: 600,
                      lineHeight: '24px',
                      letterSpacing: '0.01em',
                      textAlign: 'left',
                      color: "#1B294B",
                      textDecoration: "none"
                    }}
                  >
                    <FileIcon /> {qr.companyName}
                  </MuiLink>
                </QRTypography>
                <QRTypography
                  variant="body2"
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: '18px',
                    fontWeight: 600,
                    lineHeight: '24px',
                    letterSpacing: '0.01em',
                    textAlign: 'left',
                    color: "#1B294B",

                  }}
                >
                  <QRDateIcon /> {moment(qr?.created_at).format("MMM D, YYYY")}
                </QRTypography>
                <QRTypography variant="body2" sx={{
                  whiteSpace: { sm: "nowrap" }
                }}>
                  <LinkIcon />{" "}
                  <MuiLink href={qr.url} color="#0075FF" fontSize="small">
                    {qr.url}
                  </MuiLink>{" "}
                  <EditIcon />
                </QRTypography>
                <QRTypography variant="caption" color="textSecondary">
                  {qr?.qrLink}
                </QRTypography>
              </QRBox>
            </GridContainer> */}
            {/* Second Section */}
            {/* <GridContainer
              item
              xs={3}
              sx={{
                borderRight: { lg: "1px dashed #ccc" },
                borderLeft: { lg: "1px dashed #ccc" },
              }}
            >
              <ItemContainer>
                <StyledTextSection>
                  <StyledLocationText>
                    <ScannerIcon />
                    <QRTypography variant="subtitle2" fontSize="large" whiteSpace="nowrap">
                      Scans:{" "}
                      <span style={{ fontWeight: 700 }}>{qr?.scans}</span>
                    </QRTypography>
                  </StyledLocationText>
                  <StyledLocationText
                    style={{
                      alignItems: "start",
                    }}
                  >
                    <LocationIcon />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "start",
                        flexDirection: "column",
                      }}
                    >
                      <QRTypography variant="body2" fontSize="large">
                        Locations:
                      </QRTypography>
                      <QRTypography fontSize="small">Ahmedabad</QRTypography>
                      <QRTypography fontSize="small">192.451.3.323.1</QRTypography>
                    </div>
                  </StyledLocationText>
                  <QRTypography fontSize="small">
                    +22 Locations <MuiLink href="#">View More</MuiLink>
                  </QRTypography>
                </StyledTextSection>
              </ItemContainer>
            </GridContainer> */}
            {/* Third Section */}
            {/* <GridContainer item xs={4}>
              <ItemContainer
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
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
              </ItemContainer>
            </GridContainer> */}
          </GridContainer>
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
