import { Token } from "@bionswap/core-sdk";
import { Button, Stack, Typography } from "@mui/material";
import { CurrencyLogo } from "components";

type Props = {
  token: Token;
  onClick(x: any): void;
};

const ImportRow = ({ token, onClick }: Props) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      width="100%"
      sx={{ border: "1px solid rgba(32,34,49,.6)", p: 1, borderRadius: 2 }}
    >
      <Stack direction="row" gap={1}>
        <CurrencyLogo currency={token} size={48} />
        <Stack alignItems="start">
          <Stack direction="row" gap={1}>
            <Typography>{token.symbol}</Typography>
            <Stack sx={{ bgcolor: "secondary.main", borderRadius: 8, px: 1 }}>
              <Typography variant="caption">Unknown source</Typography>
            </Stack>
          </Stack>
          <Typography>{token.name}</Typography>
        </Stack>
      </Stack>
      <Button onClick={onClick}>
        <Typography>Import</Typography>
      </Button>
    </Stack>
  );
};

export default ImportRow;
