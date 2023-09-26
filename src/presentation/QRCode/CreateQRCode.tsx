/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  // Modal,
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import { QRCode } from "react-qrcode-logo";

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
}

const CreateQRCode = () => {
  const [qrData, setQRData] = useState<QRData>({
    type: QRType.Link,
    data: [""],
    theme: {
      containerColor: "#ffffff",
      buttonColor: "#2196F3",
      buttonTextColor: "#ffffff",
      eyeColor: "#000",
    },
  });
  const [logo, setLogo] = useState<any>(null);

  const handleChangeType = (event: any) => {
    const type = event.target.value as QRType;
    setQRData({
      ...qrData,
      type,
      data: type === QRType.MultiAction ? [""] : [""], // Reset data based on type
    });
  };

  const handleDataChange = (event: any, index: number) => {
    const newData = event.target.value;
    const updatedData = [...qrData.data];
    updatedData[index] = newData;
    setQRData({
      ...qrData,
      data: updatedData,
    });
  };

  const handleAddData = () => {
    setQRData({
      ...qrData,
      data: [...qrData.data, ""],
    });
  };

  const handleThemeChange = (property: string, value: string) => {
    setQRData({ ...qrData, theme: { ...qrData?.theme, [property]: value } });
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
    // Implement QR code generation logic here
    // Example: Generate QR code using 'qrcode.react' library
  };

  return (
    <Container maxWidth="md">
      <Box p={2}>
        <Typography variant="h4" align="center" gutterBottom>
          QR Code Generator
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <Typography variant="h6">QR Code Type</Typography>
              <Select
                fullWidth
                value={qrData.type}
                onChange={handleChangeType}
                variant="outlined"
              >
                <MenuItem value={QRType.Link}>URL</MenuItem>
                <MenuItem value={QRType.Email}>Email</MenuItem>
                <MenuItem value={QRType.MultiAction}>Multi Action</MenuItem>
              </Select>
              <Divider style={{ margin: "16px 0" }} />

              {qrData.type === QRType.MultiAction ? (
                qrData.data.map((data, index) => (
                  <TextField
                    key={index}
                    fullWidth
                    label={`Data ${index + 1}`}
                    variant="outlined"
                    value={data}
                    onChange={(e) => handleDataChange(e, index)}
                  />
                ))
              ) : (
                <TextField
                  fullWidth
                  label={qrData.type === QRType.Email ? "Email Address" : "URL"}
                  variant="outlined"
                  value={qrData.data[0]}
                  onChange={(e) => handleDataChange(e, 0)}
                />
              )}
              {qrData.type === QRType.MultiAction && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddData}
                  style={{ marginTop: "16px" }}
                >
                  Add Data
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateQR}
                fullWidth
                style={{ marginTop: "16px" }}
              >
                Generate QR Code
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <Typography variant="h6">QR Code Preview</Typography>
              <div style={{ marginBottom: "16px" }}>
                <QRCode
                  value={qrData.data.join(", ")}
                  size={128}
                  fgColor={qrData?.theme?.buttonColor}
                  bgColor={qrData?.theme?.containerColor}
                  eyeColor={qrData?.theme?.eyeColor}
                  logoImage={logo}
                />
              </div>
              <Typography variant="subtitle1">LOGO B BITCOIN</Typography>
              <Divider style={{ margin: "16px 0" }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Background Color</InputLabel>
                    <TextField
                      type="color"
                      id="containerColor"
                      value={qrData?.theme?.containerColor}
                      onChange={(e) =>
                        handleThemeChange("containerColor", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Button Color</InputLabel>
                    <TextField
                      type="color"
                      id="buttonColor"
                      value={qrData?.theme?.buttonColor}
                      onChange={(e) =>
                        handleThemeChange("buttonColor", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
                {/* Add more controls for shape, logo, etc. */}
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
                  Upload Logo (optional)
                </Button>
              </label>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CreateQRCode;
