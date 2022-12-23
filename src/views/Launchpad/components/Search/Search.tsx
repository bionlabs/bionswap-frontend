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
        variant="outlined"
        onChange={searchKeyword}
        placeholder="Enter project name, token address or token symbol"
        fullWidth
        focused={false}
        sx={{
        '.MuiInputBase-root': {
           backgroundColor: theme => (theme.palette as any).extra.card.background,
           borderRadius: '4px',
           border: theme => `1px solid ${(theme.palette as any).extra.card.divider}`
        },
        '.MuiOutlinedInput-notchedOutline':{
            border: 0
        },
        input: {
            fontSize: '14px',
            color: 'text.primary',
            '&:placeholder': {
                color: 'text.secondary',
            },
        },
        }}
        InputProps={{
        startAdornment: (
            <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
            </InputAdornment>
        ),
        }}
    />
  )
}

export default Search