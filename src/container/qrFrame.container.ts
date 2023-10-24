/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { apiEndPoints, method } from "../utils/constant";
import { ApiContainer } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { SET_API_DATA } from "../redux/constants";
import { useNavigate } from "react-router-dom";

interface QrFrameContainerProps {
  formPath: any;
  responseSelector?: boolean;
  getCountListQrCode?: () => void;
}

const QrFrameContainer = ({
  formPath,
  responseSelector = false,
  getCountListQrCode,
}: QrFrameContainerProps) => {
  const [anchorEls, setAnchorEls] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteQRId, setDeleteQRId] = useState<string>("");

  const [sizeMenuAnchor, setSizeMenuAnchor] = useState<any[]>([]);

  const handleOpenSizeMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const newSizeMenuAnchor: any[] = [...sizeMenuAnchor];
    newSizeMenuAnchor[index] = event.currentTarget;
    setSizeMenuAnchor(newSizeMenuAnchor);
  };

  const handleCloseSizeMenu = (index: number) => {
    const newSizeMenuAnchor: any[] = [...sizeMenuAnchor];
    newSizeMenuAnchor[index] = null;
    setSizeMenuAnchor(newSizeMenuAnchor);
  };

  const { performRequest } = ApiContainer();

  const loadingStatus = useSelector(
    (state: any) => state.api?.loader?.[formPath?.child],
  );

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

  const downloadQRCode = (size: any, id: string, index: number) => {
    const qrCanvas: any = document.getElementById(`${id}_${index}`);
    if (qrCanvas) {
      const img = new Image();
      img.crossOrigin = "*";
      img.src = qrCanvas.toDataURL("image/png");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size.width;
        canvas.height = size.height;

        const ctx: any = canvas.getContext("2d");
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, size.width, size.height);

        const pngUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `QR_${size.width}x${size.height}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        handleCloseSizeMenu(index);
      };
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
      showErrorToastMessage: true,
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
      if (getCountListQrCode) {
        getCountListQrCode();
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
    handleOpenSizeMenu,
    handleCloseSizeMenu,
    sizeMenuAnchor,
  };
};

export default QrFrameContainer;
