import React from 'react'
import {
    Box
} from '@mui/material'
import { menuConfig } from '../../configs/menu/config'


const Menu = ({ children }: any) => {
    return (
        <header>
            <Box sx={{
                backgroundColor: "#FFFFFF",
                boxShadow: "-1px 4px 3px rgb(37 39 61 / 8%)",
                padding: '1rem'
            }} display="flex" gap={10} >
                <Box>
                    <Box component="a" href='/'>
                        <img src='logo.svg' alt='BionDex' width='200px' />
                    </Box>
                </Box>
                <Box alignItems="center" display="flex" gap={4}>
                    {
                        menuConfig.map(item =>
                            <Box key='' component="a" href={item.href}
                                 sx={{
                                    color: "#A8B0B9",
                                    fontWeight: '600',
                                    fontSize: '16px',
                                    lineHeight: '160%',
                                 }}>
                                {item.label}
                            </Box>
                        )
                    }
                </Box>
            </Box>
        </header>
    )
}

export default Menu