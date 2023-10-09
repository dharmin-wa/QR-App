/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Grid,
  Paper,
  Checkbox,
  IconButton,
  Divider,
  Link as MuiLink,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
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
  StyledPaper,
  StyledGridItem,
  ItemContainer,
  StyledTypography,
  StyledText,
  StyledLink,
  StyledMiddleText,
  StyledLocation,
  StyledIp,
  StyledViewMore,
  StyledLocationFont,
} from "./style";
import { QRCode } from "react-qrcode-logo";
import moment from "moment";
import QRStack from "../../shared/QRStack";
import Logo from "../../assets/png/webAshlar.png";
import QrFrameContainer from "../../container/qrFrame.container";

interface QRFrameProps {
  qrCodes: any;
  formPath: any;
  responseSelector?: boolean;
}

const QRFrame = ({ qrCodes, formPath, responseSelector }: QRFrameProps) => {
  const qrCodess = [
    {
      id: 1,
      checked: false,
      qrCode: "QR_CODE_IMAGE_URL_1",
      link: "https://example.com",
      companyName: "Company A",
      date: "2023-09-15",
      url: "qrco.ew/bgBrewfdgdg",
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
      url: "qrco.ew/bgBrewfgdg",
      qrLink: "(https://webashlar.com)",
      scans: 150,
      location: "New York",
      ip: "192.168.0.1",
    },
    {
      id: 2,
      checked: false,
      qrCode: "QR_CODE_IMAGE_URL_2",
      link: "https://example.com",
      companyName: "Company B",
      date: "2023-09-16",
      url: "qrco.ew/bgBrewfgdg",
      qrLink: "(https://webashlar.com)",
      scans: 150,
      location: "New York",
      ip: "192.168.0.1",
    },
    // Add more QR codes as needed
  ];
  const {
    qrCodeSize,
    downloadQRCode,
    open,
    handleClick,
    handleClose,
    anchorEls,
    handleDeleteQRCode,
    handleOpenDeleteQRDialog,
    openDialog,
    handleCloseDeleteQRDialog,
    loadingStatus,
    handleViewQRCode,
    handleEditQRCode,
  } = QrFrameContainer({ formPath, responseSelector });
  return (
    <>
      {qrCodes?.length
        ? qrCodes?.map((qr: any, index: number) => (
            <StyledPaper elevation={0} sx={{ flexGrow: 1 }} key={index}>
              <Grid container spacing={{ xs: 2, md: 2, xl: 0 }}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={5}
                  xl
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: {
                      xl: "start",
                      lg: "start",
                      md: "center",
                      sm: "center",
                      xs: "center",
                    },
                    // bgcolor: "red",
                    // flexWrap: "wrap"
                    // flexDirection: { xs: "row", md: "row" }
                  }}
                >
                  <QRStack
                    direction={"row"}
                    spacing={{ xl: 5, md: 1, xs: 0 }}
                    sx={{
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <QRStack
                      direction={{ xl: "row", md: "row", sm: "column" }}
                      alignItems="center"
                      spacing={{ xl: 1, md: 0, xs: 0 }}
                    >
                      <Checkbox checked={qr.checked} />
                      <QRCode
                        value={qr?.data?.[qr?.qr_type]}
                        size={qrCodeSize}
                        eyeColor="#AD7A1E"
                        eyeRadius={4}
                        logoImage={Logo}
                        enableCORS={true}
                        logoWidth={45}
                        logoHeight={45}
                        id="QR"
                      />
                    </QRStack>
                    <Grid container>
                      <Grid item xs={12}>
                        <StyledTypography
                        /*    sx={{
                   fontSize: "20px",
                   fontWeight: 500,
                   lineHeight: "35px",
                   letterSpacing: "0.01em",
                   color: "#9FA1A5",
                 }} */
                        >
                          Link
                        </StyledTypography>
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <FileIcon />
                      </Grid>
                      <Grid item xs={11} display="flex">
                        <StyledText
                        // href={qr.link}
                        /*  sx={{
               fontSize: "20px",
               fontWeight: 600,
               lineHeight: "35px",
               letterSpacing: "0.01em",
               color: "#1B294B",
               textDecoration: "none",
             }} */
                        >
                          {qr.companyName}
                        </StyledText>
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        display="flex"
                        justifyContent="flex-start"
                      >
                        <QRDateIcon />
                      </Grid>
                      <Grid item xs={11} display="flex">
                        <StyledText
                        /*  variant="body2"
               sx={{
                 fontSize: "20px",
                 fontWeight: 600,
                 lineHeight: "35px",
                 letterSpacing: "0.01em",
                 color: "#1B294B",
               }} */
                        >
                          {moment(qr?.created_at).format("MMM D, YYYY")}
                        </StyledText>
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        display="flex"
                        justifyContent="flex-start"
                      >
                        <LinkIcon />
                      </Grid>
                      <Grid item xs={11} display="flex">
                        <QRStack direction="column">
                          <span style={{ whiteSpace: "nowrap" }}>
                            <StyledLink
                              href={qr.url} /* sx={{
                          fontSize: '16px',
                          fontWeight: 600,
                          lineHeight: '19px',
                          letterSpacing: '0.01em',
                          color: "#0075FF"
                        }} */
                            >
                              <span>{qr.url}</span>
                            </StyledLink>{" "}
                            <EditIcon />
                          </span>
                          <QRTypography variant="caption" color="textSecondary">
                            {qr?.qrLink}
                          </QRTypography>
                        </QRStack>
                      </Grid>
                    </Grid>
                  </QRStack>
                </Grid>
                {/* Second box */}
                <StyledGridItem
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={3}
                  xl={3}
                  sx={{
                    borderRight: { lg: "1px dashed #ccc" },
                    borderLeft: { lg: "1px dashed #ccc" },
                    // alignItems: "start"
                  }}
                >
                  <QRStack direction="row" gap={1} alignItems="center">
                    <Grid container>
                      <Grid
                        item
                        xs={2}
                        display="flex"
                        justifyContent="space-around"
                        alignItems="center"
                      >
                        <ScannerIcon />
                      </Grid>
                      <Grid item xs={10} display="flex">
                        <StyledMiddleText
                          sx={{
                            lineHeight: "35px",
                          }}
                        >
                          Scans:{" "}
                          <span className="fs" style={{ fontWeight: 700 }}>
                            {qr?.scans}
                          </span>
                        </StyledMiddleText>
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        display="flex"
                        justifyContent="space-around"
                      >
                        <LocationIcon />
                      </Grid>
                      <Grid item xs={10}>
                        <StyledMiddleText
                          sx={{
                            lineHeight: "22px",
                            textAlign: "left",
                          }}
                        >
                          Locations:
                        </StyledMiddleText>
                        <StyledLocation
                        /* sx={{
                fontSize: "13px",
                fontWeight: 600,
                lineHeight: "19px",
                letterSpacing: "0.01em",
                textAlign: "left",
              }} */
                        >
                          Ahmedabad
                        </StyledLocation>
                        <StyledIp
                        /*  sx={{
                 fontSize: "13px",
                 fontWeight: 400,
                 lineHeight: "18px",
                 letterSpacing: "0.01em",
                 textAlign: "left",
               }} */
                        >
                          192.451.3.323.1
                        </StyledIp>
                      </Grid>
                    </Grid>
                  </QRStack>
                  <QRStack
                    gap={1}
                    direction="row"
                    alignItems="center"
                    flexWrap="nowrap"
                  >
                    <StyledLocationFont
                    /*  sx={{
             fontSize: "13px",
             fontWeight: 400,
             // lineHeight: "35px",
             letterSpacing: "0.01em",
             textAlign: "left",
           }} */
                    >
                      +22 Locations
                    </StyledLocationFont>
                    <StyledViewMore
                      href="#"
                      sx={
                        {
                          // fontSize: "13px",
                          // fontStyle: "italic",
                          // fontWeight: 400,
                          // letterSpacing: "0.01em",
                          // textAlign: "left",
                        }
                      }
                    >
                      View More
                    </StyledViewMore>
                  </QRStack>
                </StyledGridItem>
                {/* third box */}
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
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
                      sx={{
                        padding: "7px 50px",
                      }}
                      startIcon={<DownloadQRIcon />}
                      onClick={() => downloadQRCode()}
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
                        style={{
                          width: "15.44px",
                          height: "15.44px",
                          margin: 4,
                        }}
                      />{" "}
                      Pack Duration: 15 days
                    </StyledDurationButton>
                  </ItemContainer>
                </Grid>
              </Grid>
              <IconButton
                style={{ position: "absolute", top: "5px", right: "1px" }}
                onClick={(e) => handleClick(e, index)}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEls[index]}
                open={Boolean(anchorEls[index])}
                onClose={() => handleClose(index)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{
                  "& .MuiPaper-root": {
                    boxShadow: "1px 1px 1px 1px #ccc",
                  },
                }}
              >
                <MenuItem onClick={() => handleViewQRCode(qr?._id)}>
                  View{" "}
                </MenuItem>
                <MenuItem onClick={() => handleEditQRCode(qr?._id)}>
                  Edit
                </MenuItem>
                <MenuItem onClick={() => handleOpenDeleteQRDialog(qr?._id)}>
                  Delete
                </MenuItem>
              </Menu>
            </StyledPaper>
          ))
        : "Qr code not found"}
      <Dialog open={openDialog} onClose={handleCloseDeleteQRDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this QR Code?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <QRButton onClick={handleCloseDeleteQRDialog} variant="outlined">
            No
          </QRButton>
          <QRButton
            onClick={handleDeleteQRCode}
            variant="contained"
            color="error"
            isLoading={loadingStatus}
          >
            Yes
          </QRButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QRFrame;
