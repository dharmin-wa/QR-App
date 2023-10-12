/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  MIN_CONTRAST_RATIO,
  formPath,
} from "../description/generateQR.description";
import {
  emailValidation,
  urlValidation,
  validPhoneNumber,
} from "../utils/regex";
import { SET_FORM_DATA } from "../redux/constants";
import { getContrastRatio } from "../helpers/util";
import { showToast } from "../utils/toastService";
import { ApiContainer } from "../utils/api";
import { apiEndPoints, method } from "../utils/constant";
import { loadStateFn } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { countryWisePhoneValidation } from "../utils/phoneInputRegex";

enum QRType {
  Link,
  PhoneNumber,
  Email,
  MultiAction,
}

interface QRData {
  type: QRType;
  data: string[];
  theme: {
    containerColor: string;
    buttonColor: string;
    buttonTextColor: string;
    eyeColor: string;
    qrStyle: any;
    eyeRadius: number;
  };
  name?: string;
  linkNames: string[];
  status: string;
}

interface QRFormContainerProps {
  qrCode: any;
  editQR: boolean;
}

const initialValidationErrors = {
  [QRType.Link]: {
    validationError: false,
    requiredError: false,
  },
  [QRType.PhoneNumber]: {
    validationError: false,
    requiredError: false,
  },
  [QRType.Email]: {
    validationError: false,
    requiredError: false,
  },
  [QRType.MultiAction]: {
    validationErrors: [],
  },
};

const initialQrData = {
  type: QRType.Link,
  data: [""],
  theme: {
    containerColor: "#ffffff",
    buttonColor: "#000",
    buttonTextColor: "#ffffff",
    eyeColor: "#000",
    qrStyle: "squares",
    eyeRadius: 0,
  },
  linkNames: [""],
  status: "A",
};

