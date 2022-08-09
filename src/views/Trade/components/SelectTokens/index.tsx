import React, {useState} from 'react';
import {
    Box,
    FormControl,
    MenuItem,
    Select,
} from '@mui/material'
import styled from '@emotion/styled';
import Image from 'next/image';

const SelectTokens = () => {
    const [age, setAge] = useState(10);

    const handleChange = (event:any) => {
        setAge(event.target.value);
    };

    const SelectCustom = styled(Select)`
        .MuiOutlinedInput-input {
            color: #F6F6F6;
            font-weight: 600;
            font-size: 16px;
            font-family: 'Poppins', sans-serif;
            padding: 0;
        }

        fieldset {
            display: none;
        }
    `
    
    return (
        <Box display='flex' gap='12px'>
            <Box display='flex' alignItems='center'>
                <Image src='/images/coins/BSC.png' alt="" width={19} height={19}/>
                <Image src='/images/coins/BNB.png' alt="" width={19} height={19}/>
            </Box>
            <FormControl fullWidth>
                <SelectCustom value={age} onChange={handleChange}>
                    <MenuItem value={10}>FOX/BUSD</MenuItem>    
                    <MenuItem value={20}>FOX/USDT</MenuItem>
                    <MenuItem value={30}>FOX/BNB</MenuItem>
                </SelectCustom>
            </FormControl>
        </Box>
    );
};

export default SelectTokens;
