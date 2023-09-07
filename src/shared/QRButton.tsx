import React from 'react'
import { Button, ButtonOwnProps, CircularProgress } from '@mui/material';

interface QRButtonProps extends ButtonOwnProps {
  children?: string | number
  isDisable?: boolean
  isLoading?: boolean
  startIcon?: React.ReactNode
  type?: "button" | "submit" | "reset";
}


const QRButton = ({ children, isDisable, isLoading, startIcon, ...rest }: QRButtonProps) => {
  return <Button  {...rest}
    disabled={isDisable || isLoading}
    startIcon={isLoading ? <CircularProgress size={20} /> : startIcon}
    disableElevation>{children}</Button>
}

export default QRButton