import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  ClickAwayListener,
  IconButton,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { DraggableNode } from '../nodes/draggableNode'
import { useTheme } from '@mui/material/styles'
import vsLogo from '../assets/vsLogo.avif'
import { toolbarStyles } from '../styles/styles'

export const PipelineToolbar = () => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const styles = toolbarStyles(theme)

  const handleToggle = () => setOpen(prevOpen => !prevOpen)
  const handleClickAway = () => setOpen(false)

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: '#1E2B3D', boxShadow: 'none' }}
    >
      <Toolbar sx={styles.toolbarContainer}>
        {/* Logo and Title */}
        <Box sx={styles.logoContainer}>
          <img src={vsLogo} alt="VS Logo" style={{ height: '30px' }} />
          <Typography
            variant="h6"
            sx={{ color: '#FFFFFF', fontFamily: 'Poppins, sans-serif' }}
          >
            VectorShift
          </Typography>
        </Box>

        {/* Common Nodes */}
        <Box sx={styles.draggableNodesContainer}>
          <DraggableNode type="customInput" label="Input" />
          <DraggableNode type="text" label="Text" />
          <DraggableNode type="llm" label="LLM" />
          <DraggableNode type="customOutput" label="Output" />
          {/* Specialized Nodes*/}
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={styles.commonNodeStyles} onClick={handleToggle}>
              Specialized Nodes
              <IconButton sx={styles.iconButtonStyles}>
                <ExpandMoreIcon
                  sx={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </IconButton>
              <Box sx={[styles.dropdownMenu, open && styles.dropdownVisible]}>
                <DraggableNode type="date" label="Date Picker" />
                <DraggableNode type="slider" label="Slider Value" />
                <DraggableNode type="numberInput" label="Numeric Input" />
                <DraggableNode type="dropdown" label="Parameter Type" />
                <DraggableNode type="checkbox" label="Processing Options" />
              </Box>
            </Box>
          </ClickAwayListener>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
