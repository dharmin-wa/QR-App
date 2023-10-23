/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Grid } from "@mui/material";
import QRTextField from "../../shared/QRTextField";
import "./profile.css";
import QRBox from "../../shared/QRBox";
import QRButton from "../../shared/QRButton";
import ProfileContainer from "../../container/profile.container";
import {
  attribute,
  defaultValues,
  formPath,
} from "../../description/profile.description";
import FormContainer from "../../container/form.container";
import { useTranslation } from "react-i18next";
import QRTypography from "../../shared/QRTypography";

import "react-country-state-city/dist/react-country-state-city.css";

const Profile = () => {
  const { handleChange, formData, error, validate, setError } = FormContainer({
    attribute,
    defaultValues,
    formPath,
  });

  const {
    // handleSubmit,
    // loadingStatus,
    userData,
  } = ProfileContainer({
    formData,
    validate,
    setError,
    formPath,
  });

  const { t } = useTranslation();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  return (
    <QRBox
      className="profile-container"
      pt={2}
      pl={2}
      pr={{
        xs: 2,
        xl: 25,
      }}
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 6 }}>
        <Grid item xs={12} sm={9}>
          <QRTypography
            className="profile-header"
            fontSize="1.9rem"
            fontWeight={600}
          >
            Edit Profile
          </QRTypography>
        </Grid>
        <Grid item xs={12} sm={3}>
          Image
        </Grid>
        <Grid item xs={12} sm={4}>
          <QRTextField
            formLabel="First name"
            error={!!error?.firstName}
            id="firstName"
            type="text"
            name="firstName"
            defaultValue={defaultValues?.firstName}
            helperText={t(error?.firstName)}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <QRTextField formLabel="Last name" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <QRTextField formLabel="Email" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <QRTextField formLabel="Email" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <QRTextField formLabel="State" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <QRTextField formLabel="Contact Number" />
        </Grid>
        <Grid item xs={12} sm={8}>
          <QRTextField fullWidth formLabel="Address" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <QRTextField formLabel="Password" />
        </Grid>
        <Grid item xs={12}>
          <QRButton
            variant="outlined"
            sx={{
              "&.MuiButton-root": {
                width: "fit-content !important",
                borderRadius: "29px",
                fontSize: "1rem",
              },
            }}
          >
            Cancel
          </QRButton>
          <QRButton
            variant="contained"
            sx={{
              "&.MuiButton-root": {
                width: "fit-content !important",
                borderRadius: "29px",
                fontSize: "1rem",
              },
            }}
          >
            Save
          </QRButton>
        </Grid>
      </Grid>
    </QRBox>
  );
};

export default Profile;
