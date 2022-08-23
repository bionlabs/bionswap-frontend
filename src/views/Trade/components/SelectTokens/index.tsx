import React, { useState } from 'react';
import {
    Box,
    FormControl,
    MenuItem,
    Select,
    styled
} from '@mui/material'
import Image from 'next/image';

const SelectTokens = () => {
    const [age, setAge] = useState(10);

    const handleChange = (event: any) => {
        setAge(event.target.value);
    };

    return (
        <FlexBox gap='12px'>
            <WrapImage>
            <Image src='/images/coins/BionicFoxCoin.png' alt="BionicFoxCoin" width={52} height={52} objectFit='cover' />
            </WrapImage>
            <FlexBox flexDirection='column' gap='4px'>
                <FormControl fullWidth>
                    <SelectCustom value={age} onChange={handleChange}>
                        <MenuItem value={10}>FOX/BUSD</MenuItem>
                        <MenuItem value={20}>FOX/USDT</MenuItem>
                        <MenuItem value={30}>FOX/BNB</MenuItem>
                    </SelectCustom>
                </FormControl>
                <TokenValue>$0.503</TokenValue>
            </FlexBox>
        </FlexBox>
    );
};

const FlexBox = styled(Box)`
    display: flex;
`
const SelectCustom = styled(Select)`
    .MuiOutlinedInput-input {
        color: #F6F6F6;
        font-weight: 600;
        font-size: 16px;
        font-family: 'Poppins', sans-serif;
        padding: 0;
        line-height: 20px;
    }

    fieldset {
        display: none;
    }
`
const WrapImage = styled(Box)`
    width: 52px;
    height: 52px;
`
const TokenValue = styled(Box)`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  color: #00eaff;
`;

export default SelectTokens;
