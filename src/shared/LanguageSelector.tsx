import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import QRStack from "./QRStack";
import QRTypography from "./QRTypography";
import { loadStateFn, saveStateFn } from "../utils/localStorage";
import i18n from "../i18n/i18n";

const countries = [
  { label: "United States", value: "en", icon: "🇺🇸" },
  { label: "Netherlands", value: "nl", icon: "🇳🇱" },
];

const LanguageSelector = () => {
  const [selectedOption, setSelectedOption] = useState(
    loadStateFn("selectedLanguage") || countries[0].value,
  );

  const handleOptionChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSelectedOption(value);
    i18n.changeLanguage(value);
    saveStateFn("selectedLanguage", value);
  };

  useEffect(() => {
    const storedLanguage = loadStateFn("selectedLanguage");
    if (storedLanguage) {
      setSelectedOption(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  const defaultValue =
    selectedOption === undefined ? countries[0]?.value : selectedOption;

  return (
    <FormControl>
      <Select
        value={defaultValue}
        onChange={handleOptionChange}
        displayEmpty
        fullWidth
        name="languageSelector"
      >
        {countries?.map((option, index) => (
          <MenuItem key={`${index}-${option?.value}`} value={option?.value}>
            <QRStack direction="row" spacing={1}>
              {option?.icon && (
                <QRTypography component="span">{option?.icon}</QRTypography>
              )}
              <QRStack>
                <QRTypography component="span">{option?.label}</QRTypography>
              </QRStack>
            </QRStack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
