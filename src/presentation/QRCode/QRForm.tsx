import React from "react";
import {
  Container,
  Paper,
  Grid,
  Select,
  MenuItem,
  Button,
  FormControl,
  Divider,
  Slider,
  IconButton,
  Alert,
  // InputAdornment,
  FormHelperText,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { QRCode } from "react-qrcode-logo";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import QRTypography from "../../shared/QRTypography";
import QRTextField from "../../shared/QRTextField";
import QRButton from "../../shared/QRButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "react-i18next";
import QRBox from "../../shared/QRBox";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import GrainIcon from "@mui/icons-material/Grain";
import InputLabel from "@mui/material/InputLabel";
import QRFormContainer from "../../container/qrForm.container";

interface QRFormProps {
  headTitle: string;
  qrCode?: any;
  editQR?: boolean;
}

const QRForm = ({ headTitle, qrCode, editQR = false }: QRFormProps) => {
  const {
    qrData,
    handleChangeType,
    QRType,
    handleDataChange,
    validationErrors,
    handleDeleteData,
    handleAddData,
    getHelperText,
    handleNameChange,
    handleGenerateQR,
    generatedQRCode,
    logo,
    logoSize,
    contrastError,
    handleLogoUpload,
    handleThemeChange,
    handleClearLogo,
    handleLogoSizeChange,
    handleLinkNameChange,
    handleStatusChange,
    handleTitleChange,
    handleBgChange,
    checked,
    loadingStatus,
  } = QRFormContainer({ qrCode, editQR });

  const { t } = useTranslation();
  console.log('logo-main', logo)
  return (
    <Container maxWidth={false}>
      <QRTypography variant="h4" align="center" gutterBottom>
        {t(headTitle)}
      </QRTypography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" style={{ padding: "24px" }}>
            <QRTypography variant="h6" textAlign="center" p={1}>
              {t("title")}
            </QRTypography>
            <QRTextField
              fullWidth
              label="Title"
              value={qrData?.title}
              onChange={(e) => handleTitleChange(e)}
              error={
                !!validationErrors.title.validationError ||
                validationErrors.title.requiredError
              }
              helperText={
                validationErrors.title?.requiredError
                  ? t("required")
                  : validationErrors.title?.validationError
                    ? t("blankSpaceNotAllowed")
                    : ""
              }
            />
            <QRTypography variant="h6" textAlign="center" p={1}>
              {t("QRCodeType")}
            </QRTypography>
            <Select
              fullWidth
              value={qrData?.type}
              onChange={handleChangeType}
              variant="outlined"
              sx={{ marginBottom: "16px", borderRadius: "8px" }}
            >
              <MenuItem value={QRType.Link}>URL</MenuItem>
              <MenuItem value={QRType.Email}>Email</MenuItem>
              <MenuItem value={QRType.PhoneNumber}>PhoneNumber</MenuItem>
              <MenuItem value={QRType.MultiAction}>Multi Action</MenuItem>
            </Select>
            <Divider style={{ margin: "16px 0" }} />

            {qrData.type === QRType.MultiAction ? (
              <div>
                {qrData.data.map((data, index) => (
                  <QRBox
                    key={index}
                    sx={{
                      marginBottom: "16px",
                      display: "flex",
                      flexDirection: { md: "column", lg: "row" },
                      gap: "5px",
                    }}
                  >
                    <QRTextField
                      fullWidth
                      value={data}
                      onChange={(e) => handleDataChange(e, index)}
                      label={`Link ${index + 1}`}
                      error={
                        !!validationErrors[QRType.MultiAction]
                          ?.validationErrors[index]?.validationError
                      }
                      helperText={
                        validationErrors[QRType.MultiAction]?.validationErrors[
                          index
                        ]?.requiredError
                          ? t("required")
                          : validationErrors[QRType.MultiAction]
                            ?.validationErrors[index]?.validationError
                            ? t("enterValidURL")
                            : ""
                      }
                    />
                    <QRTextField
                      fullWidth
                      value={qrData.linkNames[index]}
                      name="linkName"
                      onChange={(e) => handleLinkNameChange(e, index)}
                      label={`Title ${index + 1}`}
                    />
                    <IconButton
                      onClick={() => handleDeleteData(index)}
                      disabled={index === 0}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </QRBox>
                ))}
                <QRButton
                  variant="contained"
                  color="primary"
                  onClick={handleAddData}
                  sx={{ marginTop: "16px" }}
                >
                  {t("addLink")}
                </QRButton>
              </div>
            ) : (
              qrData.type !== QRType.PhoneNumber && (
                <QRTextField
                  fullWidth
                  label={
                    qrData.type === QRType.Email ? t("emailAddress") : "URL"
                  }
                  value={qrData?.data[0]}
                  onChange={(e) => handleDataChange(e, 0)}
                  error={
                    !!validationErrors[qrData.type].validationError ||
                    validationErrors[qrData.type].requiredError
                  }
                  helperText={
                    validationErrors[qrData.type]?.requiredError
                      ? t("required")
                      : validationErrors[qrData.type]?.validationError
                        ? t(getHelperText(qrData.type))
                        : ""
                  }
                />
              )
            )}

            {qrData.type === QRType.PhoneNumber && (
              <>
                <PhoneInput
                  country={"us"}
                  value={qrData.data[0]}
                  enableSearch
                  onChange={(
                    value: string,
                    country: { countryCode: string },
                  ) => {
                    const countryCodeName = country?.countryCode?.toUpperCase();
                    const updatedEvent = {
                      target: {
                        name: name,
                        value: value,
                        countryCodeName,
                      },
                    };
                    handleDataChange(updatedEvent, 0);
                  }}
                  inputStyle={{
                    width: "100%",
                    fontSize: "small",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                  inputProps={{
                    error:
                      validationErrors[QRType.PhoneNumber]?.validationError ||
                      validationErrors[QRType.PhoneNumber]?.requiredError,
                  }}
                />
                <FormHelperText
                  error={
                    validationErrors[QRType.PhoneNumber]?.validationError ||
                    validationErrors[QRType.PhoneNumber]?.requiredError
                  }
                  sx={{ marginBottom: 1 }}
                >
                  {validationErrors[QRType.PhoneNumber]?.requiredError
                    ? t("required")
                    : validationErrors[QRType.PhoneNumber]?.validationError
                      ? t("enterValidPhoneNumber")
                      : ""}
                </FormHelperText>

                <QRTextField
                  fullWidth
                  label="Name (optional)"
                  value={qrData.data[1]}
                  onChange={handleNameChange}
                />
              </>
            )}
            <QRButton
              variant="contained"
              color="primary"
              onClick={handleGenerateQR}
              fullWidth
              isLoading={loadingStatus}
              sx={{ marginTop: 1 }}
            >
              {t(editQR ? "editQRCode" : "generateQRCode")}
            </QRButton>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" style={{ padding: 24 }}>
            <QRBox sx={{ textAlign: "end" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={qrData?.status === "A"}
                    onChange={handleStatusChange}
                    color="primary"
                  />
                }
                label={qrData?.status === "A" ? "Active" : "Disabled"}
              />
            </QRBox>
            <QRTypography variant="h6" textAlign="center" p={1}>
              {t("QRCodePreview")}
            </QRTypography>
            <div style={{ textAlign: "center", marginBottom: 1 }}>
              <QRCode
                id="QR"
                value={generatedQRCode}
                size={128}
                fgColor={qrData?.theme?.buttonColor}
                bgColor={qrData?.theme?.containerColor}
                eyeColor={qrData?.theme?.eyeColor}
                logoImage={logo && URL.createObjectURL(logo)}
                logoWidth={checked ? 128 : logoSize?.logoWidth}
                logoHeight={checked ? 128 : logoSize?.logoHeight}
                eyeRadius={qrData?.theme?.eyeRadius}
                qrStyle={qrData?.theme?.qrStyle}
                logoOpacity={checked ? 0.4 : 1}
              />
              {contrastError && (
                <Alert severity="warning">{t("colorContrastWarning")}</Alert>
              )}
            </div>

            <Divider style={{ margin: "16px 0" }} />
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <QRTypography id="logoWidthSlider" gutterBottom>
                    Background Color
                  </QRTypography>
                  <QRTextField
                    type="color"
                    id="containerColor"
                    value={qrData?.theme?.containerColor}
                    onChange={(e) =>
                      handleThemeChange("containerColor", e.target.value)
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <QRTypography id="logoWidthSlider" gutterBottom>
                    Foreground Color
                  </QRTypography>
                  <QRTextField
                    type="color"
                    id="buttonColor"
                    value={qrData?.theme?.buttonColor}
                    onChange={(e) =>
                      handleThemeChange("buttonColor", e.target.value)
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <QRTypography id="logoWidthSlider" gutterBottom>
                    Squares Color
                  </QRTypography>
                  <QRTextField
                    type="color"
                    id="eyeColor"
                    value={qrData?.theme?.eyeColor}
                    onChange={(e) =>
                      handleThemeChange("eyeColor", e.target.value)
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>QR style</InputLabel>
                  <Select
                    label="QR style"
                    value={qrData?.theme?.qrStyle}
                    onChange={(e) =>
                      handleThemeChange("qrStyle", e.target.value as string)
                    }
                    sx={{
                      "& .MuiSelect-select": {
                        padding: "10px 10px",
                      },
                      borderRadius: "8px",
                    }}
                  >
                    <MenuItem value="squares">
                      <ViewCompactIcon fontSize="large" />
                    </MenuItem>
                    <MenuItem value="dots">
                      <GrainIcon fontSize="large" />
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <QRTypography gutterBottom sx={{ marginTop: "16px" }}>
                  Squares Radius: {qrData?.theme?.eyeRadius}
                </QRTypography>
                <Slider
                  value={qrData?.theme?.eyeRadius}
                  onChange={(e: any) =>
                    handleThemeChange("eyeRadius", e?.target?.value as number)
                  }
                  min={1}
                  max={50}
                  valueLabelDisplay="auto"
                  aria-labelledby="eye-radius-slider"
                />
              </Grid>
            </Grid>
            <QRBox
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <input
                type="file"
                id="logo"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleLogoUpload}
              />
              <label htmlFor="logo">
                <Button variant="outlined" component="span">
                  Upload Logo
                </Button>
              </label>

              {logo && (
                <>
                  <img
                    src={logo && URL.createObjectURL(logo)}
                    width={32}
                    height={32}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={checked}
                        onChange={handleBgChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label={"Set as a background image"}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleClearLogo}
                    sx={{ margin: "0 16px" }}
                  >
                    <ClearIcon />
                  </Button>
                </>
              )}
            </QRBox>
            {!checked && logo ? (
              <>
                {" "}
                <div style={{ margin: "10px 0" }}>
                  <QRTypography id="logoWidthSlider" gutterBottom>
                    Logo Width: {logoSize?.logoWidth}
                  </QRTypography>
                  <Slider
                    value={logoSize?.logoWidth}
                    name="logoWidth"
                    onChange={handleLogoSizeChange}
                    min={30}
                    max={35}
                    aria-labelledby="logoWidthSlider"
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <QRTypography id="logoHeightSlider" gutterBottom>
                    Logo Height: {logoSize?.logoHeight}
                  </QRTypography>
                  <Slider
                    value={logoSize?.logoHeight}
                    name="logoHeight"
                    onChange={handleLogoSizeChange}
                    min={30}
                    max={35}
                    aria-labelledby="logoHeightSlider"
                  />
                </div>{" "}
              </>
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default QRForm;
