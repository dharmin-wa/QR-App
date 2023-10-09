import { useState, useEffect } from "react";
import { apiEndPoints, method } from "../utils/constant";
import { ApiContainer } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { SET_API_DATA } from "../redux/constants";
import { useNavigate } from "react-router-dom";

interface QrFrameContainerProps {
  formPath: any;
  responseSelector?: boolean;
}

const QrFrameContainer = ({
  formPath,
  responseSelector = false,
}: QrFrameContainerProps) => {
  const [qrCodeSize, setQRCodeSize] = useState<number>(130);
  const [anchorEls, setAnchorEls] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteQRId, setDeleteQRId] = useState<string>("");
  const { performRequest } = ApiContainer();

  const loadingStatus = useSelector(
    (state: any) => state.api?.loader?.[formPath?.child],
  );

  useEffect(() => {
    window.addEventListener("resize", updateQRCodeSize);
    updateQRCodeSize();

    return () => {
      window.removeEventListener("resize", updateQRCodeSize);
    };
  }, []);

  const open = Boolean(anchorEls);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const newAnchorEls: any[] = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleClose = (index: number) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  const updateQRCodeSize = () => {
    const screenWidth = window.innerWidth;
    let newSize;

    if (screenWidth < 1201) {
      newSize = 130;
    } /* else if (screenWidth > 1199 && screenWidth < 1315) {
        newSize = 80;
      } */ /* else if (screenWidth < 1315) {
        newSize = 130;
      } */ else if (screenWidth < 1330) {
      newSize = 100;
    } else {
      newSize = 130;
    }
    setQRCodeSize(newSize);
  };

  const downloadQRCode = () => {
    const canvas: any = document.getElementById("QR");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `QR.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const handleOpenDeleteQRDialog = (id: string) => {
    setDeleteQRId(id);
    setOpenDialog(true);
  };

  const handleDeleteQRCode = async () => {
    const res: any = await performRequest({
      endPoint: `${apiEndPoints?.deleteQR}/${deleteQRId}`,
      method: method.delete,
      showToastMessage: true,
      successToastMessage: "Successfully Deleted",
      needLoader: true,
      parent: formPath.child,
    });

    if (res.status === 200) {
      handleCloseDeleteQRDialog();
      setAnchorEls([]);
      const res: any = await performRequest({
        endPoint: apiEndPoints?.getAllQRs,
        method: method?.get,
        needLoader: true,
        parent: formPath?.parent,
        responseSelector,
      });
      if (res.status === 200) {
        dispatch({
          type: SET_API_DATA,
          payload: { [formPath?.parent]: { data: res?.data } },
        });
      }
    }
  };

  const handleEditQRCode = (id: string) => {
    navigate(`/edit-qr-code/${id}`);
  };

  const handleCloseDeleteQRDialog = () => {
    setOpenDialog(false);
    setDeleteQRId("");
    setAnchorEls([]);
  };

  const handleViewQRCode = (id: string) => {
    navigate(`/qr-codes/${id}`);
  };

  return {
    qrCodeSize,
    downloadQRCode,
    open,
    handleClick,
    handleClose,
    anchorEls,
    handleDeleteQRCode,
    handleOpenDeleteQRDialog,
    openDialog,
    handleCloseDeleteQRDialog,
    loadingStatus,
    handleViewQRCode,
    handleEditQRCode,
  };
};

export default QrFrameContainer;
