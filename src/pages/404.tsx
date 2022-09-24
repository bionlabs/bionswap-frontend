import React from 'react'
import {
    Box,
    styled,
    Typography,
    Button,
    useMediaQuery
} from '@mui/material'
import Page from 'components/Page'

const ErrorPage = () => {
  const isMobile = useMediaQuery('(max-width:700px)');
  return (
    <Page>
        <Box sx={{
            color: 'rgba(7, 224, 224, 0.1)', fontWeight: '700', fontSize: isMobile ? '45vw' : '25vw', lineHeight: '1',
            display: 'flex', justifyContent: 'center', alignItems:'center', width: '100%', height: '100vh',
            position: 'absolute', top: '0', left: '0', zIndex: '1'
        }}>
            404
        </Box>
        <Box sx={{
            display: 'flex', justifyContent: 'center', alignItems:'center', width: '100%', height: '100vh',
            position: 'absolute', top: '0', left: '0', zIndex: '2'
        }}>
            <Box sx={{
                display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '10px'
            }}>
                <Typography variant='h2Samsung'>
                    Page not found
                </Typography>
                <Box>
                    <Button
                        variant='contained'
                        sx={{
                            transition: '.15s ease-in', width: 'fit-content',
                            '&:hover':{
                                backgroundColor: 'primary.main',
                                opacity: '.8'
                            }
                        }}
                        href='/'
                    >
                        Back to homepage
                    </Button>
                </Box>
            </Box>
            
        </Box>
    </Page>
  )
}

export default ErrorPage