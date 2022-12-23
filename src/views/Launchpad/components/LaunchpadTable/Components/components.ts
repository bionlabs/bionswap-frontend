import { styled, TableCell, tableCellClasses, TableRow, Typography } from '@mui/material';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: (theme.palette as any).extra.table.light,
    color: theme.palette.text.secondary,
    '&:first-child, &:first-child': {
      borderTopLeftRadius: '3px',
    },
    '&:last-child, &:last-child': {
      borderTopRightRadius: '3px',
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 600
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