import { LoadingButton } from "@mui/lab";
import { Button, ButtonProps, Typography, TypographyProps } from "@mui/material";
import React from "react";

interface PrimaryButtonProps extends ButtonProps {
  children: any;
  label?: string;
  backgroundColor?: string;
  labelVariant?: TypographyProps["variant"];
  labelSx?: React.CSSProperties;
  isLoading?: boolean;
}

const PrimaryLoadingButton: React.FC<PrimaryButtonProps> = ({
  children,
  label,
  color = "text.secondary",
  backgroundColor = "primary.main",
  variant = "contained",
  labelVariant,
  sx,
  labelSx,
  isLoading = false,
  ...rest
}) => {
  return (
    <LoadingButton
      variant={variant}
      loading={isLoading}
      sx={{
        backgroundColor: variant === "outlined" ? "transparent" : backgroundColor,
        border: variant === "outlined" ? "1px solid #07E0E0" : "none",
        padding: "8px 20px",
        width: "100%",
        transition: "all .3s ease",
        cursor: "pointer",
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: variant === "outlined" ? "transparent" : backgroundColor,
          opacity: 0.9,
        },
        ...sx,
      }}
      {...rest}
    >
      {isLoading ? null : children}
    </LoadingButton>
  );
};

export default PrimaryLoadingButton;