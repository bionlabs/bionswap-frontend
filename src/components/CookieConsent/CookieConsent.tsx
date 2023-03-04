import React, { useState } from 'react';
import {
  Box,
  styled,
  Typography,
  Stack,
  Button,
  Divider,
  IconButton,
  Accordion,
  AccordionDetails,
} from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import useMediaQuery from 'hooks/useMediaQuery';
import { BiChevronDown } from 'react-icons/bi';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

interface Props {
  handleAccept: () => void
  handleReject: () => void
}

const CookieConsent = ({handleAccept, handleReject}:Props) => {
  const { isTablet } = useMediaQuery();
  const [expand, setExpand] = useState(false);

  const handleExpand = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setExpand(!expand);
  };

  return (
    <Wrapper
      divider={<Divider flexItem sx={{ borderColor: (theme) => (theme.palette as any).extra.walletModal.divider }} />}
      sx={{
        '.MuiAccordion-root:before': {
          display: 'none',
        },
      }}
    >
      <Stack
        direction={isTablet ? 'column' : 'row'}
        width="100%"
        justifyContent="space-between"
        gap="20px"
        alignItems="end"
      >
        <Stack alignItems="start" spacing={1}>
          <PrimaryText fontWeight={700} fontSize={18}>
            We value your privacy
          </PrimaryText>
          <SecondaryText fontSize={14}>
            We use cookies to enhance your browsing experience, technical purposes, and other purposes as specified in
            the cookie policy. Denying consent may make related features unavailable. By clicking &quot;Accept
            All&quot;, you consent to our use of cookies.
          </SecondaryText>
        </Stack>
        <Stack
          width={isTablet ? '100%' : 'auto'}
          direction={isTablet ? 'column' : 'row'}
          whiteSpace="nowrap"
          spacing={2}
        >
          <Button variant="outlined" size="large" onClick={handleExpand} fullWidth>
            {expand ? 'Collapse' : 'Customize'}
          </Button>
          <Button variant="outlined" size="large" fullWidth onClick={handleReject}>
            Reject All
          </Button>
          <Button variant="contained" size="large" fullWidth onClick={handleAccept}>
            Accept All
          </Button>
        </Stack>
      </Stack>
      {expand && (
        <>
          <Stack width="100%" alignItems="start" gap="30px">
            <Stack alignItems="start" spacing={1}>
              <PrimaryText fontWeight={700} fontSize={18}>
                Customize Consent Preferences
              </PrimaryText>
              <SecondaryText fontSize={14}>
                We use cookies to help you navigate efficiently and perform certain functions. You will find detailed
                information about all cookies under each consent category below. The cookies that are categorized as
                &quot;Necessary&quot; are stored on your browser as they are essential for enabling the basic
                functionalities of the site. We also use third-party cookies that help us analyze how you use this
                website, store your preferences, and provide the content and advertisements that are relevant to you.
                These cookies will only be stored in your browser with your prior consent. You can choose to enable or
                disable some or all of these cookies but disabling some of them may affect your browsing experience
              </SecondaryText>
            </Stack>
            <CollapseButton onClick={handleExpand}>
              <BiChevronDown />
            </CollapseButton>
          </Stack>
          <StyledAccordion disableGutters elevation={0} square>
            <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
              <Stack width='100%' alignItems="start" justifyContent="start" spacing={1}>
                <Stack direction="row" width="100%" justifyContent="space-between">
                  <PrimaryText fontWeight={700} fontSize={16} lineHeight={1}>
                    Necessary
                  </PrimaryText>
                  <Typography fontSize={14} fontWeight={500} color="success.main" lineHeight={1}>
                    Always Active
                  </Typography>
                </Stack>

                <SecondaryText fontSize={14}>
                  Necessary cookies are required to enable the basic features of this site, such as providing secure
                  log-in or adjusting your consent preferences. These cookies do not store any personally identifiable
                  data.
                </SecondaryText>
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0 20px' }}>
              <CookiesBox divider={<Divider flexItem sx={{ borderColor: (theme) => (theme.palette as any).extra.walletModal.divider }} />}>
                <CookieDetails>
                  <Stack direction='row' justifyContent='start' alignItems='baseline' spacing={2}>
                    <PrimaryText fontSize={14} fontWeight={600}>
                      Cookie:
                    </PrimaryText>
                    <SecondaryText fontSize={14}>
                      sigToken
                    </SecondaryText>
                  </Stack>
                  <Stack direction='row' justifyContent='start' alignItems='baseline' spacing={2}>
                    <PrimaryText fontSize={14} fontWeight={600}>
                      Duration:
                    </PrimaryText>
                    <SecondaryText fontSize={14}>
                      Session
                    </SecondaryText>
                  </Stack>
                  <Stack direction='row' justifyContent='start' alignItems='baseline' spacing={2}>
                    <PrimaryText fontSize={14} fontWeight={600}>
                      Description:
                    </PrimaryText>
                    <SecondaryText fontSize={14}>
                      This cookie is set to identify user login status and session instance.
                    </SecondaryText>
                  </Stack>
                </CookieDetails>
              </CookiesBox>
            </AccordionDetails>
          </StyledAccordion>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled(Stack)`
  align-items: start;
  justify-content: start;
  gap: 20px;
  width: 100%;
  min-height: 100px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2000;
  background-color: ${(props) => (props.theme.palette as any).extra.walletModal.background};
  box-shadow: 0 -1px 10px 0 #acabab4d;
  padding: 24px;
  max-height: 80vh;
  overflow: auto;
`;
const PrimaryText = styled(Typography)`
  color: ${(props) => (props.theme.palette as any).extra.walletModal.textPrimary};
`;
const SecondaryText = styled(Typography)`
  color: ${(props) => (props.theme.palette as any).extra.walletModal.textPrimary};
`;
const CollapseButton = styled(IconButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  color: ${(props) => props.theme.palette.primary.main};
`;
const StyledAccordion = styled(Accordion)`
  width: 100%;
  background-color: transparent;
  color: inherit;
  box-shadow: none;
  .MuiAccordionSummary-expandIconWrapper {
    color: inherit;
  }
  .MuiButtonBase-root {
    padding: 0
  }
`;
const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  alignItems: 'self-start',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    marginTop: 0,
  },
}));
const CookiesBox = styled(Stack)`
  width: 100%;
  background-color: ${(props) => (props.theme.palette as any).extra.walletModal.hover};
  border-radius: 8px;
  padding: 16px;
  align-items: start;
  justify-content: start;
`;
const CookieDetails = styled(Stack)`
  align-items: start;
  justify-content: start;
  gap: 8px;
`

export default CookieConsent;
