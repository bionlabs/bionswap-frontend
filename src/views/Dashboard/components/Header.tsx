import React from "react"
import {
  Box,
  styled
} from '@mui/material'
import Image from "next/image";
import useMediaQuery from "hooks/useMediaQuery";

const Header = () => {
  const {isMobile} = useMediaQuery()
  return (
    <Wrapper>
      <ImageWrapper>
        {
          !isMobile && <img src='/images/dashboard-banner-default.png' alt='' width='100%' />
        }
        
      </ImageWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  height: 184px;
  background-color: ${props => props.theme.palette.background.default};
  display: flex;
  align-items: center;
  width: 100%;
`
const ImageWrapper = styled(Box)`
  img {
    object-fit: cover;
  }
`


export default Header;
