import React from 'react'
import {
    InputAdornment,
    TextField
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';


interface SearchProps {
    searchKeyword: (event:any) => void
}

const Search = ({searchKeyword}:SearchProps) => {
  return (
    <TextField
        variant="standard"
        onChange={searchKeyword}
        placeholder="Enter project name, token address or token symbol"
        fullWidth
        sx={{
        '.MuiOutlinedInput-notchedOutline':{
            border: 0
        },
        input: {
            color: 'text.primary',
            padding: '8px 0 15px',
            '&:placeholder': {
                color: 'text.secondary',
            },
        },
        }}
        InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                <SearchIcon sx={{ color: 'text.secondary' }} />
            </InputAdornment>
        ),
        }}
    />
  )
}

export default Search