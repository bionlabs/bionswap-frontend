import React, {useState} from 'react';
import { FormControl, Stack, Select, MenuItem, Typography } from '@mui/material';
import useMediaQuery from 'hooks/useMediaQuery';

interface FilterProps {
  filter: string;
  filterParams: any[];
  handleChangeFilter: (event: any, value: string) => void;
}

const SortTool = ({ filter, filterParams, handleChangeFilter }: FilterProps) => {
  const { isTablet } = useMediaQuery();
  const [focus , setFocus] = useState(false);

  return (
    <Stack spacing={1} alignItems="start" width="100%">
      {
        !isTablet && <Typography color="text.secondary">Filter By</Typography>
      }
      <FormControl focused={false} variant="outlined" sx={{ minWidth: isTablet ? '100%' : 180 }}>
        <Select
          value={filter}
          onChange={(e) => handleChangeFilter(e, e.target.value)}
          displayEmpty
          open={focus}
          onOpen={() => setFocus(true)}
          onClose={() => setFocus(false)}
          sx={{
            '.MuiInputBase-input': {
              backgroundColor: (theme) => focus ? (theme.palette as any).extra.card.hover : (theme.palette as any).extra.card.background,
              fontSize: '14px',
              color: 'text.secondary',
              height: 'fit-content',
              lineHeight: '1',
              display: 'flex',
              alignItems: 'center',
              border: (theme) => `1px solid ${(theme.palette as any).extra.card.divider}`,
              '&:hover':{
                backgroundColor: theme => (theme.palette as any).extra.card.hover
              }
            },
            '.MuiOutlinedInput-notchedOutline': {
              border: 0,
            },
          }}
        >
          {filterParams.map((item) => (
            <MenuItem key={item} value={item.id} sx={{fontSize: '14px', color: 'text.secondary'}}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SortTool;
