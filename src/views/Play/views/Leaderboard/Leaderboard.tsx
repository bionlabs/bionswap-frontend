import React from 'react'
import {
    Box,
    Stack,
    styled,
    Typography
} from '@mui/material'
import Image from 'next/image'

const Leaderboard = () => {
  return (
    <Stack alignItems="start" width="100%" justifyContent="start" gap="24px">
        <Stack direction="row" gap="10px" justifyContent="start">
        <Stack>
          <Image src="/images/gamecenter/trophy.svg" alt="" width={32} height={32} />
        </Stack>
        <Typography fontSize={18} fontWeight={600}>
          Top leading player
        </Typography>
      </Stack>
    </Stack>
  )
}

export default Leaderboard