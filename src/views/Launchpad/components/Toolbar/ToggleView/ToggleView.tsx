import React from 'react';
import { ToggleButtonGroup, styled, ToggleButton } from '@mui/material';
import { IoList, IoGrid } from 'react-icons/io5';

interface ViewProps {
  view: string | null;
  handleChangeView: (event: React.MouseEvent<HTMLElement>, newView: string | null) => void;
}

const ToggleView = ({ view, handleChangeView }: ViewProps) => {
  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={handleChangeView}
      color='primary'
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        // '.MuiButtonBase-root.MuiToggleButton-root.Mui-selected': {
        //   backgroundColor: (theme) => (theme.palette as any).extra.button.backgroundGreenOpacity,
        //   color: theme => theme.palette.primary.main
        // },
      }}
    >
      <StyledIconButton value="card" aria-label="card">
        <IoGrid />
      </StyledIconButton>
      <StyledIconButton value="table" aria-label="table">
        <IoList />
      </StyledIconButton>
    </ToggleButtonGroup>
  );
};

const StyledIconButton = styled(ToggleButton)`
  padding: 16.5px 18px;
  svg {
    width: 20px;
    height: 20px;
  }
`;

export default ToggleView;
