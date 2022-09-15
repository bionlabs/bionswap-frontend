import React from "react";
import { Box, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Typography, styled } from "@mui/material";
import IDOProcess from "../IDOProcess";

interface VestingScheduleProps {
  data: any;
}

const VestingSchedule: React.FC<VestingScheduleProps> = ({ data }) => {
  return (
    <Box display="flex" gap={3} sx={{ width: "100%" }}>
      <WrapBox>
        <LineVertical />
        <FlexBox sx={{
          gap: {xs: '20px', md: '40px'}
        }}>
          <Box zIndex='5'>
            <img src="/icons/launchpad/WhiteListTime.svg" alt="WhiteListTime" />
          </Box>
          <FlexBox flexDirection='column' gap='10px' width='100%'>
            <ContentItem>
              <Typography variant="body3Poppins" color='gray.400' fontWeight='400'>
                Whitelist Start Time
              </Typography>
              <Typography variant="body3Poppins" color='text.primary' fontWeight='600'>
                30/05/2022 - 03:00:00 PM
              </Typography>
            </ContentItem>
            <ContentItem>
              <Typography variant="body3Poppins" color='gray.400' fontWeight='400'>
                Whitelist End Time
              </Typography>
              <Typography variant="body3Poppins" color='text.primary' fontWeight='600'>
                06/06/2022 - 03:00:00 PM
              </Typography>
            </ContentItem>
          </FlexBox>
        </FlexBox>
        <FlexBox sx={{
          gap: {xs: '20px', md: '40px'}
        }}>
          <Box zIndex='5'>
            <img src="/icons/launchpad/PublicTime.svg" alt="PublicTime" />
          </Box>
          <FlexBox flexDirection='column' gap='10px' width='100%'>
            <ContentItem>
              <Typography variant="body3Poppins" color='gray.400' fontWeight='400'>
                Start
              </Typography>
              <Typography variant="body3Poppins" color='text.primary' fontWeight='600'>
                30/05/2022 - 03:00:00 PM
              </Typography>
            </ContentItem>
            <ContentItem>
              <Typography variant="body3Poppins" color='gray.400' fontWeight='400'>
                End
              </Typography>
              <Typography variant="body3Poppins" color='text.primary' fontWeight='600'>
                30/05/2022 - 03:00:00 PM
              </Typography>
            </ContentItem>
          </FlexBox>
        </FlexBox>
        <FlexBox sx={{
          gap: {xs: '20px', md: '40px'}
        }}>
          <Box zIndex='5'>
            <img src="/icons/launchpad/ClaimTime.svg" alt="ClaimTime" />
          </Box>
          <FlexBox flexDirection='column' gap='10px' width='100%'>
            <ContentItem flexDirection='column' gap='10px'>
              <FlexBox width='100%' justifyContent='space-between' sx={{
                flexDirection: { xs: 'column', sm: 'row' }
              }}>
                <Typography variant="body3Poppins" color='gray.400' fontWeight='400'>
                  Start
                </Typography>
                <Typography variant="body3Poppins" color='text.primary' fontWeight='600'>
                  07/06/2022 - 04:30:00 PM
                </Typography>
              </FlexBox>
              <Line />
              <FlexBox width='100%' justifyContent='space-between' sx={{
                flexDirection: { xs: 'column', sm: 'row' }
              }}>
                <Typography variant="body3Poppins" color='text.primary' fontWeight='400'>
                  Initial claim percentage:
                </Typography>
                <Typography variant="body3Poppins" color='primary.main' fontWeight='500'>
                  50%
                </Typography>
              </FlexBox>
              <Typography variant="body3Poppins" color='gray.400' fontWeight='400'>
                You can claim 50% of your purchased BVT immediately on 07/06/2022 at 04:30:00 PM. The remaining token will be released linearly over time until it is fully released at 07/06/2022 at 04:30:00 PM
              </Typography>
            </ContentItem>
            <ContentItem>
              <Typography variant="body3Poppins" color='gray.400' fontWeight='400'>
                Distribution End Time:
              </Typography>
              <Typography variant="body3Poppins" color='text.primary' fontWeight='600'>
                07/06/2022 - 04:30:00 PM
              </Typography>
            </ContentItem>
          </FlexBox>
        </FlexBox>
      </WrapBox>
    </Box>
  );
};

const WrapBox = styled(Box)`
  background: ${(props) => (props.theme.palette.gray[900])};
  border: 1px solid;
  border-color: ${(props) => (props.theme.palette.gray[700])};
  border-radius: 8px;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  position: relative;
`
const FlexBox = styled(Box)`
  display: flex;
`
const ContentItem = styled(Box)`
  background: #000A0D;
  border-radius: 6px;
  padding: 14px 25px;
  width: 100%;
  justify-content: space-between;
  display: flex;

  ${props => props.theme.breakpoints.down("sm")} {
    flex-direction: column;
  }
`
const Line = styled(Box)`
  background-color: #717D8A;
  width: 100%;
  height: 1px;
`
const LineVertical = styled(Box)`
  height: 100%;
  height: calc(100% - 100px);
  width: 2px;
  background-color: #000000;
  position: absolute;
  left: 62px;
  z-index: 1;
`

export default VestingSchedule;
