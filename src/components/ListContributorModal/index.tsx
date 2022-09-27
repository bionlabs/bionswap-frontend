import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, MenuItem, OutlinedInput, Select, styled, Typography } from "@mui/material"
import { BaseModal } from "components"
import { useCallback, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { formatEther } from "ethers/lib/utils";

export const minimizeAddressSmartContract = (str: string) => {
    if (!str) return;
    return str.substring(0, 8) + '...' + str.substring(str.length - 4, str.length);
  };

const ListContributorModal = ({ open, onDismiss, data, unit }: any) => {

    return (
        <BaseModal open={open} sx={{
            padding: '24px',
            maxWidth: '556px',
            width: '100%',
            height: 'auto',
            overflowY: 'auto',
        }}>
            <IconButton onClick={onDismiss} sx={{ position: "absolute", right: 8, top: 8 }}>
                <CloseIcon />
            </IconButton>
            <FlexBox flexDirection='column' gap='24px' mt='50px'>
                {
                    data?.map((item: any) => (
                        <FlexBox key={item[0]} justifyContent='space-between'>
                            <Typography>
                                {minimizeAddressSmartContract(item[0])}
                            </Typography>
                            <Typography>
                                {formatEther(item[1])} {unit}
                            </Typography>
                        </FlexBox>
                    ))
                }
            </FlexBox>
        </BaseModal>
    )
}

const FlexBox = styled(Box)`
    display: flex;
`

export default ListContributorModal