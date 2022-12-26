import React, { useState } from 'react';
import { Box, FormControl, MenuItem, Select, Stack, styled, Typography } from '@mui/material';
import { useChain, useSwitchNetwork } from 'hooks';
import { CHAIN_INFO_MAP } from 'configs/chain';
import { getChainIcon } from 'utils/chains';
import Image from 'next/image';
import { HiChevronUpDown } from 'react-icons/hi2';
import useMediaQuery from 'hooks/useMediaQuery';

const ChainSelect = () => {
  const [chain, setChain] = React.useState('');
  const { isMobile } = useMediaQuery();
  const [focus, setFocus] = useState(false);

  const handleChange = (event: any) => {
    setChain(event.target.value);
  };

  const { chainId } = useChain();

  const { switchNetwork } = useSwitchNetwork({});
  return (
    <Box>
      <FormControl fullWidth>
        <StyledSelect
          variant="outlined"
          value={chainId}
          onChange={handleChange}
          IconComponent={HiChevronUpDown}
          open={focus}
          onClose={() => setFocus(false)}
          onOpen={() => setFocus(true)}
          sx={{
            backgroundColor: theme => focus ? (theme.palette as any).extra.card.hover : 'transparent'
          }}
          
        >
          {Object.entries(CHAIN_INFO_MAP).map(
            ([, chain]) =>
              chain.id !== 97 && (
                <MenuItem
                  sx={{
                    p: '8px 20px',
                    boxShadow: 'none',
                    color: 'text.secondary',
                    '&.MuiButtonBase-root.MuiMenuItem-root.Mui-selected': {
                      boxShadow: 'none',
                    },
                  }}
                  key={chain.id}
                  value={chain.id}
                  onClick={() => {
                    switchNetwork?.(chain?.id);
                  }}
                >
                  <Stack direction="row" spacing={1}>
                    <Stack>
                      <Image src={getChainIcon(chain.id)?.iconUrl} layout="fixed" alt="" width={18} height={18} />
                    </Stack>
                    <Typography fontSize="14px" color="inherit">
                      {chain.name}
                    </Typography>
                  </Stack>
                </MenuItem>
              ),
          )}
          {Object.entries(CHAIN_INFO_MAP).map(
            ([, chain]) =>
              chain.id === 97 && (
                <MenuItem
                  sx={{
                    p: '8px 20px',
                    boxShadow: 'none',
                    color: 'text.secondary',
                    borderTop: (theme) => `1px solid ${(theme.palette as any).extra.card.divider}`,
                    '&.MuiButtonBase-root.MuiMenuItem-root.Mui-selected': {
                      boxShadow: 'none',
                    },
                  }}
                  key={chain.id}
                  value={chain.id}
                  onClick={() => {
                    switchNetwork?.(chain?.id);
                  }}
                >
                  <Stack direction="row" spacing={1}>
                    <Stack>
                      <Image src={getChainIcon(chain.id)?.iconUrl} layout="fixed" alt="" width={18} height={18} />
                    </Stack>
                    <Typography fontSize="14px" color="inherit">
                      {chain.name}
                    </Typography>
                  </Stack>
                </MenuItem>
              ),
          )}
        </StyledSelect>
      </FormControl>
    </Box>
  );
};

const StyledSelect = styled(Select)`
  .MuiSelect-select {
    padding: 8px 20px;
    transition: 0.12s ease-in;
    border: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};
    :hover {
      background-color: ${(props) => (props.theme.palette as any).extra.card.hover};
    }
  }
  fieldset {
    border: none;
  }
`;

export default ChainSelect;
