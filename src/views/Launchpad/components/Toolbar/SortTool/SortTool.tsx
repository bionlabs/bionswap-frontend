import React from 'react';
import { FormControl, Stack, Select, MenuItem, Typography } from '@mui/material';

interface Props {
  sort: string;
  sortParams: any[];
  handleChangeSort: (event: any, value: string) => void;
}
const SortTool = ({ sort, sortParams, handleChangeSort }: Props) => {
  return (
    <Stack spacing={1} alignItems="start" width="auto">
      <Typography color="text.secondary">Sort By</Typography>
      <FormControl focused={false} variant="outlined" sx={{ minWidth: 200 }}>
        <Select
          value={sort}
          onChange={(e) => handleChangeSort(e, e.target.value)}
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
          {sortParams.map((item) => (
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
