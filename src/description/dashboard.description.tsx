import ModuleContainer from "../presentation/dashBoard/ModuleContainer";
import { ReactComponent as TotalQR } from "../assets/svg/dbAllQR.svg";
import { ReactComponent as ActiveQR } from "../assets/svg/dbActiveQR.svg";
import { ReactComponent as DisableQR } from "../assets/svg/dbDisableQR.svg";
import ChartContainer from "../presentation/dashBoard/ChartContainer";

export const topModule: JSX.Element[] = [
  <ChartContainer key={1} />,
  <ModuleContainer
    key={2}
    Indicator={TotalQR}
    title="totalQRCode"
    value={100}
  />,
  <ModuleContainer
    key={3}
    Indicator={ActiveQR}
    title="totalActiveQR"
    value={100}
  />,
  <ModuleContainer
    key={4}
    Indicator={DisableQR}
    title="totalDisableQR"
    value={100}
  />,
];

export const MIN_CONTRAST_RATIO = 4.5;

export const formPath = { parent: "dashboard", child: "qrs-list" };
