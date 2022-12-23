import React, { useState } from 'react';
import { FormControl, Stack, Select, MenuItem, SelectChangeEvent , Typography } from '@mui/material';
import useMediaQuery from 'hooks/useMediaQuery';

const SortTool = () => {
  const [age, setAge] = useState('10');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const { isTablet } = useMediaQuery();
  return (
    <Stack
        spacing={1}
        alignItems='start'
        width='auto'
    >
        <Typography color='text.secondary'>
            Filter By
        </Typography>
      <FormControl focused={false} variant="outlined" sx={{minWidth: isTablet ? '100%' :  200 }}>
        <Select
          value={age}
          onChange={handleChange}
          label="Age"
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
              border: theme => `1px solid ${(theme.palette as any).extra.card.divider}`
            },
            '.MuiOutlinedInput-notchedOutline': {
              border: 0,
            },
          }}
        >
          <MenuItem value={10}>All Network</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SortTool;
