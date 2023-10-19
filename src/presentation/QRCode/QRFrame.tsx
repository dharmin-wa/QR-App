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
import { useTranslation } from "react-i18next";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { imageSizes } from "../../description/dashboard.description";
interface QRFrameProps {
  qrCodes: any;
  formPath: any;
  responseSelector?: boolean;
  getCountListQrCode?: () => void;
}

const QRFrame = ({
  qrCodes,
  formPath,
  responseSelector,
  getCountListQrCode,
}: QRFrameProps) => {
  const { t } = useTranslation();

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
    handleOpenSizeMenu,
    handleEditQRCode,
    handleCloseSizeMenu,
    sizeMenuAnchor,
  } = QrFrameContainer({ formPath, responseSelector, getCountListQrCode });

  return (
    <>
      {qrCodes?.length
        ? qrCodes?.map((qr: any, index: number) => (
            <StyledPaper
              elevation={0}
              sx={{
                flexGrow: 1,
                border: { xs: "1px solid #356ABA", lg: "none" },
              }}
              key={index}
            >
              <Grid
                container
                sm={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: { sm: "center", xs: "center", lg: "" },
                }}
              >
                {/* first section */}
                <Grid
                  xs={12}
                  md={12}
                  lg={5}
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", lg: "start" },
                    paddingBottom: { sm: "10px", lg: "0px" },
                  }}
                >
                  <QRStack
                    direction={"row"}
                    spacing={{ xl: 5, md: 1, xs: 0 }}
                    sx={{
                      flexDirection: { xs: "column", sm: "row", md: "row" },
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
                        fgColor={qr?.buttonColor || "#000"}
                        bgColor={qr?.containerColor || "#ffffff"}
                        size={qrCodeSize}
                        eyeColor={qr?.eyeColor || "#000"}
                        eyeRadius={qr?.eyeRadius || 0}
                        logoImage={qr?.logo}
                        enableCORS={true}
                        logoWidth={45}
                        logoHeight={45}
                        qrStyle={qr?.qrStyle || "squares"}
                        id="QR"
                      />
                    </QRStack>
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "3px",
                        justifyContent: { sm: "end", md: "center" },
                        alignItems: { xs: "center", sm: "start" },
                      }}
                    >
                      <Grid item>
                        <StyledTypography>{qr?.qr_type}</StyledTypography>
                      </Grid>

                      <Grid
                        item
                        sx={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <FileIcon style={{ width: "20px" }} />
                        <StyledText>
                          {qr?.title || t("notAvailable")}
                        </StyledText>
                      </Grid>

                      <Grid
                        item
                        sx={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <QRDateIcon style={{ width: "20px" }} />
                        <StyledText>
                          {moment(qr?.created_at).format("MMM D, YYYY")}
                        </StyledText>
                      </Grid>

                      <Grid
                        item
                        sx={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <LinkIcon style={{ width: "20px" }} />
                        <QRStack direction="column">
                          <span style={{ whiteSpace: "nowrap" }}>
                            <StyledLink href={qr.url}>
                              <span>{qr.url || t("notAvailable")}</span>
                            </StyledLink>{" "}
                            <EditIcon />
                          </span>
                          <QRTypography variant="caption" color="textSecondary">
                            {qr?.link || t("notAvailable")}
                          </QRTypography>
                        </QRStack>
                      </Grid>
                    </Grid>
                  </QRStack>
                </Grid>
                {/* second section */}
                <Grid
                  xs={12}
                  md={6}
                  lg={3}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: { lg: "1px dashed #ccc" },
                    borderLeft: { lg: "1px dashed #ccc" },
                  }}
                >
                  <QRStack direction="row" gap={1} alignItems="center">
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "3px",
                        justifyContent: "center",
                        alignItems: { xs: "center", sm: "start" },
                      }}
                    >
                      <Grid
                        item
                        sx={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <ScannerIcon style={{ width: "20px" }} />
                        <StyledMiddleText
                          sx={{
                            lineHeight: "35px",
                          }}
                        >
                          Scans:
                          <span className="fs" style={{ fontWeight: 700 }}>
                            {qr?.scans || t("notAvailable")}
                          </span>
                        </StyledMiddleText>
                      </Grid>

                      <Grid
                        item
                        sx={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "start",
                        }}
                      >
                        <LocationIcon style={{ width: "20px" }} />
                        <QRBox>
                          <StyledMiddleText
                            sx={{
                              lineHeight: "22px",
                              textAlign: "left",
                            }}
                          >
                            Locations:
                          </StyledMiddleText>
                          <StyledLocation>
                            {qr?.location || t("notAvailable")}
                          </StyledLocation>
                          <StyledIp>{qr?.ip || t("notAvailable")}</StyledIp>
                        </QRBox>
                      </Grid>
                    </Grid>
                  </QRStack>
                  <QRStack
                    gap={1}
                    direction="row"
                    alignItems="center"
                    flexWrap="nowrap"
                  >
                    <StyledLocationFont>
                      {qr?.no || t("notAvailable")}
                    </StyledLocationFont>
                    <StyledViewMore href="#">View More</StyledViewMore>
                  </QRStack>
                </Grid>
                {/* third section */}
                <Grid sm={12} md={6} lg={4}>
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
                      onClick={handleOpenSizeMenu}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      Download QR
                    </StyledDownloadButton>
                    <Menu
                      anchorEl={sizeMenuAnchor}
                      open={Boolean(sizeMenuAnchor)}
                      onClose={handleCloseSizeMenu}
                    >
                      {imageSizes?.map((img, index) => {
                        return (
                          <MenuItem
                            key={index}
                            onClick={() => downloadQRCode(img)}
                          >
                            {img.width}x{img.height}
                          </MenuItem>
                        );
                      })}
                    </Menu>
                    <div
                      style={{ display: "flex", alignItems: "flex-end" }}
                      onClick={() => handleEditQRCode(qr?._id)}
                    >
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
                  View
                </MenuItem>
                <MenuItem onClick={() => handleEditQRCode(qr?._id)}>
                  Edit
                </MenuItem>
                <MenuItem onClick={() => handleOpenDeleteQRDialog(qr?._id)}>
                  Delete
                </MenuItem>
              </Menu>
              {/* </StyledPaper> */}
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
