import SettingsIcon from "@mui/icons-material/Settings";
import { Box, IconButton, OutlinedInput, Popover, Stack, Typography } from "@mui/material";
import { Switch } from "components";
import PrimaryButton from "components/PrimaryButton";
import { DEFAULT_DEADLINE_FROM_NOW } from "constants/common";
import React, { useEffect, useMemo, useState } from "react";
import { SlippageError, useExpertModeManager, useUserSlippageTolerance, useUserTransactionTTL } from "state/user/hooks";
import { V2_SWAP_DEFAULT_SLIPPAGE } from "state/user/reducer";

type Props = {};

const TransactionSettings = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const [userSlippageTolerance, setUserSlippageTolerance, slippageError] = useUserSlippageTolerance();
  const slippageIsDefault = useMemo(() => {
    return userSlippageTolerance.equalTo(V2_SWAP_DEFAULT_SLIPPAGE);
  }, [userSlippageTolerance]);
  const [ttl, setTtl] = useUserTransactionTTL();
  const [slippageInput, setSlippageInput] = useState(userSlippageTolerance.toFixed(2));
  const [deadlineInput, setDeadlineInput] = useState(Math.ceil(ttl / 60).toString());

  const [expertMode, toggleExpertMode] = useExpertModeManager();

  useEffect(() => {
    setSlippageInput(userSlippageTolerance.toFixed(2));
  }, [userSlippageTolerance]);

  useEffect(() => {
    setDeadlineInput(Math.ceil(ttl / 60).toString());
  }, [ttl]);

  return (
    <>
      <IconButton onClick={handleClick}>
        <SettingsIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Stack width={380} px="15px" py="25px" borderRadius="8px" gap={1} sx={{
            // backgroundColor: theme => (theme.palette as any).extra.card.background
            border: theme => `1px solid ${(theme.palette as any).extra.card.divider}`,
            borderRadius: '12px'
        }}>
          <Stack width="100%" alignItems="start" borderRadius="8px"
            sx={{ 
              border: theme => `1px solid ${(theme.palette as any).extra.card.divider}`,
              p: 1.5
            }}
          >
            <Typography variant="body3Poppins">Transaction Settings</Typography>

            <Stack alignItems="start" width="100%" gap={1} mt={1}>
              <Typography variant="body3Poppins" color="gray.400">
                Slippage Tolerance ?
              </Typography>
              <Stack direction="row" gap={1} width="100%">
                <PrimaryButton
                  label="Auto"
                  labelSx={{ fontWeight: 500 }}
                  variant={slippageIsDefault ? "contained" : "outlined"}
                  sx={{ px: "20px", py: "5px", width: "auto", borderRadius: "8px" }}
                  onClick={() => setUserSlippageTolerance(V2_SWAP_DEFAULT_SLIPPAGE.toFixed(2))}
                />
                <OutlinedInput
                  type="number"
                  value={slippageInput}
                  onChange={(e) => setSlippageInput(e.target.value)}
                  onBlur={() =>
                    slippageError === SlippageError.INVALID_INPUT &&
                    Number(slippageInput) === Number(userSlippageTolerance.toFixed(2))
                      ? setUserSlippageTolerance(V2_SWAP_DEFAULT_SLIPPAGE.toFixed(2))
                      : setUserSlippageTolerance(slippageInput)
                  }
                  fullWidth
                  endAdornment="%"
                  sx={{
                    "& .MuiInputBase-input": {
                      py: "9px",
                    },
                    height: "100%",
                    bgcolor: theme => (theme.palette as any).extra.card.light,
                    borderRadius: "8px",
                  }}
                  inputProps={{
                    style: { textAlign: "right", paddingRight: "4px" },
                  }}
                />
              </Stack>
            </Stack>
            <Stack alignItems="start" width="100%" gap={1} mt={1}>
              <Typography variant="body3Poppins" color="gray.400">
                Transaction deadline ?
              </Typography>
              <Stack direction="row" gap={1} width="100%" justifyContent="start">
                <OutlinedInput
                  type="number"
                  value={deadlineInput}
                  onChange={(e) => setDeadlineInput(e.target.value)}
                  onBlur={() => {
                    if (deadlineInput === "") {
                      setTtl(DEFAULT_DEADLINE_FROM_NOW);
                      return;
                    } else if (Number(deadlineInput) <= 1) {
                      setDeadlineInput("1");
                    }
                    if (Number(deadlineInput) === 0) setTtl(1 * 60);
                    else setTtl(Math.ceil(Number(deadlineInput)) * 60);
                  }}
                  sx={{
                    "& .MuiInputBase-input": {
                      py: "9px",
                    },
                    height: "100%",
                    bgcolor: theme => (theme.palette as any).extra.card.light,
                    borderRadius: "8px",
                    width: "30%",
                  }}
                  inputProps={{
                    style: { textAlign: "right", paddingRight: "4px" },
                  }}
                />
                <Typography color="gray.400" fontWeight={600}>
                  minutes
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack width="100%" alignItems="start" borderRadius="8px"
            sx={{ 
              border: theme => `1px solid ${(theme.palette as any).extra.card.divider}`,
              p: 1.5
            }}
          >
            <Typography variant="body3Poppins">Interface Settings</Typography>

            <Stack width="100%">
              <Stack direction="row" justifyContent="space-between" mt={1} width="100%">
                <Typography variant="body3Poppins" color="gray.400">
                  Expert Mode ?
                </Typography>
                <Switch checked={expertMode} onChange={() => toggleExpertMode()} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Popover>
    </>
  );
};

export default TransactionSettings;
