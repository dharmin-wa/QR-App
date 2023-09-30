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
  InputAdornment,
  FormHelperText,
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
import GenerateQRContainer from "../../container/generateQR.container";

const GenerateQR = () => {
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
    setLogo,
    setLogoSize,
    handleLogoSizeChange,
  } = GenerateQRContainer();

  const { t } = useTranslation();

  return (
    <Container maxWidth={false}>
      <QRTypography variant="h4" align="center" gutterBottom>
        {t("QRgenerator")}
      </QRTypography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "24px" }}>
            <QRTypography variant="h6">{t("QRCodeType")}</QRTypography>
            <Select
              fullWidth
              value={qrData.type}
              onChange={handleChangeType}
              variant="outlined"
              sx={{ marginBottom: "16px" }}
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
                  <div key={index} style={{ marginBottom: "16px" }}>
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
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => handleDeleteData(index)}
                              disabled={index === 0}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
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
                  value={qrData.data[0]}
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
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
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
                  sx={{ marginBottom: "16px" }}
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
              sx={{ marginTop: "16px" }}
            >
              {t("generateQRCode")}
            </QRButton>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "24px" }}>
            <QRTypography variant="h6">{t("QRCodePreview")}</QRTypography>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <QRCode
                value={generatedQRCode}
                size={128}
                fgColor={qrData?.theme?.buttonColor}
                bgColor={qrData?.theme?.containerColor}
                eyeColor={qrData?.theme?.eyeColor}
                logoImage={logo}
                logoWidth={logoSize?.logoWidth}
                logoHeight={logoSize?.logoHeight}
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
            </Grid>
            <input
              type="file"
              id="logo"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleLogoUpload}
            />
            <label htmlFor="logo" style={{ marginTop: "16px" }}>
              <Button variant="outlined" component="span">
                Upload Logo
              </Button>
            </label>
            {logo && (
              <Button
                variant="outlined"
                onClick={() => {
                  setLogo(null);
                  setLogoSize({
                    logoWidth: 30,
                    logoHeight: 30,
                  });
                }}
                sx={{ margin: "0 16px" }}
              >
                <ClearIcon />
              </Button>
            )}

            <div style={{ margin: "10px 0" }}>
              <QRTypography id="logoWidthSlider" gutterBottom>
                Logo Width
              </QRTypography>
              <Slider
                value={logoSize?.logoWidth}
                name="logoWidth"
                onChange={handleLogoSizeChange}
                min={30}
                max={35}
                valueLabelDisplay="on"
                aria-labelledby="logoWidthSlider"
                // sx={{ m: "25px 0 0 0" }}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <QRTypography id="logoHeightSlider" gutterBottom>
                Logo Height
              </QRTypography>
              <Slider
                value={logoSize?.logoHeight}
                name="logoHeight"
                onChange={handleLogoSizeChange}
                min={30}
                max={35}
                valueLabelDisplay="on"
                aria-labelledby="logoHeightSlider"
                // sx={{ m: "25px 0" }}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GenerateQR;
