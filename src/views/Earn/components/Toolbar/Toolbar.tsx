import React , {Dispatch, SetStateAction, useState} from 'react'
import {
    Box,
    styled,
    Stack,
    Typography,
    IconButton,
    ToggleButtonGroup,
    ToggleButton
} from '@mui/material'
import {IoList , IoGrid} from 'react-icons/io5'

interface ToolbarProps {
    view: string | null
    handleChangeView: (event: React.MouseEvent<HTMLElement>, newView: string | null) => void
}

const Toolbar = ({
    view,
    handleChangeView
}:ToolbarProps
) => {

  

  return (
    <div>
        <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleChangeView}
            size="large"
            color='primary'
        >
            <StyledIconButton value="card" aria-label="card">
                <IoGrid />
            </StyledIconButton>
            <StyledIconButton value="table" aria-label="table">
                <IoList />
            </StyledIconButton>
        </ToggleButtonGroup>
    </div>
  )
}

const StyledIconButton = styled(ToggleButton)`
    padding: 12px;
    svg {
        width: 20px;
        height: 20px;
    }
`

export default Toolbar