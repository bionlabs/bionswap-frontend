import { Stack, Typography, Box, styled, Button } from '@mui/material';
import { useCallback, useRef, useEffect } from 'react';
import { ApprovalState } from 'hooks/useApproveCallback';
import LoadingButton from '@mui/lab/LoadingButton';
import { MENU_HEIGHT } from 'configs/menu/config';

const HeaderSection = ({
  data,
  activeStep,
  onBackStep,
  onNextStep,
  approvalState = null,
  pendingStep4 = false,
  handleApprove = null,
  handleCreateSale = null,
  loadignSubmit = false,
  isReady = false,
}: any) => {
  return (
    <WrapHead>
      <Stack flexDirection="row" gap="4px">
        <Typography color="text.secondary">
          Project name:
        </Typography>
        {data.projectTitle && (
          <Typography color="text.primary">
            {data?.projectTitle}
          </Typography>
        )}
      </Stack>
      <Stack flexDirection="row" gap="12px">
        {activeStep > 0 && (
          <Preview variant="contained" onClick={() => onBackStep()}>
            Back
          </Preview>
        )}
        {handleCreateSale ? (
          <Next variant="contained" onClick={() => handleCreateSale(data)} disabled={loadignSubmit || !isReady} sx={{}}>
            {loadignSubmit ? 'Loading…' : 'Submit'}
          </Next>
        ) : approvalState === ApprovalState.APPROVED || activeStep !== 3 ? (
          <Next variant="contained" onClick={() => onNextStep()}>
            Next
          </Next>
        ) : (
          <Next
            variant="contained"
            loading={pendingStep4 && approvalState === ApprovalState.NOT_APPROVED}
            onClick={handleApprove}
          >
            {!(pendingStep4 && approvalState === ApprovalState.NOT_APPROVED) && (
              <Typography fontSize="inherit" color="inherit" fontWeight="inherit">
                Enable
              </Typography>
            )}
          </Next>
        )}
      </Stack>
    </WrapHead>
  );
};

const WrapHead = styled(Box)`
  justify-content: space-between;
  padding: 32px 0;
  width: 100%;
  display: flex;
  background-color: ${(props) => props.theme.palette.background.default};
`;
const Next = styled(LoadingButton)`
  border-radius: 4px;
`;
const Preview = styled(Button)`
  border-radius: 4px;
`;

export default HeaderSection;
