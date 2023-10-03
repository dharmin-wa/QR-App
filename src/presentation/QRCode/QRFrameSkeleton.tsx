import { Skeleton } from "@mui/material";
import { StyledPaper } from "./style";

interface QRFrameSkeletonProps {
  numSkeletons: number;
}

const QRFrameSkeleton = ({ numSkeletons }: QRFrameSkeletonProps) => {
  const skeletons = Array.from({ length: numSkeletons }, (_, index) => (
    <Skeleton
      variant="rectangular"
      key={index}
      width="100%"
      height={132}
      sx={{ marginBottom: 2, borderRadius: 2 }}
    >
      <StyledPaper elevation={0}></StyledPaper>
    </Skeleton>
  ));

  return <>{skeletons}</>;
};

export default QRFrameSkeleton;
