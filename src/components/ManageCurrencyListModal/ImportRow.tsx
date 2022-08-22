import { Token } from "@bionswap/core-sdk";
import { Button, Stack, styled, Typography } from "@mui/material";
import { CurrencyLogo } from "components";

type Props = {
  token: Token;
  onClick(x: any): void;
};

const ImportRow = ({ token, onClick }: Props) => {
  console.log('token==>', token);
  return (
    // <Stack
    //   direction="row"
    //   justifyContent="space-between"
    //   width="100%"
    //   sx={{ p: 1}}
    // >
    //   <Stack direction="row" gap={1}>
    //     <CurrencyLogo currency={token} size={26} />
    //     <Stack alignItems="start">
    //       <Stack direction="row" gap={1}>
    //         <Typography>{token.symbol}</Typography>
    //         <Stack sx={{ bgcolor: "secondary.main", borderRadius: 8, px: 1 }}>
    //           <Typography variant="caption">Unknown source</Typography>
    //         </Stack>
    //       </Stack>
    //       <Typography>{token.name}</Typography>
    //     </Stack>
    //   </Stack>
    //   <Button onClick={onClick}>
    //     <Typography>Import</Typography>
    //   </Button>
    // </Stack>
    <Stack direction="row" justifyContent="space-between" width="100%" sx={{ p: '16px'}}>
      <Stack direction="row">
        <CurrencyLogo currency={token} size='26px' />
        <Stack sx={{ ml: '10px', alignItems: "flex-start" }}>
          <Stack direction="row" gap='4px'>
            <Typography variant="body4Poppins" color='text.primary' fontWeight='500'>
              {token.symbol}
            </Typography>
            <Typography variant="body6Poppins" color='#9A6AFF' fontWeight='500'>
              {token.name}
            </Typography>
          </Stack>
          <Typography variant="body4Poppins" color='#717D8A' fontWeight='400'>
            Unknown Source
          </Typography>
        </Stack>
      </Stack>
      <ImponrtBtn onClick={onClick}>
        <Typography variant="body4Poppins" color="text.secondary" fontWeight={600}>
          Import
        </Typography>
      </ImponrtBtn>
    </Stack>
  );
};

const ImponrtBtn = styled(Button)`
background: #07E0E0;
border-radius: 4px;
max-width: 90px;
width: 100%;
padding: 2px;
`

export default ImportRow;
