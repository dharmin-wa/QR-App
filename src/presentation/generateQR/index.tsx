/* eslint-disable @typescript-eslint/no-unused-vars */
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
import QRForm from "../QRCode/QRForm";

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
    handleLinkNameChange,
  } = GenerateQRContainer();

  const { t } = useTranslation();

  return <QRForm headTitle="QRgenerator" />;
};

export default GenerateQR;
