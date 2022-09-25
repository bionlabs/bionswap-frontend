import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import Page from 'components/Page';
import ProjectCard from 'components/ProjectCard';

const MyProject = () => {
  return (
    <Page>
      <Wrapper>
        <Box mb="50px">
          <Typography variant="h3Samsung">My projects</Typography>
        </Box>
        <Box>
          <Item>
            <ProjectCard data={[]} />
          </Item>
        </Box>
      </Wrapper>
    </Page>
  );
};

const Wrapper = styled(Box)`
  width: 100%;
  padding: 30px 40px;
`;
const Item = styled(Box)`
  max-width: 423px;
`;

export default MyProject;
