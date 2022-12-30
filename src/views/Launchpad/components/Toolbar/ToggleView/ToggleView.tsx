import React from 'react';
import { ToggleButtonGroup, styled, ToggleButton, Box } from '@mui/material';
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
            backgroundColor: (theme) => (theme.palette as any).extra.card.background,
            // color: theme => theme.palette.primary.main
          },
          '& .MuiToggleButtonGroup-grouped':{
            margin: theme => theme.spacing(0.5),
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
          }
        }}
      >
        <StyledIconButton value="card" aria-label="card">
          <IoGrid />
        </StyledIconButton>
        <StyledIconButton value="table" aria-label="table">
          <IoList />
        </StyledIconButton>
      </ToggleButtonGroup>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  background-color: ${props => (props.theme.palette as any).extra.darkest.main};
  display: flex;
  border-radius: 8px;
  padding: 1px;
`

const StyledIconButton = styled(ToggleButton)`
  // padding: 16.5px 18px;
  // svg {
  //   width: 20px;
  //   height: 20px;
  // }
`;

export default ToggleView;
