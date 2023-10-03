import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import QRStack from "./QRStack";
import QRTypography from "./QRTypography";
import { loadStateFn, saveStateFn } from "../utils/localStorage";
import i18n from "../i18n/i18n";
import styled from "@emotion/styled";
import { ReactComponent as USFlag } from "../assets/svg/usFlag.svg";
import { ReactComponent as NetherlandsFlag } from "../assets/svg/netherlandsFlag.svg";

const countries = [
  { /* label: "United States", */ value: "en", icon: USFlag },
  { /* label: "Netherlands", */ value: "nl", icon: NetherlandsFlag },
];

const StyledSelector = styled(Select)(() => ({
  "& .MuiSelect-select": {
    padding: "6px 10px",
  },
}));

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
      <StyledSelector
        value={defaultValue}
        onChange={handleOptionChange}
        displayEmpty
        fullWidth
        name="languageSelector"
      >
        {countries?.map((option: any, index: number) => {
          const Icon = option?.icon;
          return (
            <MenuItem key={`${index}-${option?.value}`} value={option?.value}>
              <QRStack direction="row" spacing={1}>
                <Icon />
                {option?.label && (
                  <QRStack>
                    <QRTypography component="span">
                      {option?.label}
                    </QRTypography>
                  </QRStack>
                )}
              </QRStack>
            </MenuItem>
          );
        })}
      </StyledSelector>
    </FormControl>
  );
};

export default LanguageSelector;
