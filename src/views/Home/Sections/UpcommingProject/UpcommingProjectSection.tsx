/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import {
    Box,
    Container,
    styled,
    Typography,
} from '@mui/material'
import Image from "next/image";
import Card from 'components/Card';
import { getSaleList } from 'api/launchpad';
import { useChain } from 'hooks';

const UpcommingProjectSection = () => {
    const { chainId } = useChain();
    const [launchData, setLaunchData]: any = useState(null);
    const [params, setParams] = useState({
        page: 1,
        limit: 3,
        owner: '',
        keyword: '',
        sortBy: null,
      });

      useEffect(() => {
        const getLaunchData = async (params: any) => {
          try {
            const launchData = await getSaleList(
              params.page,
              params.limit,
              chainId.toString(),
              params.owner,
              params.keyword,
              params.sortBy,
            );
            setLaunchData(launchData);
          } catch (error) {
            console.log('error====>', error);
          }
        };
    
        getLaunchData(params);
      }, [chainId, params]);
    return (
        <Wrapper>
            <Container maxWidth='lg' sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <FlexBox mb='60px' alignItems='center' flexDirection='column'>
                    <FlexBox gap='20px'>
                        <Image src="/icons/home/launchpad_icon.svg" alt="launchpad_icon" width={37} height={25} />
                        <Typography variant='subtitle1' sx={{ color: 'gray.300' }}>
                            launchpad
                        </Typography>
                    </FlexBox>
                    <Typography variant='h3Poppins' fontWeight='600'>
                        Upcoming launching projects
                    </Typography>
                </FlexBox>
                <WrapItems>
                    {
                        launchData?.data?.map((item: any) => (
                            <Items key=''>
                                <Card data={item} />
                            </Items>
                        ))
                    }
                </WrapItems>
            </Container>
        </Wrapper>
    )
}

const FlexBox = styled(Box)`
    display: flex;
`
const Wrapper = styled(Box)`
        width: 100%;
        padding: 8vh 0;
        display: flex;
        flex-direction: column;
        gap: 60px;
        background-color: transparent;
`
const WrapItems = styled(Box)`
        display: flex;
        gap: 32px;
        flex-wrap: wrap;
        width: 100%;

        ${props => props.theme.breakpoints.down("sm")} {
            justify-content: center;
        }
    `
const Items = styled(Box)`
        min-width: 340px;
        max-width: calc(94% / 3);
        width: 100%;
    `

export default UpcommingProjectSection