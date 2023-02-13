import {
    styled,
    Paper,
    TableCell,
    TableRow,
    tableCellClasses
} from '@mui/material'

export const StyledTableWrapper = styled(Paper)`
  width: 100%;
  background-color: ${(props) => (props.theme.palette as any).extra.table.background};
  background-image: none;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.theme.palette as any).extra.table.divider};
  box-shadow: ${(props) => (props.theme.palette as any).extra.table.boxShadow};
  .MuiTablePagination-root {
    background-color: ${(props) => (props.theme.palette as any).extra.table.background};
    :last-child {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
  .MuiTableBody-root .MuiTableRow-root {
    :hover {
      background-color: ${(props) => (props.theme.palette as any).extra.button.lighter};
      opacity: 0.8;
    }
  }
`;

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: (theme.palette as any).extra.table.light,
      color: theme.palette.text.secondary,
      '&:first-child, &:first-child': {
        borderTopLeftRadius: '8px',
      },
      '&:last-child, &:last-child': {
        borderTopRightRadius: '8px',
      },
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      // backgroundColor: (theme.palette as any).extra.card.light,
      border: 0
    },
    'td, th': {
      // border: 0,
      borderBottom: `0.5px solid ${(theme.palette as any).extra.table.divider}`,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      // border: 0,
      // borderColor: (theme.palette as any).extra.card.divider
    },
  }));