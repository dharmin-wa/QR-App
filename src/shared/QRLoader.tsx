import { Box } from "@mui/material";
import styled from "@emotion/styled";
import RotateLoader from "react-spinners/RotateLoader";
import { equal } from "../utils/javascript";
import { useTheme } from "@mui/styles";
import { LoaderSizeMarginProps } from "react-spinners/helpers/props";
import classNames from "classnames";

const Loader: any = styled(Box)(() => ({
  "&.fullPage": {
    marginTop: 0,
    top: 64,
    position: "fixed",
    right: 0,
    bottom: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
  "&.transParent": {
    background: "rgba(0,0,0,0.2)",
  },
  "&.inline": {
    marginTop: 0,
    height: "auto",
  },
}));

const QRLoader = ({
  speedMultiplier = 1,
  size = 18,
  variant,
  ...props
}: LoaderSizeMarginProps & { variant: string }) => {
  const theme: any = useTheme();
  return (
    <Loader
      className={classNames({
        fullPage: equal(variant, "transParent") || equal(variant, "fullPage"),
        transParent: equal(variant, "transParent"),
        inline: equal(variant, "inline"),
      })}
      {...props}
    >
      <RotateLoader
        color={theme.palette.primary.main}
        size={size}
        speedMultiplier={speedMultiplier}
        {...props}
      />
    </Loader>
  );
};

export default QRLoader;
