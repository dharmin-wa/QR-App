/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  // Modal,
  Box,
  Container,
  Paper,
  Grid,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Divider,
  Slider,
  FormHelperText,
} from "@mui/material";
import { QRCode } from "react-qrcode-logo";
import { showToast } from "../../utils/toastService";
import {
  emailValidation,
  urlValidation,
  validPhoneNumber,
} from "../../utils/regex";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import QRTypography from "../../shared/QRTypography";
import QRTextField from "../../shared/QRTextField";
import QRButton from "../../shared/QRButton";

enum QRType {
  Link,
  PhoneNumber,
  Email,
  MultiAction,
}

interface QRData {
  type: QRType;
  data: string[];
  theme: {
    containerColor: string;
    buttonColor: string;
    buttonTextColor: string;
    eyeColor: string;
  };
  name?: string;
}

const CreateQRCode = () => {
  const [qrData, setQRData] = useState<QRData>({
    type: QRType.Link,
    data: [""],
    theme: {
      containerColor: "#ffffff",
      buttonColor: "#000",
      buttonTextColor: "#ffffff",
      eyeColor: "#000",
    },
  });
  const [logo, setLogo] = useState<any>(null);

  const [logoWidth, setLogoWidth] = useState<number>(30);
  const [logoHeight, setLogoHeight] = useState<number>(30);
  const [generatedQRCode, setGeneratedQRCode] = useState<string>("");

  const [validationErrors, setValidationErrors] = useState<any>({
    [QRType.Link]: {
      validationError: false,
      requiredError: false,
    },
    [QRType.PhoneNumber]: {
      validationError: false,
      requiredError: false,
    },
    [QRType.Email]: {
      validationError: false,
      requiredError: false,
    },
    [QRType.MultiAction]: {
      validationErrors: [],
    },
  });

  const handleLogoWidthChange = (event: any) => {
    const newWidth = parseInt(event.target.value, 10);
    setLogoWidth(newWidth);
  };

  const handleLogoHeightChange = (event: any) => {
    const newHeight = parseInt(event.target.value, 10);
    setLogoHeight(newHeight);
  };

  const handleChangeType = (event: any) => {
    const type = event.target.value as QRType;
    setQRData({
      ...qrData,
      type,
      data: type === QRType.MultiAction ? [""] : [""],
      theme: {
        containerColor: "#ffffff",
        buttonColor: "#000",
        buttonTextColor: "#ffffff",
        eyeColor: "#000",
      },
    });
    setGeneratedQRCode("");
    setLogo(null);
  };

  const handleDataChange = (event: any, index: number) => {
    const newData = event.target.value;
    const updatedData = [...qrData.data];
    updatedData[index] = newData;
    const validationErrorsForLink: any = [
      ...validationErrors[QRType.MultiAction].validationErrors,
    ];

    let validationError = false;
    let requiredError = false;

    switch (qrData.type) {
      case QRType.Link:
        requiredError = isFieldEmpty(newData);
        validationError = !urlValidation(newData);
        break;
      case QRType.PhoneNumber:
        requiredError = isFieldEmpty(newData);
        validationError = !validPhoneNumber(newData);
        break;
      case QRType.Email:
        requiredError = isFieldEmpty(newData);
        validationError = !emailValidation(newData);
        break;
      case QRType.MultiAction:
        requiredError = qrData.data.some(isFieldEmpty);
        validationError = !isValidMultiActionLinks(qrData.data);
        break;
      default:
        break;
    }
    validationErrorsForLink[index] = {
      requiredError: isFieldEmpty(newData),
      validationError: !urlValidation(newData),
    };

    setValidationErrors((prevErrors: any) => ({
      ...prevErrors,
      [qrData.type]: { requiredError, validationError },
      [QRType.MultiAction]: {
        validationErrors: validationErrorsForLink,
      },
    }));

    setQRData({
      ...qrData,
      data: updatedData,
    });
  };

  const handlePhoneChange = (
    value: string,
    country: any,
    e: any,
    formattedValue: any,
  ) => {
    setQRData({
      ...qrData,
      data: [value, ...qrData.data.slice(1)],
    });
  };

  const handleNameChange = (e: { target: { value: string } }) => {
    setQRData({
      ...qrData,
      data: [qrData.data[0], e.target.value],
    });
  };

  const handleAddData = () => {
    setQRData({
      ...qrData,
      data: [...qrData.data, ""],
    });
  };

  const isValidMultiActionLinks = (links: Array<string>) => {
    return links.length >= 2;
  };

  const handleThemeChange = (property: string, value: string) => {
    setQRData({ ...qrData, theme: { ...qrData?.theme, [property]: value } });
  };

  const hasMinimumTwoLinks = (links: Array<string>) => {
    const validLinks = links.filter((link: string) => urlValidation(link));
    return validLinks.length >= 2;
  };

  const isFieldEmpty = (value: string | undefined) => {
    return !value || value.trim() === "";
  };

  const handleLogoUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && typeof event.target.result === "string") {
          setLogo(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateQR = () => {
    const { type, data } = qrData;
    const validationErrorsForLink = [
      ...validationErrors[QRType.MultiAction].validationErrors,
    ];

    let validationError = false;
    let requiredError = false;

    switch (type) {
      case QRType.Link:
        requiredError = isFieldEmpty(data[0]);
        validationError = !urlValidation(data[0]);
        break;
      case QRType.PhoneNumber:
        requiredError = isFieldEmpty(data[0]);
        validationError = !validPhoneNumber(data[0]);
        break;
      case QRType.Email:
        requiredError = isFieldEmpty(data[0]);
        validationError = !emailValidation(data[0]);
        break;
      case QRType.MultiAction:
        requiredError = data.some(isFieldEmpty);
        // validationError = !hasMinimumTwoLinks(data);
        break;
      default:
        break;
    }

    if (type === QRType.MultiAction) {
      data.forEach((link, index) => {
        validationErrorsForLink[index] = {
          requiredError: isFieldEmpty(link),
          validationError: !urlValidation(link),
        };
      });
    }

    setValidationErrors((prevErrors: any) => ({
      ...prevErrors,
      [type]: {
        validationError,
        requiredError,
      },
      [QRType.MultiAction]: {
        validationErrors: validationErrorsForLink,
      },
    }));

    console.log("validationErrorsForLink", validationErrorsForLink, data);
    /*  if (type === QRType.MultiAction && !hasMinimumTwoLinks(data)) {
       showToast("Please add at least 2 valid links.");
     } else { */
    if (!requiredError && !validationError) {
      if (type === QRType.MultiAction && !hasMinimumTwoLinks(data)) {
        showToast("Please add at least 2 valid links");
      }
      setGeneratedQRCode(qrData.data.join(","));
    }
  };

  const handleEditData = (index: number) => {
    const newData = prompt(`Edit Data ${index + 1}:`, qrData.data[index]);
    if (newData !== null) {
      const updatedData = [...qrData.data];
      updatedData[index] = newData;
      setQRData({
        ...qrData,
        data: updatedData,
      });
    }
  };

  const handleDeleteData = (index: number) => {
    const updatedData = qrData.data.filter((_, i) => i !== index);
    setQRData({
      ...qrData,
      data: updatedData,
    });
  };

  function getHelperText(type: QRType): string {
    switch (type) {
      case QRType.Link:
        return "Please enter a valid URL.";
      case QRType.PhoneNumber:
        return "Please enter a valid phone number.";
      case QRType.Email:
        return "Please enter a valid email address.";
      case QRType.MultiAction:
        return "Please add at least 2 links.";
      default:
        return "";
    }
  }

  return (
    <Container maxWidth="md">
      <Box p={4}>
        <QRTypography variant="h4" align="center" gutterBottom>
          QR Code Generator
        </QRTypography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <QRTypography variant="h6">QR Code Type</QRTypography>
              <Select
                fullWidth
                value={qrData.type}
                onChange={handleChangeType}
                variant="outlined"
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
                          validationErrors[QRType.MultiAction]
                            ?.validationErrors[index]?.requiredError
                            ? "Field is required"
                            : validationErrors[QRType.MultiAction]
                              ?.validationErrors[index]?.validationError
                              ? "Please enter a valid URL"
                              : ""
                        }
                      />
                      <Grid container spacing={2}>
                        {/* <Grid item xs={6}>
                          <QRButton
                            variant="contained"
                            color="primary"
                            onClick={() => handleEditData(index)}
                          >
                            Edit
                          </QRButton>
                        </Grid> */}
                        <Grid item xs={6}>
                          <QRButton
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDeleteData(index)}
                            isDisable={index === 0}
                          >
                            Delete
                          </QRButton>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                  <QRButton
                    variant="contained"
                    color="primary"
                    onClick={handleAddData}
                    sx={{ marginTop: "16px" }}
                  >
                    Add Data
                  </QRButton>
                </div>
              ) : (
                qrData.type !== QRType.PhoneNumber && (
                  <QRTextField
                    fullWidth
                    label={
                      qrData.type === QRType.Email ? "Email Address" : "URL"
                    }
                    value={qrData.data[0]}
                    onChange={(e) => handleDataChange(e, 0)}
                    error={
                      !!validationErrors[qrData.type].validationError ||
                      validationErrors[qrData.type].requiredError
                    }
                    helperText={
                      validationErrors[qrData.type]?.requiredError
                        ? "Field is required"
                        : validationErrors[qrData.type]?.validationError
                          ? getHelperText(qrData.type)
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
                    onChange={handlePhoneChange}
                    inputStyle={{
                      width: "100%",
                      fontSize: "16px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    containerStyle={{
                      marginBottom: "16px",
                    }}
                    inputProps={{
                      error:
                        !!validationErrors[qrData.type].validationError ||
                        validationErrors[qrData.type].requiredError,
                      helperText: validationErrors[qrData.type]?.requiredError
                        ? "Field is required"
                        : validationErrors[qrData.type]?.validationError
                          ? getHelperText(qrData.type)
                          : "",
                    }}
                  />
                  <QRTextField
                    fullWidth
                    label="Name (optional)"
                    value={qrData.data[1]}
                    onChange={handleNameChange}
                    sx={{
                      marginBottom: "16px",
                    }}
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
                Generate QR Code
              </QRButton>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <QRTypography variant="h6">QR Code Preview</QRTypography>
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <QRCode
                  value={generatedQRCode}
                  size={128}
                  fgColor={qrData?.theme?.buttonColor}
                  bgColor={qrData?.theme?.containerColor}
                  eyeColor={qrData?.theme?.eyeColor}
                  logoImage={logo}
                  logoWidth={logoWidth}
                  logoHeight={logoHeight}
                />
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
                      Foreground Colo
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
              <div style={{ margin: "16px 0" }}>
                <QRTypography id="logoWidthSlider" gutterBottom>
                  Logo Width
                </QRTypography>
                <Slider
                  value={logoWidth}
                  onChange={handleLogoWidthChange}
                  min={30}
                  max={50}
                  valueLabelDisplay="auto"
                  aria-labelledby="logoWidthSlider"
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <QRTypography id="logoHeightSlider" gutterBottom>
                  Logo Height
                </QRTypography>
                <Slider
                  value={logoHeight}
                  onChange={handleLogoHeightChange}
                  min={30}
                  max={50}
                  valueLabelDisplay="auto"
                  aria-labelledby="logoHeightSlider"
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CreateQRCode;
