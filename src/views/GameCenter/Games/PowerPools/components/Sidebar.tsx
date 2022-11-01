import React from 'react'
import {
    Box,
    styled,

} from '@mui/material'
import ProfileBox from './ProfileBox'

const Sidebar = () => {
  return (
    <Wrapper>
        <ProfileBox/>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
    width: 400px;
    background-color: ${props => props.theme.palette.primary.dark};
    border-left: 1px solid ${props => props.theme.palette.gray[800]};
    height: inherit;
    min-height: inherit;
    padding: 24px;
`

export default Sidebar