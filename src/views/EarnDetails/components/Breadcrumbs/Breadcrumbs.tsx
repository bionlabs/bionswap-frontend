import React from 'react'
import {
    Typography,
    Breadcrumbs as MuiBreadcrumbs,
    Stack
} from '@mui/material'
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


interface Props {
    pair: any
}

const Breadcrumbs = ({pair}:Props) => {
const breadcrumbs = [
    <Link key="1" href="/earn" legacyBehavior>
        <Stack sx={{cursor: 'pointer'}}>
            <Typography fontSize={14} color='text.secondary'>
                Home
            </Typography>
        </Stack>
    </Link>,
    <Typography key="2" fontSize={14} fontWeight={500}>
        {pair}
    </Typography>,
    ];
    
  return (
    <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
    >
        {breadcrumbs}
    </MuiBreadcrumbs>
  )
}

export default Breadcrumbs