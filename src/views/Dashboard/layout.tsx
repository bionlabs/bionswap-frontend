import { Box, Container, Stack } from '@mui/material';
import Page from 'components/Page';
import SkeletonCard from 'components/SkeletonCard';
import useMediaQuery from 'hooks/useMediaQuery';
import { useRouter } from 'next/router';
import { Suspense, useEffect, useState } from 'react';
import Header from './components/Header';
import Profile from './components/Profile';
import TabSection from './components/TabSection';

interface TabPanelProps {
  children?: React.ReactNode;
}

function TabPanel(props: TabPanelProps) {
  const { children, ...other } = props;

  return (
    <Box role="tabpanel" {...other} width="100%">
      <Box width="100%">{children}</Box>
    </Box>
  );
}

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobile, isTablet } = useMediaQuery();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const router = useRouter();
  useEffect(() => {
    const newValue =
      router.route === '/dashboard'
        ? 0
        : router.route === '/dashboard/allocation'
        ? 1
        : router.route === '/dashboard/my-project'
        ? 2
        : 0;

    setValue(newValue);
  }, [router.route]);

  return (
    <Page>
      <Header/>
      <Container maxWidth="xl" sx={{position:'relative', zIndex: '1'}}>
        <Stack width="100%" direction={isTablet ? 'column' : 'row'} alignItems="start" gap="60px">
          <Profile/>
          <Stack width="100%" alignItems="start" justifyContent="start" gap="40px">
            <TabSection value={value} handleChange={handleChange} />
            <TabPanel>
              <Suspense fallback={<SkeletonCard/>}>
                {children}
              </Suspense>
            </TabPanel>
          </Stack>
        </Stack>
      </Container>
    </Page>
  );
};

export default DashboardLayout;
