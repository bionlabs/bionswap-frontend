import { Token } from "@bionswap/core-sdk";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, IconButton, Link, Stack, Typography } from "@mui/material";
import CurrencyLogo from "components/CurrencyLogo";
import { useChain } from "hooks";
import { useAddUserToken } from "state/user/hooks";
import { getExplorerLink } from "utils/explorer";
import { shortenAddress } from "utils/format";
import { ManageCurrencyListModalView, useManageCurrencyListModalContext } from ".";

type Props = { tokens: Token[]; onBack?: () => void };

const ImportToken = ({ tokens, onBack }: Props) => {
  const { chainId } = useChain();
  // const router = useRouter();
  // const queryChainId = Number(router.query.chainId);
  const { onSelect, importToken, setView } = useManageCurrencyListModalContext();
  const addToken = useAddUserToken();
  // const importList = importToken instanceof WrappedTokenInfo ? importToken.list : undefined;

  return (
    <Stack gap={1}>
      <Stack direction="row" justifyContent="start" width="100%" gap={1}>
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography>Import token</Typography>
      </Stack>
      <Stack width="100%" gap={2}>
        <Typography>
          This token does not appear on the active token list(s). Make sure this is the token that you want to trade.
        </Typography>
        <Stack>
          {tokens.map((token) => (
            <Stack key={token.address} direction="row" gap={1}>
              <CurrencyLogo currency={token} size={48} />
              <Stack alignItems="start">
                <Stack direction="row" gap={1}>
                  <Typography>{token.symbol}</Typography>
                  <Stack sx={{ bgcolor: "secondary.main", borderRadius: 8, px: 1 }}>
                    <Typography variant="caption">Unknown source</Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" gap={1}>
                  <Typography>{token.name}</Typography>
                  <Link
                    href={getExplorerLink(chainId, token.address, "address")}
                    underline="none"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Typography color="primary">{shortenAddress(token.address)}</Typography>
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            tokens.map((token) => addToken(token));
            onSelect && onSelect(tokens[0]);
            setView(ManageCurrencyListModalView.search);
          }}
        >
          <Typography color="primary.dark">Import</Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

export default ImportToken;
