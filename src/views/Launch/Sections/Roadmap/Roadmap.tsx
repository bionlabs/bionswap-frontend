import { MobileProp } from 'configs/Type/Mobile/type'
import React from 'react'
import { Box, Button, Container, styled, Typography, Stack, Paper } from "@mui/material"
import { makeStyles } from '@mui/styles'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Image from 'next/image';



const config = [
    {
        title: 'Application',
        content: 'Projects apply on the BionSwap Governance Portal'
    },
    {
        title: 'DUE DILIGENCE',
        content: 'The BionSwap research team reviews application and moves selected projects to the next step'
    },
    {
        title: 'THE BIONSWAP council',
        content: 'The DAO Council receives the selected projects and makes a final decision'
    },
    {
        title: 'PRE-RAISE SUPPORT',
        content: 'Once approved, projects get the full BionSwap team support leading up to the sale'
    },
    {
        title: 'IDO or NFT Sale',
        content: 'Launch your token or NFT collection on the official BionSwap website'
    },
]
const useStyles = makeStyles({
    timeline: {
    //   transform: "rotate(270deg)",
        width: '100%',
    //   flexGrow: '0!important'
    },
    timelineContentContainer: {
        textAlign: "left",
    },
    timelineItems : {
        minHeight: '150px!important'
    },
    timelineContent: {
        display: "inline-block",
    //   transform: "rotate(90deg)",
    //   textAlign: "left",
        minWidth: 50,
        maxWidth: '359px'
    },
    timelineIcon: {
    //   transform: "rotate(-90deg)"
    }
  });


const Roadmap = ({ isMobile, isTablet }: MobileProp) => {
  
  const classes = useStyles();

  return (
    <Wrapper padding={isTablet ? '8rem 16px' : '8rem'}>
        <Box maxWidth='796px' textAlign='center'>
            <Typography variant='h2'>
                Streamlined application and launch process
            </Typography>
        </Box>
        <Timeline className={classes.timeline} position="alternate" sx={{
            padding: isMobile ? '6px 0' : null
        }}>
            {
                config.map((item, index) =>
                    <TimelineItem key='' className={classes.timelineItems} sx={{
                        ':before':{
                            padding: isMobile ? '6px 0' : null,
                        }
                    }}>
                        <TimelineSeparator>
                        {/* <TimelineDot>
                            <img src='/images/home/roadmap-dot.svg' alt='' width='25px' height='25px' />
                        </TimelineDot> */}
                        <img src='/images/home/roadmap-dot.svg' alt='' width='50px' height='50px' />
                        {index+1 === config.length ? null : <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent className={classes.timelineContentContainer} sx={{
                            padding: isMobile ? '6px 0' : null,
                        }}>
                            <Box className={classes.timelineContent}>
                                <FlexBox flexDirection='column'>
                                    <Typography variant={isMobile ? 'body3Poppins' : 'h6Samsung'} sx={{textTransform: 'uppercase',fontWeight:'600'}}>
                                        <Typography variant={isMobile ? 'body3Poppins' : 'h6Samsung'} sx={{color:'#545D6D',fontWeight:'600'}}>0{index+1}</Typography> {item.title}
                                    </Typography>
                                    <Typography variant='body4Poppins' sx={{color: 'extra.text.blur'}}>
                                        {item.content}
                                    </Typography>
                                </FlexBox>
                            </Box>
                        </TimelineContent>
                    </TimelineItem>
                )
            }
        </Timeline>
        {/* <Box>
            <Typography variant='h2' sx={{color: 'primary.main'}}>
                Recognise by major exchanges
            </Typography>
        </Box> */}
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 60px;
    align-items: center;
    background: url("/images/home/roadmap-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
`
const FlexBox = styled(Box)`
  display: flex;
`

export default Roadmap