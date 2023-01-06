import React from "react"
import {
  Box,
  styled
} from '@mui/material'
import Image from "next/image";

const Header = () => {

  return (
    <Wrapper>
      <Image src='/images/dashboard-banner-default.png' alt='' fill />
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  height: 184px;
  background-color: ${props => props.theme.palette.background.default};
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 0;
`


export default Header;
