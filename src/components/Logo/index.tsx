import { Box } from "@mui/material";
import Image from "next/image";
import { FC, useCallback, useState } from "react";

export const UNKNOWN_ICON =
  "https://raw.githubusercontent.com/sushiswap/icons/master/token/unknown.png";

const BAD_SRCS: { [tokenAddress: string]: true } = {};

interface LogoProps {
  srcs: string[];
  width: string | number;
  height: string | number;
  alt?: string;
}

/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
const Logo: FC<LogoProps> = ({ srcs, width, height, alt = "" }) => {
  const [, refresh] = useState<number>(0);
  const src = srcs.find((src) => !BAD_SRCS[src]);
  const onErrorCapture = useCallback(() => {
    if (src) BAD_SRCS[src] = true;
    refresh((i) => i + 1);
  }, [src]);
  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Image
        src={src || UNKNOWN_ICON}
        onErrorCapture={onErrorCapture}
        width={width}
        height={height}
        style={{ borderRadius: "50%" }}
        alt={alt}
        layout="fixed"
      />
    </Box>
  );
};

export default Logo;
