import { Container } from '@mui/material';
import Page from 'components/Page';
import useMediaQuery from 'hooks/useMediaQuery';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import TabSection from './components/TabSection';

interface TabPanelProps {
  children?: React.ReactNode;
}

function TabPanel(props: TabPanelProps) {
  const { children, ...other } = props;

  return (
    <div role="tabpanel" {...other}>
      <Container sx={{ paddingTop: '40px' }}>{children}</Container>
    </div>
  );
}

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobile } = useMediaQuery();
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
  console.log(router);
  return (
    <Page sx={{ backgroundColor: (theme) => (theme.palette as any).extra.background.alt }}>
      <Header isMobile={isMobile} />
      <TabSection value={value} handleChange={handleChange} />
      <TabPanel>{children}</TabPanel>
    </Page>
  );
};

export default DashboardLayout;
