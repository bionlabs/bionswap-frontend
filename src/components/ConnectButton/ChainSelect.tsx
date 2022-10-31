import React from 'react'
import {
    Box,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    styled
} from '@mui/material'
import { useChain, useSwitchNetwork } from 'hooks';
import { CHAIN_INFO_MAP } from 'configs/chain';
import { getChainIcon } from "utils/chains";
import Image from "next/image";


const ChainSelect = () => {
  const [age, setChain] = React.useState('');

  const handleChange = (event:any) => {
    setChain(event.target.value);
  };

  const { chainId, isConnected } = useChain();

  const { switchNetwork } = useSwitchNetwork({});
  return (
    <Box>
        <FormControl fullWidth>
        <StyledSelect
            variant='outlined'
            value={chainId}
            defaultValue={chainId}
            onChange={handleChange}
            sx={{
                width: '166px'
            }}
        >
            {Object.entries(CHAIN_INFO_MAP).map(([, chain]) => (
                (chain.id !== 97) &&
                <MenuItem
                    sx={{
                        p: '8.5px 24px',
                        boxShadow: 'none',
                        width: '166px',
                        '&.MuiButtonBase-root.MuiMenuItem-root.Mui-selected' : {
                            boxShadow: 'none',
                        }
                    }}
                    key={chain.id}
                    value={chain.id}
                    onClick={() => {
                    switchNetwork?.(chain?.id);
                    }}
                >
                    <Box display="flex" gap="10px" alignItems="center">
                        <Image src={getChainIcon(chain.id)?.iconUrl} layout="fixed" alt="" width={20} height={20} />
                        <Box fontSize="0.875rem" fontWeight={500}>
                            {chain.name}
                        </Box>
                    </Box>
                </MenuItem>
            ))}
            {Object.entries(CHAIN_INFO_MAP).map(([, chain]) => (
                (chain.id === 97) &&
                <MenuItem
                    sx={{
                        p: '8.5px 24px',
                        boxShadow: 'none',
                        width: '166px',
                        borderTop: '1px solid #242D35',
                        '&.MuiButtonBase-root.MuiMenuItem-root.Mui-selected' : {
                            boxShadow: 'none',
                        }
                    }}
                    key={chain.id}
                    value={chain.id}
                    onClick={() => {
                    switchNetwork?.(chain?.id);
                    }}
                >
                    <Box display="flex" gap="10px" alignItems="center">
                        <Image src={getChainIcon(chain.id)?.iconUrl} layout="fixed" alt="" width={24} height={24} />
                        <Box fontSize="0.875rem" fontWeight={500}>
                            {chain.name}
                        </Box>
                    </Box>
                </MenuItem>
            ))}
        </StyledSelect>
        </FormControl>
    </Box>
  )
}

const StyledSelect = styled(Select)`
    .MuiSelect-select {
        padding: 8.5px 24px;
        background: ${props => props.theme.palette.background.default};
    }
    fieldset {
        border: 1px solid ${prop => (prop.theme.palette as any).gray[700]}!important;
    }
    
`

export default ChainSelect