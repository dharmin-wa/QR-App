import EmailVerifyContainer from "../../container/emailVerify.container";
import QRLoader from "../../shared/QRLoader";
import { formPath } from "../../description/emailVerify.description";

const EmailVerification = () => {
  const { loadingStatus } = EmailVerifyContainer({ formPath });
  if (loadingStatus) {
    return <QRLoader variant="fullPage" />;
  }
};

export default EmailVerification;