const QRFormContainer = ({ qrCode, editQR }: QRFormContainerProps) => {
  const [qrData, setQRData] = useState<QRData>(initialQrData);
  const [logo, setLogo] = useState<any>(null);
  const [logoSize, setLogoSize] = useState({
    logoWidth: 30,
    logoHeight: 30,
  });
  const [countryCodeName, setCountryCodeName] = useState<string>("");
  const [generatedQRCode, setGeneratedQRCode] = useState<string>("");
  const [contrastError, setContrastError] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<any>(
    initialValidationErrors,
  );
  const { performRequest } = ApiContainer();
  const userId = loadStateFn("id");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { parent } = formPath;

  const extractCountryCode = (phoneNumber: string) => {
    for (const countryCode in countryWisePhoneValidation) {
      const regexPattern = countryWisePhoneValidation[countryCode];
      const match = phoneNumber.match(regexPattern);

      if (match) {
        return countryCode;
      }
    }
    return "";
  };

  useEffect(() => {
    if (qrCode) {
      const qrType: string = qrCode.qr_type.trim();
      const typeMapping: any = {
        Link: QRType.Link,
        Email: QRType.Email,
        PhoneNumber: QRType.PhoneNumber,
        MultiAction: QRType.MultiAction,
      };

      if (typeMapping[qrType] || qrType === "Link") {
        const initialData = {
          ...initialQrData,
          type: typeMapping[qrType],
          data:
            qrType === "MultiAction"
              ? qrCode?.data?.action.map((action: any) => action?.url)
              : [qrCode?.data?.free_text || qrCode?.data?.link],
          status: qrCode?.status,
          linkNames:
            qrType === "MultiAction"
              ? qrCode?.data?.action.map((action: any) => action?.action_name)
              : [""],
        };

        const QRCodeData =
          qrType === "MultiAction"
            ? qrCode?.data?.action?.map((action: any) => action?.url).join(",")
            : qrCode?.data?.free_text || qrCode?.data?.link;

        console.log("initialData>>>", initialData);
        setQRData(initialData);
        setGeneratedQRCode(QRCodeData);
        if (qrType === "PhoneNumber") {
          setCountryCodeName(extractCountryCode(qrCode?.data?.free_text) || "");
        }
      }
    }
  }, [qrCode]);

  const handleLogoSizeChange = (event: any) => {
    const { name, value } = event.target;
    const newValue = parseInt(value, 10);
    setLogoSize({ ...logoSize, [name]: newValue });
  };

  const handleChangeType = (event: any) => {
    const type = event.target.value as QRType;
    setQRData({
      ...qrData,
      ...initialQrData,
      type,
    });
    setGeneratedQRCode("");
    setLogo(null);
    setValidationErrors(initialValidationErrors);
    setContrastError(false);
    setLogoSize({
      logoWidth: 30,
      logoHeight: 30,
    });
  };

  const handleDataChange = (event: any, index: number) => {
    const newData = event.target.value;
    const countryCodeName = event.target?.countryCodeName;
    const updatedData = [...qrData.data];
    updatedData[index] = newData;
    const validationErrorsForLink: any = [
      ...validationErrors[QRType.MultiAction].validationErrors,
    ];
    const updatedLinkNames = [...qrData.linkNames];
    updatedLinkNames[index] = qrData.linkNames[index] || "";

    let validationError = false;
    let requiredError = false;

    switch (qrData.type) {
      case QRType.Link:
        requiredError = isFieldEmpty(newData);
        validationError = !urlValidation(newData);
        break;
      case QRType.PhoneNumber:
        requiredError = isFieldEmpty(newData);
        validationError = !validPhoneNumber(newData, countryCodeName);
        break;
      case QRType.Email:
        requiredError = isFieldEmpty(newData);
        validationError = !emailValidation(newData);
        break;
      case QRType.MultiAction:
        requiredError = qrData.data.some(isFieldEmpty);
        // validationError = !isValidMultiActionLinks(qrData.data);
        break;
      default:
        break;
    }
    validationErrorsForLink[index] = {
      requiredError: isFieldEmpty(newData),
      validationError: !urlValidation(newData),
    };

    setValidationErrors((prevErrors: any) => ({
      ...prevErrors,
      [qrData.type]: { requiredError, validationError },
      [QRType.MultiAction]: {
        validationErrors: validationErrorsForLink,
      },
    }));

    setQRData({
      ...qrData,
      data: updatedData,
      linkNames: updatedLinkNames,
    });

    dispatch({
      type: SET_FORM_DATA,
      payload: { [parent]: { ...qrData, [QRType[qrData.type]]: updatedData } },
    });

    setCountryCodeName(countryCodeName);

    if (qrData.type === QRType.MultiAction) {
      const validLinksCount: any = validationErrorsForLink?.every(
        (link: { requiredError: any; validationError: any }) =>
          !link?.requiredError && !link?.validationError,
      );

      if (validLinksCount && updatedData?.length < 2) {
        showToast("Please add at least 2 valid links");
        return;
      } else if (validLinksCount) {
        setGeneratedQRCode(updatedData.join(","));
      }
    }

    if (
      !requiredError &&
      !validationError &&
      qrData.type !== QRType.MultiAction
    ) {
      setGeneratedQRCode(updatedData.join(","));
    }
  };

  const handleLinkNameChange = (event: any, index: number) => {
    const { value } = event.target;
    const updatedLinkNames = [...qrData.linkNames];
    updatedLinkNames[index] = value;

    setQRData({
      ...qrData,
      linkNames: updatedLinkNames,
    });
  };

  const handleNameChange = (e: { target: { value: string } }) => {
    setQRData({
      ...qrData,
      data: [qrData.data[0], e.target.value],
    });
  };

  const handleAddData = () => {
    setQRData({
      ...qrData,
      data: [...qrData.data, ""],
    });
  };

  const handleThemeChange = (property: string, value: string | number) => {
    const updatedTheme = { ...qrData.theme, [property]: value };
    const contrastRatio1 = getContrastRatio(
      updatedTheme?.containerColor,
      updatedTheme?.buttonColor,
    );
    const contrastRatio2 = getContrastRatio(
      updatedTheme?.containerColor,
      updatedTheme?.eyeColor,
    );
    const contrastRatio3 = getContrastRatio(
      updatedTheme?.buttonColor,
      updatedTheme?.eyeColor,
    );

    setContrastError(
      contrastRatio1 < MIN_CONTRAST_RATIO ||
        contrastRatio2 < MIN_CONTRAST_RATIO ||
        contrastRatio3 > MIN_CONTRAST_RATIO,
    );

    setQRData({ ...qrData, theme: { ...qrData?.theme, [property]: value } });
  };

  const isFieldEmpty = (value: string | undefined) => {
    return !value || value.trim() === "";
  };

  const handleLogoUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && typeof event.target.result === "string") {
          setLogo(event.target.result);
        }
      };
      reader.readAsDataURL(file);
      e.target.value = null;
    }
  };

  const handleGenerateQR = () => {
    const { type, data } = qrData;
    const validationErrorsForLink = [
      ...validationErrors[QRType.MultiAction].validationErrors,
    ];

    let validationError = false;
    let requiredError = false;

    switch (type) {
      case QRType.Link:
        requiredError = isFieldEmpty(data[0]);
        validationError = !urlValidation(data[0]);
        break;
      case QRType.PhoneNumber:
        requiredError = isFieldEmpty(data[0]);
        validationError = !validPhoneNumber(data[0], countryCodeName);
        break;
      case QRType.Email:
        requiredError = isFieldEmpty(data[0]);
        validationError = !emailValidation(data[0]);
        break;
      case QRType.MultiAction:
        requiredError = data.some(isFieldEmpty);
        break;
      default:
        break;
    }

    if (type === QRType.MultiAction) {
      data.forEach((link, index) => {
        validationErrorsForLink[index] = {
          requiredError: isFieldEmpty(link),
          validationError: !urlValidation(link),
        };
      });
    }

    setValidationErrors((prevErrors: any) => ({
      ...prevErrors,
      [type]: {
        validationError,
        requiredError,
      },
      [QRType.MultiAction]: {
        validationErrors: validationErrorsForLink,
      },
    }));

    if (type === QRType.MultiAction) {
      const validLinksCount: any = validationErrorsForLink?.every(
        (link) => !link?.requiredError && !link?.validationError,
      );

      if (validLinksCount && data?.length < 2) {
        showToast("Please add at least 2 valid links");
        return;
      } else if (validLinksCount) {
        setGeneratedQRCode(qrData.data.join(","));
        callApi();
      }
    }

    if (!requiredError && !validationError && type !== QRType.MultiAction) {
      setGeneratedQRCode(qrData.data.join(","));
      callApi();
    }
  };

  const callApi = async () => {
    const payload: any = {
      qr_type: "",
      user_id: userId,
      data: {},
      status: qrData?.status,
    };

    switch (qrData.type) {
      case QRType.Link:
        payload.data.link = qrData.data[0];
        break;
      case QRType.PhoneNumber:
        payload.data.free_text = qrData.data[0];
        break;
      case QRType.Email:
        payload.data.free_text = qrData.data[0];
        break;
      case QRType.MultiAction:
        payload.data.action = qrData.data.map((link, index) => ({
          url: link,
          action_name: qrData.linkNames[index] || link,
        }));
        break;
      default:
        break;
    }
    payload.qr_type = QRType[qrData.type];

    const apiEndpoint = editQR
      ? `${apiEndPoints?.editQR}/${qrCode?._id}`
      : apiEndPoints?.createQRs;
    const successMessage = editQR
      ? "QR code updated successfully"
      : "QR code created successfully";

    const res: any = await performRequest({
      endPoint: apiEndpoint,
      method: editQR ? method.put : method.post,
      data: payload,
      showToastMessage: true,
      showErrorToastMessage: true,
      successToastMessage: successMessage,
      needLoader: true,
      parent: formPath.parent,
    });

    if (res.status === 200) {
      setQRData(initialQrData);
      setGeneratedQRCode("");
      setLogo(null);
      setValidationErrors(initialValidationErrors);
      setContrastError(false);
      setLogoSize({
        logoWidth: 30,
        logoHeight: 30,
      });
      if (editQR) {
        navigate("/qr-codes");
      }
    }
  };

  const handleDeleteData = (index: number) => {
    const updatedData = qrData.data?.filter((_, i) => i !== index);
    const linkNamesData = qrData.linkNames?.filter((_, i) => i !== index);
    const clonedValidationErrorsForLink: any = [
      ...validationErrors[QRType.MultiAction].validationErrors,
    ]?.filter((_, i) => i !== index);

    setQRData({
      ...qrData,
      data: updatedData,
      linkNames: linkNamesData,
    });

    setValidationErrors((prevErrors: any) => ({
      ...prevErrors,
      [QRType.MultiAction]: { validationErrors: clonedValidationErrorsForLink },
    }));

    setGeneratedQRCode(updatedData.join(","));
  };

  function getHelperText(type: QRType): string {
    switch (type) {
      case QRType.Link:
        return "enterValidURL";
      case QRType.PhoneNumber:
        return "enterValidPhoneNumber";
      case QRType.Email:
        return "enterValidEmailAddress";
      default:
        return "";
    }
  }

  const handleStatusChange = () => {
    const newStatus = qrData.status === "A" ? "D" : "A"; // Toggle between "A" and "D"
    setQRData({
      ...qrData,
      status: newStatus,
    });
  };

  return {
    qrData,
    handleChangeType,
    QRType,
    handleDataChange,
    validationErrors,
    handleDeleteData,
    handleAddData,
    getHelperText,
    handleNameChange,
    handleGenerateQR,
    generatedQRCode,
    logo,
    logoSize,
    contrastError,
    handleLogoUpload,
    handleThemeChange,
    setLogo,
    setLogoSize,
    handleLogoSizeChange,
    handleLinkNameChange,
    handleStatusChange,
  };
};

export default QRFormContainer;
