import React, { useState } from 'react';
import { FormControl, Stack, Select, MenuItem, SelectChangeEvent, Typography } from '@mui/material';
import useMediaQuery from 'hooks/useMediaQuery';

interface FilterProps {
  filter: string;
  filterParams: any[];
  handleChangeFilter: (event: SelectChangeEvent) => void;
}

const SortTool = ({ filter, filterParams, handleChangeFilter }: FilterProps) => {
  const { isTablet } = useMediaQuery();
  return (
    <Stack spacing={1} alignItems="start" width="auto">
      <Typography color="text.secondary">Filter By</Typography>
      <FormControl focused={false} variant="outlined" sx={{ minWidth: isTablet ? '100%' : 200 }}>
        <Select
          value={filter}
          onChange={handleChangeFilter}
          displayEmpty
          sx={{
            '.MuiInputBase-input': {
              backgroundColor: (theme) => (theme.palette as any).extra.card.background,
              fontSize: '14px',
              color: 'text.secondary',
              fontWeight: '500',
              height: 'fit-content',
              lineHeight: '1',
              display: 'flex',
              alignItems: 'center',
              border: (theme) => `1px solid ${(theme.palette as any).extra.card.divider}`,
            },
            '.MuiOutlinedInput-notchedOutline': {
              border: 0,
            },
          }}
        >
          {filterParams.map((item) => (
            <MenuItem key={item} value={item.id}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SortTool;
