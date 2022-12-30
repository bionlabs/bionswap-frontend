import React from 'react';
import { Box, Stack, styled } from '@mui/material';
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
  handleChangeFilter: (event: any, value: string) => void;
  sort: string;
  sortParams: any[];
  handleChangeSort: (event: any, value: string) => void;
}

const Toolbar = ({
  view,
  handleChangeView,
  searchKeyword,
  filter,
  filterParams,
  handleChangeFilter,
  sort,
  sortParams,
  handleChangeSort,
}: ToolbarProps) => {
  const { isTablet } = useMediaQuery();

  return (
    <Stack width='100%' spacing={3}>
      <Search searchKeyword={searchKeyword} />
      <Stack direction={isTablet ? 'column' : 'row'} width="100%" justifyContent="start" gap="15px" alignItems={isTablet ? 'start' : "end"}>
        <Stack direction={isTablet ? 'column' : "row"} width="100%" justifyContent="start" gap="15px" alignItems={isTablet ? 'start' :"end"}>
          <ToggleView view={view} handleChangeView={handleChangeView} />
        </Stack>
        <DropdownBox
          direction="row"
          width={isTablet ? '100%' : 'auto'}
        >
          <FilterTool filter={filter} filterParams={filterParams} handleChangeFilter={handleChangeFilter} />
          <SortTool sort={sort} sortParams={sortParams} handleChangeSort={handleChangeSort} />
        </DropdownBox>
      </Stack>
    </Stack>
  );
};

const DropdownBox = styled(Stack)`
  justify-content: start;
  align-items: end;
  gap: 15px;
`

export default Toolbar;
