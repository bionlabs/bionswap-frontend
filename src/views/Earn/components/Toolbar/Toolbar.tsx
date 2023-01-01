import React from 'react';
import { styled, ToggleButton } from '@mui/material';
import ToggleView from './ToggleView/ToggleView';

interface ToolbarProps {
  view: string | null;
  handleChangeView: (event: React.MouseEvent<HTMLElement>, newView: string | null) => void;
}

const Toolbar = ({ view, handleChangeView }: ToolbarProps) => {
  return (
    <div>
      <ToggleView view={view} handleChangeView={handleChangeView} />
    </div>
  );
};

export default Toolbar;
