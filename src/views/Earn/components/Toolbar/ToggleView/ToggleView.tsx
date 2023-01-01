import React from 'react';
import { styled, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { IoList, IoGrid } from 'react-icons/io5';

interface ViewProps {
  view: string | null;
  handleChangeView: (event: React.MouseEvent<HTMLElement>, newView: string | null) => void;
}

const ToggleView = ({ view, handleChangeView }: ViewProps) => {
  return (
    <Wrapper>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleChangeView}
        sx={{
          // backgroundColor: (theme) => (theme.palette as any).extra.darkest.main,
          '.MuiButtonBase-root.MuiToggleButton-root.Mui-selected': {
            backgroundColor: (theme) => (theme.palette as any).extra.toggle.selected,
            // color: theme => theme.palette.primary.main
          },
          '& .MuiToggleButtonGroup-grouped': {
            margin: (theme) => theme.spacing(0.5),
            border: 0,
            '&.Mui-disabled': {
              border: 0,
            },
            '&:not(:first-of-type)': {
              borderRadius: '6px',
            },
            '&:first-of-type': {
              borderRadius: '6px',
            },
          },
        }}
      >
        <ToggleButton value="card" aria-label="card">
          <IoGrid />
        </ToggleButton>
        <ToggleButton value="table" aria-label="table">
          <IoList />
        </ToggleButton>
      </ToggleButtonGroup>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  background-color: ${(props) => (props.theme.palette as any).extra.toggle.background};
  display: flex;
  border-radius: 8px;
  padding: 1px;
`;

export default ToggleView;
