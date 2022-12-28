import React, {useState} from 'react';
import { FormControl, Stack, Select, MenuItem, Typography } from '@mui/material';
import useMediaQuery from 'hooks/useMediaQuery';
import {IoFilter} from 'react-icons/io5'

interface Props {
  sort: string;
  sortParams: any[];
  handleChangeSort: (event: any, value: string) => void;
}
const SortTool = ({ sort, sortParams, handleChangeSort }: Props) => {
  const { isTablet } = useMediaQuery();
  const [focus , setFocus] = useState(false);
  
  return (
    <Stack spacing={1} alignItems="start" width="100%">
      <FormControl focused={false} variant="outlined" sx={{ minWidth: isTablet ? '100%' : 170 }}>
        <Select
          value={sort}
          onChange={(e) => handleChangeSort(e, e.target.value)}
          displayEmpty
          open={focus}
          onOpen={() => setFocus(true)}
          onClose={() => setFocus(false)}
          sx={{
            '.MuiInputBase-input': {
              padding: '14px',
              backgroundColor: (theme) => focus ? (theme.palette as any).extra.button.backgroundGreenOpacity : theme.palette.background.default,
              transition: '.12s ease-in',
              color: focus ? 'primary.main' : 'text.secondary',
              display: 'flex',
              alignItems: 'center',
              border: (theme) => focus ? `1px solid ${theme.palette.primary.main}` : `1px solid ${(theme.palette as any).extra.card.divider}`,
              '&:hover':{
                backgroundColor: theme => (theme.palette as any).extra.button.backgroundGreenOpacity,
                color: 'primary.main',
                border: theme => `1px solid ${theme.palette.primary.main}`
              }
            },
            '.MuiOutlinedInput-notchedOutline': {
              border: 0,
            },
          }}
        >
          {sortParams.map((item) => (
            <MenuItem key={item} value={item.id} sx={{color: 'text.secondary'}}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SortTool;
