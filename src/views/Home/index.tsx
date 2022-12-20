import { useMediaQuery } from '@mui/material';
import { getLaunchpadStats } from 'api/launchpad';
import Page from 'components/Page';
import { useEffect, useState } from 'react';
import Analytics from './Sections/Analytics/Analytics';
import Features from './Sections/Features/Features';
import HeroSection from './Sections/Hero/HeroSection';
import Highlight from './Sections/Highlight/Highlight';
import NetworkSection from './Sections/Network/NetworkSection';
import PartnersSection from './Sections/Partners/PartnersSection';

const Homepage = () => {
  const isMobile = useMediaQuery('(max-width:700px)');
  const isTablet = useMediaQuery('(max-width:1050px)');
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalSwapTransactions: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getLaunchpadStats();

      setStats(res);
    };

    fetchStats();
  }, []);

  return (
    <Page sx={{
      //  backgroundColor: theme => (theme.palette as any).extra.background.alt
    }}>
      <HeroSection isMobile={isMobile} isTablet={isTablet} />
      <Features/>
      <Highlight/>
      <PartnersSection/>
      {/* <Analytics/>
      <NetworkSection isMobile={isMobile} isTablet={isTablet} />
      <UpcommingProjectSection />
      <OurProjectsSection isMobile={isMobile} />
      <PartnersSection />
      <CommunitySection isMobile={isMobile} isTablet={isTablet} /> */}
      {/* <OurProjectsSection isMobile={isMobile}/>
        <LaunchSection isMobile={isMobile} /> */}
    </Page>
  );
};

export default Homepage;
