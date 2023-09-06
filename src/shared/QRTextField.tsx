import { FormLabel, TextField } from '@mui/material'
import React from 'react'

interface QRTextFieldProps {
  formLabel?: string | number
}

const QRTextField = ({ formLabel, ...rest }: QRTextFieldProps) => {
  return (
    <>
      {formLabel && (
        <FormLabel
          sx={{
            color: "primary.dark",
            fontSize: 14,
            marginBottom: 1,
            display: "block",
          }}
        >
          {formLabel}
        </FormLabel>
      )}
      <TextField {...rest} />

    </>
  )
}

export default QRTextField