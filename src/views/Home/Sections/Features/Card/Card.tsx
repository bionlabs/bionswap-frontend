import React from 'react'
import {
    styled,
    Box,
    Stack,
    Typography,
    Button,

} from '@mui/material'

export interface CardProps {
  title: string,
  content: string,
  href: string,
  buttonLabel: string,
  disabled: boolean
}

const Card = ({
  title,
  content,
  href,
  buttonLabel,
  disabled
}:CardProps) => {
  return (
    <Wrapper>
      <Stack spacing={3} alignItems='start'>
        <Stack spacing={1} alignItems='start'>
            <Typography fontSize='24px' fontWeight='600'>
            {title}
            </Typography>
            <Typography color='text.secondary'>
            {content}
            </Typography>
        </Stack>
        <StyledButton
          variant='contained'
          disabled={disabled}
        >
            <Typography fontWeight='500' color='inherit' fontSize='14px'>
                {buttonLabel}
            </Typography>
        </StyledButton>
      </Stack>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  background-color: ${props => (props.theme.palette as any).background.default};
  border: 1px solid #737373;
  padding: 24px;
  border-radius: 4px;
`
const StyledButton = styled(Button)`
   
`

export default Card