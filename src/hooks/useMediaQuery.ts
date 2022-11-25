import {
    styled,
    useMediaQuery as muiUseMediaQuery
} from '@mui/material'

const useMediaQuery = () => {
    const isXs = muiUseMediaQuery('(max-width:599px)');
    const isSm = muiUseMediaQuery('(max-width:899px)');
    const isMd = muiUseMediaQuery('(max-width:1199px)'); 
    return {
        isXs,
        isSm,
        isMd
    }
}

export default useMediaQuery