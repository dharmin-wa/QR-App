import ModuleContainer from "../presentation/dashBoard/ModuleContainer";
import { ReactComponent as TotalQR } from "../assets/svg/dbAllQR.svg";
import { ReactComponent as ActiveQR } from "../assets/svg/dbActiveQR.svg";
import { ReactComponent as DisableQR } from "../assets/svg/dbDisableQR.svg";
import ChartContainer from "../presentation/dashBoard/ChartContainer";

export const topModule: JSX.Element[] = [
  <ChartContainer key={1} Indicator={TotalQR} title="ddd" value={100} />,
  <ModuleContainer
    key={1}
    Indicator={TotalQR}
    title="totalQRCode"
    value={100}
  />,
  <ModuleContainer
    key={1}
    Indicator={ActiveQR}
    title="totalActiveQR"
    value={100}
  />,
  <ModuleContainer
    key={1}
    Indicator={DisableQR}
    title="totalDisableQR"
    value={100}
  />,
];
