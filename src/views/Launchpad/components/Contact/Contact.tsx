import React from 'react';
import { Box, styled, Typography, TextField, InputAdornment, Button } from '@mui/material';
import { Container } from '@mui/system';

const Contact = () => {
  return (
    <Wrapper>
      <Container>
        <ContactBox
          gap="24px"
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Flex
            flexDirection="column"
            gap="8px"
            sx={{
              maxWidth: { xs: '100%', md: '447px' },
            }}
          >
            <Typography variant="body2Poppins" sx={{ color: '#FFF', fontWeight: '400' }}>
              Never want to miss a sales?
            </Typography>
            <Typography variant="h5Samsung" sx={{ color: '#FFF', fontWeight: '700' }}>
              Sign up for our newsletter and get the lastest news and updates
            </Typography>
          </Flex>
          <Box
            sx={{
              width: { xs: '100%', md: 'auto' },
            }}
          >
            <TextField
              placeholder="Email Address"
              variant="standard"
              focused={false}
              sx={{
                width: { xs: '100%', md: '514px' },
                color: '#FFF',
                input: {
                    color: '#fff',
                  '&:placeholder': {
                    color: '#FFF',
                  },
                },
                '.MuiInputBase-root.MuiInput-root:before':{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.7)',
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ padding: '17px 20px', height: 'auto', maxHeight: 'fit-content' }}
                  >
                    <SubcribeButton variant="contained">Subscribe</SubcribeButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </ContactBox>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled(Box)``;
const ContactBox = styled(Box)`
  background-color: ${(props) => props.theme.palette.primary.main};
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 3rem;
  justify-content: space-between;

  ${(props) => props.theme.breakpoints.down('sm')} {
    padding: 1.5rem;
  }
`;
const Flex = styled(Box)`
  display: flex;
`;
const SubcribeButton = styled(Button)`
  transition: 0.12s ease-in;
  font-size: 16px;
  background-color: #fff;
  color: #000;
  :hover {
    background-color: #fff;
    opacity: 0.8;
  }
`;

export default Contact;
