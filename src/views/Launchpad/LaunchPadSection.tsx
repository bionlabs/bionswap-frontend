import {
  Box,
  styled,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { MobileProp } from 'configs/Type/Mobile/type'
import React from 'react'
import { crowdfundingConfig } from 'views/Crowdfunding/config'
import Card from './components/Card/Card'
import Title from './components/Title/Title'

const LaunchPadSection = ({isMobile , isTablet , isDesktop}:MobileProp) => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  
  return (
    <Wrapper p={isMobile ? '5rem 16px' : '4rem 8rem'}>
      <Section>
        <Title
          title='Feature Project'
        />
        <CardLayout sx={{
          gridTemplateColumns: isMobile ? 'auto' : isTablet ? 'auto auto' : isDesktop ? 'auto auto auto' : 'auto auto auto auto'
        }}>
            {
                crowdfundingConfig?.map((item, idex) => (
                    <Items key=''>
                        <Card data={item} />
                    </Items>
                ))
            }
        </CardLayout>
      </Section>
      <Section>
        <Title
          title='Current Projects'
          isCurrent
          currentMessage='Many ideas waiting for you to reach'
        />
        <TextField
          variant="standard"
          placeholder={isMobile ? 'Search project name, token address...' : 'Search by project name, token contract address or token symbol' }
          sx={{
            '.MuiInput-root:before':{
              borderBottom: '2px solid #4F5B67'
            }
          }}
          InputProps={{
            endAdornment: 
            <InputAdornment position="end">
                <SearchIcon sx={{color: 'gray.500'}}/>
            </InputAdornment>,
          }}
        />
        <Flex alignItems='center' justifyContent='space-between'>
          <Box minWidth='170px'>
            <FormControl fullWidth>
              <InputLabel sx={{color: 'gray.400'}}>Sort</InputLabel>
              <Select
                value={age}
                label='Sort'
                onChange={handleChange}
                sx={{
                  '*':{
                    transition: '.12s ease-in'
                  }
                }}
              >
                <MenuItem value={1}>New launch</MenuItem>
                <MenuItem value={2}>Top trending</MenuItem>
                <MenuItem value={3}>Finished</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Flex>
        <CardLayout sx={{
          gridTemplateColumns: isMobile ? 'auto' : isTablet ? 'auto auto' : isDesktop ? 'auto auto auto' : 'auto auto auto auto'
        }}>
            {
                crowdfundingConfig?.map((item, idex) => (
                    <Items key=''>
                        <Card data={item} />
                    </Items>
                ))
            }
        </CardLayout>
      </Section>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 62px;
`
const Flex = styled(Box)`
  display: flex;
`
const Section = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
const CardLayout = styled(Box)`
  display: grid;
  gap: 32px;
  justify-content: flex-start;
`
const Items = styled(Box)`
  width: 337px
`


export default LaunchPadSection