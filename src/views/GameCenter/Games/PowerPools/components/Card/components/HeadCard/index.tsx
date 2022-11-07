import { Stack, Typography, styled, Box, LinearProgress } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import { useEffect, useState } from 'react';

interface HeadCardProps {
  totalSlots: number;
  filledSlots: number;
  currentRoundId: number;
  isRoundStart: boolean;
}

const statuses = [
  {
    id: 0,
    label: 'LIVE',
    icon: <PlayCircleOutlineOutlinedIcon htmlColor="#2AC89F" />,
    color: 'success.main',
    bgColor: '#003023',
  },
  {
    id: 1,
    label: 'Drawing',
    icon: <CachedIcon htmlColor="#A8B0B9" />,
    color: 'gray.400',
    bgColor: 'gray.800',
  },
  {
    id: 2,
    label: 'Ended',
    icon: <CheckCircleOutlinedIcon htmlColor="#9A6AFF" />,
    color: 'secondary.light',
    bgColor: '#171029',
  },
];

const HeadCard = ({ totalSlots, filledSlots, currentRoundId, isRoundStart }: HeadCardProps) => {
  const [status, setStatus] = useState(0);
  const [progress, setProgress] = useState(0);

  //   Check status - 0:live - 1:drawing - 2:ended -
  useEffect(() => {
    if (isRoundStart) {
      setStatus(0);
    } else if (totalSlots === filledSlots) {
      setStatus(1);
    } else {
      setStatus(2);
    }
  }, [isRoundStart, totalSlots, filledSlots]);

  //   Set value progress for component LinearProgress
  useEffect(() => {
    if (status != 0) {
      setProgress(100);
    } else {
      setProgress((filledSlots * 100) / totalSlots);
    }
  }, [status, filledSlots, totalSlots]);

  return (
    <>
      {statuses?.map(
        (item: any) =>
          item.id === status && (
            <Header key={item.label} bgcolor={item.bgColor}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                <Stack direction="row" alignItems="center" spacing={1}>
                  {item.icon}
                  <Typography variant="body3Poppins" fontWeight="600" color={item.color} textTransform="uppercase">
                    {item.label}
                  </Typography>
                </Stack>
                <Typography variant="body3Poppins" fontWeight="400" color={item.color}>
                  #{currentRoundId}
                </Typography>
              </Stack>
            </Header>
          ),
      )}
      {statuses?.map(
        (item: any) =>
          item.id === status && (
            <Box key={item.label} color={item.color}>
              <LinearProgress color="inherit" variant="determinate" value={progress} />
            </Box>
          ),
      )}
    </>
  );
};

const Header = styled(Box)`
  background-color: #003023;
  padding: 8px 10px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export default HeadCard;
