import React from 'react'
import {
    Box,
    styled,
    Typography
} from '@mui/material'

export interface Props {
    title:string,
    isCurrent?: boolean,
    currentMessage?: string
}

const Title = ({title, isCurrent , currentMessage}:Props) => {
  return (
    <Flex>
        <Cross sx={{height: isCurrent ? '58px' : '20px'}}/>
        <Box>
            <Box>
                <Typography variant='h5Samsung'>
                    {title}
                </Typography>
            </Box>
            {
                isCurrent &&
                <Box>
                    <Typography variant='body3Poppins' sx={{color: 'extra.text.secondary'}}>
                        {currentMessage}
                    </Typography>
                </Box>
            }
        </Box>
    </Flex>
  )
}

const Flex = styled(Box)`
    display: flex;
    align-items: center;
    gap: 20px;
`
const Cross = styled(Box)`
    background-color: ${props => props.theme.palette.primary.main};
    width: 5px;
`

export default Title