/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Avatar,
  Grid,
  IconButton,
  FormLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import QRTextField from "../../shared/QRTextField";
import "./profile.css";
import QRBox from "../../shared/QRBox";
import QRButton from "../../shared/QRButton";
import ProfileContainer from "../../container/profile.container";
import { attribute, formPath } from "../../description/profile.description";
import FormContainer from "../../container/form.container";
import { useTranslation } from "react-i18next";
import QRTypography from "../../shared/QRTypography";
import "react-country-state-city/dist/react-country-state-city.css";
import Form from "../../shared/Form";
import Helper from "./Helper";
import { ReactComponent as EditIcon } from "../../assets/svg/editProfile.svg";
import QRLoader from "../../shared/QRLoader";
import PhoneInput from "react-phone-input-2";

const Profile = () => {
  const { defaultValues } = Helper({ formPath });
  const { handleChange, formData, error, validate, setError } = FormContainer({
    attribute,
    defaultValues,
    formPath,
  });

  const { handleSubmit, loadingStatus, userData } = ProfileContainer({
    formData,
    validate,
    setError,
    formPath,
  });
  console.log("defaultValues", defaultValues, defaultValues?.firstName);
  const { t } = useTranslation();

  if (loadingStatus) {
    return <QRLoader variant="fullPage" />;
  }

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
      <Form onSubmit={handleSubmit}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          <Grid item xs={12} sm={10}>
            <QRTypography
              className="profile-header"
              fontSize="1.9rem"
              fontWeight={600}
            >
              Edit Profile
            </QRTypography>
          </Grid>
          <Grid item xs={2} sm={2}>
            <div style={{ position: "relative" }}>
              <Avatar
                src="/path_to_your_image.jpg"
                sx={{
                  width: 120,
                  height: 120,
                }}
              />
              <IconButton
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
              >
                <EditIcon style={{ width: "46px" }} />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <QRTextField
              formLabel="First name"
              error={!!error?.firstName}
              id="firstName"
              type="text"
              name="firstName"
              defaultValue={defaultValues?.firstName}
              value={formData?.firstName}
              helperText={t(error?.firstName)}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <QRTextField
              formLabel="Last name"
              error={!!error?.lastName}
              id="lastName"
              type="text"
              name="lastName"
              defaultValue={defaultValues?.lastName}
              value={formData?.lastName}
              helperText={t(error?.lastName)}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <QRTextField
              formLabel="Email"
              error={!!error?.email}
              id="email"
              type="text"
              name="email"
              defaultValue={defaultValues?.email}
              value={formData?.email}
              helperText={t(error?.email)}
              onChange={handleChange}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={4} mb={3}>
            <FormControl fullWidth>
              <FormLabel
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  lineHeight: "33px",
                  letterSpacing: "0",
                  color: "#1C1C1C",
                }}
              >
                State
              </FormLabel>
              <Select
                name="state"
                // value={age}
                label="State"
                onChange={handleChange}
              >
                <MenuItem value={10}>Karnataka</MenuItem>
                <MenuItem value={20}>Telangana</MenuItem>
                <MenuItem value={30}>Gujarat</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} mb={3}>
            <FormControl fullWidth>
              <FormLabel
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  lineHeight: "33px",
                  letterSpacing: "0",
                  color: "#1C1C1C",
                }}
              >
                City
              </FormLabel>
              <Select
                // value={age}
                name="city"
                label="City"
                onChange={handleChange}
              >
                <MenuItem value={10}>Bangalore</MenuItem>
                <MenuItem value={20}>Hyderabad</MenuItem>
                <MenuItem value={30}>Ahmedabad</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} mb={3}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <FormLabel
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  lineHeight: "33px",
                  letterSpacing: "0",
                  color: "#1C1C1C",
                }}
              >
                Phone number
              </FormLabel>
              <PhoneInput
                country={"us"}
                value={defaultValues?.phoneNo}
                enableSearch
                onChange={(value: string, country: { countryCode: string }) => {
                  const countryCodeName = country?.countryCode?.toUpperCase();
                  const updatedEvent = {
                    target: {
                      name: name,
                      value: value,
                      countryCodeName,
                    },
                  };
                  // handleDataChange(updatedEvent, 0);
                }}
                inputStyle={{
                  width: "100%",
                  fontSize: "medium",
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  padding: "26.5px 42px",
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={8} mb={3}>
            <QRTextField
              formLabel="Address"
              error={!!error?.address}
              id="address"
              type="text"
              name="address"
              defaultValue={defaultValues?.address}
              value={formData?.address}
              helperText={t(error?.address)}
              onChange={handleChange}
              fullWidth
            />
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
              type="submit"
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
      </Form>
    </QRBox>
  );
};

export default Profile;
