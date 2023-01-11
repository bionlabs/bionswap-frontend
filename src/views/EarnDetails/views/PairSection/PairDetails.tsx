import React from 'react';
import {
  Box,
  styled,
  Typography,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import Card from 'views/EarnDetails/components/Card/Card';
import useMediaQuery from 'hooks/useMediaQuery';
import { CurrencyLogo } from 'components';
import { useTokenWithChainId } from 'hooks';

const PairDetails = ({ data }: any) => {
  const details = [
    {
      name: 'Liquidity',
      value: data.totalSupply,
    },
    {
      name: 'Volumn (24h)',
      value: 0,
    },
    {
      name: 'Fees (24h)',
      value: 0,
    },
    {
      name: 'Transaction (24h)',
      value: 0,
    },
  ];
  const { isTablet } = useMediaQuery();
  const token = useTokenWithChainId(data.stakingToken, data.chainId);

  const poolComposition = [
    {
      name: data.token.symbol,
      address: data.stakingToken,
      amount: 0,
      value: 0,
    },
  ];

  const rewardsComposition = [
    {
      name: data.rewardToken.symbol,
      address: data.rewardToken,
      amount: 0,
      value: 0,
    },
  ];

  return (
    <Stack alignItems="start" gap="40px" width="100%">
      <GridLayout
        sx={{
          gridTemplateColumns: isTablet ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
        }}
      >
        {details.map((item) => (
          <Card key={item.name}>
            <Stack alignItems="start">
              <Typography fontSize={12} color="text.secondary">
                {item.name}
              </Typography>
              <Typography fontWeight={600}>${item.value}</Typography>
            </Stack>
          </Card>
        ))}
      </GridLayout>
      <Stack alignItems="start" gap="20px" width="100%">
        <Typography fontSize={18} fontWeight={600}>
          Pool Composition
        </Typography>
        <StyledTableWrapper>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <StyledTableRow>
                  <TableCell>
                    <Typography fontSize={14} color="text.secondary">
                      Token
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography fontSize={14} color="text.secondary">
                      Amount
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography fontSize={14} color="text.secondary">
                      Value
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {poolComposition.map((row) => (
                  <StyledTableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Stack direction="row" spacing={1} justifyContent="start">
                        <CurrencyLogo currency={row.address} size="30px" />
                        <Typography fontWeight={500}>{row.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Typography fontWeight={500}>{row.amount}</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography fontWeight={500}>{row.value}</Typography>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledTableWrapper>
      </Stack>

      <Stack alignItems="start" gap="20px" width="100%">
        <Typography fontSize={18} fontWeight={600}>
          Rewards
        </Typography>
        <StyledTableWrapper>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <StyledTableRow>
                  <TableCell>
                    <Typography fontSize={14} color="text.secondary">
                      Token
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography fontSize={14} color="text.secondary">
                      Amount
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography fontSize={14} color="text.secondary">
                      Value
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {rewardsComposition.map((row) => (
                  <StyledTableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Stack direction="row" spacing={1} justifyContent="start">
                        <CurrencyLogo currency={row.address} size="30px" />
                        <Typography fontWeight={500}>{row.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Typography fontWeight={500}>{row.amount}</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography fontWeight={500}>{row.value}</Typography>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledTableWrapper>
      </Stack>
    </Stack>
  );
};

const GridLayout = styled(Box)`
  display: grid;
  width: 100%;
  gap: 20px;
`;
const StyledTableWrapper = styled(Paper)`
  width: 100%;
  background-color: ${(props) => (props.theme.palette as any).extra.table.background};
  background-image: none;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.theme.palette as any).extra.table.divider};
  box-shadow: none;
`;

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  'td, th': {
    borderBottom: `0.5px solid ${(theme.palette as any).extra.table.divider}`,
  },
}));

export default PairDetails;
