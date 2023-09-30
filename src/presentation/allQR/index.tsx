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
import { QRCode } from "react-qrcode-logo";
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
import QRBox from "../../shared/QRBox";

const AllQR = () => {
  const qrCodes = [
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
      {qrCodes.map((qr, index) => (
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "20px 0",
            marginBottom: "20px",
          }}
          key={index}
        >
          <Grid container spacing={2}>
            {/* First Section */}
            <Grid item xs={12} sm={6} md={5} key={qr.id}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox checked={qr.checked} />
                <QRCode value={"generatedQRCode"} size={100} />
                <QRBox sx={{ p: "0 20px 0 10px" }}>
                  <QRTypography color="#9FA1A5">Link</QRTypography>
                  <QRTypography variant="subtitle1">
                    <MuiLink href={qr.link}>
                      <FileIcon /> {qr.companyName}
                    </MuiLink>
                  </QRTypography>
                  <QRTypography variant="body2" color="textSecondary">
                    <QRDateIcon /> {qr.date}
                  </QRTypography>
                  <QRTypography variant="body2" color="textSecondary">
                    <LinkIcon /> <MuiLink href={qr.url}>{qr.url}</MuiLink>{" "}
                    <EditIcon />
                  </QRTypography>
                  <span>{qr?.qrLink}</span>
                </QRBox>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderStyle: "dashed" }}
                />
              </div>
            </Grid>
            {/* Second Section */}
            <Grid item xs={12} sm={6} md={3} key={qr.id}>
              <div style={{ marginTop: "16px" }}>
                <QRTypography variant="subtitle2">
                  <ScannerIcon /> Scans: {qr.scans}
                </QRTypography>
                <QRTypography variant="body2">
                  <LocationIcon /> Locations:
                </QRTypography>
                <QRTypography>{qr.location}</QRTypography>
                <QRTypography>{qr.ip}</QRTypography>
                <QRTypography>
                  +22 locations <MuiLink href="#">View More</MuiLink>
                </QRTypography>
              </div>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderStyle: "dashed" }}
              />
            </Grid>
            {/* Third Section */}
            <Grid item xs={12} sm={6} md={4} key={qr.id}>
              <div style={{
                display: "flex",
                justifyContent: "center", alignItems: "center",
                flexDirection: "column"
              }}>
                <QRButton
                  variant="outlined"
                  sx={{
                    "&.MuiButton-root": {
                      width: "fit-content !important",
                      marginBottom: "8px",
                      p: "7px 55px",
                      color: "#37498A",
                      border: "1px solid #37498A"
                    },
                  }}
                  startIcon={<DownloadQRIcon />}
                >
                  Download QR
                </QRButton>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      margin: "10px",
                    }}
                  >
                    <EditQRIcon />
                    <span style={{ marginLeft: "8px", fontSize: "0.875rem", color: "#224B99" }}>
                      Edit QR
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <EditQRDesignIcon />
                    <span style={{ marginLeft: "8px", fontSize: "0.875rem", color: "#224B99" }}>
                      Edit QR Design
                    </span>
                  </div>
                </div>
                <div
                  style={{
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
                    borderRadius: "6px"
                  }}
                >
                  Pack Duration: 15 days
                </div>
                <IconButton
                  style={{ position: "absolute", top: "16px", right: "16px" }}
                >
                  <MoreVertIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Paper >
      ))}
    </>
  );
};

export default AllQR;
