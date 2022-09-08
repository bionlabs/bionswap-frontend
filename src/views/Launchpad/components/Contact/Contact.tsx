import React from 'react'
import { 
    Box,
    styled,
    Typography,
    TextField, 
    InputAdornment,
    Button
  } from '@mui/material'
import { MobileProp } from 'configs/Type/Mobile/type'


const Contact = ({isMobile , isTablet}:MobileProp) => {
  return (
    <Wrapper p={isMobile ? '5rem 16px' : '4rem 8rem'}>
        <ContactBox flexDirection={isTablet ? 'column' : 'row'} gap='24px'>
            <Flex flexDirection='column' gap='8px' maxWidth='447px'>
                <Box>
                    <Typography variant='body2Poppins' sx={{color: 'yellow.300'}}>
                        Never want to miss a sales?
                    </Typography>
                </Box>
                <Box>
                    <Typography variant='h5Samsung'>
                        Sign up for our newsletter and get the lastest news and updates
                    </Typography>
                </Box>
            </Flex>
            <Box>
                <StyledInput
                    placeholder="Email"
                    variant="outlined"
                    sx={{
                        width: isTablet ? 'auto' : '514px'
                    }}
                    InputProps={{
                        endAdornment: 
                        <InputAdornment position="end" sx={{padding: '17px 20px', height: 'auto', maxHeight: 'fit-content'}}>
                            <SubcribeButton variant='contained'>
                                Subcribe
                            </SubcribeButton>
                        </InputAdornment>,
                      }}
                />
            </Box>
        </ContactBox>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
    background: ${props => (props.theme.palette as any).extra.background.darkGreen};
`
const ContactBox = styled(Box)`
    background: ${props => (props.theme.palette as any).extra.background.primaryDarkGreen};
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 3rem;
    justify-content: space-between;
`
const Flex = styled(Box)`
    display: flex;
`
const StyledInput = styled(TextField)`
    * {
        transition: .12s ease-in;
    }
    .MuiOutlinedInput-root {
        background-color: #000;
        padding-right: 0;
        fieldset {
            border: 1px solid #fff;
        }
        input {
            padding: 17px 20px;
        }
    }
`
const SubcribeButton = styled(Button)`
    font-weight: 600;
    transition: .12s ease-in;
    font-size: 16px;
    :hover {
        background-color: ${props => props.theme.palette.primary.main};
        opacity: .8;
    }
`

export default Contact