import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, styled, Stack, Typography, IconButton, ToggleButtonGroup, ToggleButton, SelectChangeEvent } from '@mui/material';
import { IoList, IoGrid } from 'react-icons/io5';
import ToggleView from './ToggleView/ToggleView';
import SortTool from './SortTool/SortTool';
import Search from '../Search/Search';
import FilterTool from './FilterTool/FilterTool';
import useMediaQuery from 'hooks/useMediaQuery';

interface ToolbarProps {
  view: string | null;
  handleChangeView: (event: React.MouseEvent<HTMLElement>, newView: string | null) => void;
  searchKeyword: (event: any) => void;
  filter: string;
  filterParams: any[];
  handleChangeFilter: (event: SelectChangeEvent) => void;
}

const Toolbar = ({ view, handleChangeView, searchKeyword, filter, filterParams , handleChangeFilter }: ToolbarProps) => {
  const { isTablet } = useMediaQuery();

  return (
    <Stack direction={isTablet ? 'column' : 'row'} width="100%" justifyContent="start" gap='20px' alignItems="end">
      <Stack direction="row" width="100%" justifyContent="start" gap='20px' alignItems="end" order={isTablet ? 2 : 1}>
        <ToggleView view={view} handleChangeView={handleChangeView} />
        <Search searchKeyword={searchKeyword} />
      </Stack>
      <Stack direction="row" justifyContent="start" gap='20px' alignItems="end" width={isTablet ? '100%' : 'auto'} order={isTablet ? 1 : 2}>
        <FilterTool filter={filter} filterParams={filterParams} handleChangeFilter={handleChangeFilter} />
        <SortTool />
      </Stack>
    </Stack>
  );
};

export default Toolbar;
