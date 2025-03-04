import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  ClickAwayListener,
  Tooltip,
  Fade,
  Paper,
  Button,
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
      sx={{
        backgroundColor: theme.palette.primary.main,
        boxShadow: theme.shadows[3],
        borderBottom: `1px solid ${theme.palette.primary.dark}`,
      }}
    >
      <Toolbar sx={styles.toolbarContainer}>
        {/* Logo and Title */}
        <Box sx={styles.logoContainer}>
          <img
            src={vsLogo}
            alt="VS Logo"
            style={{
              height: '36px',
              filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.2))',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: '#FFFFFF',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              ml: 1.5,
            }}
          >
            VectorShift
          </Typography>
        </Box>

        {/* Common Nodes */}
        <Box sx={styles.draggableNodesContainer}>
          <Tooltip
            title="Add Input Node"
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
          >
            <Box>
              <DraggableNode type="customInput" label="Input" />
            </Box>
          </Tooltip>

          <Tooltip
            title="Add Text Node"
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
          >
            <Box>
              <DraggableNode type="text" label="Text" />
            </Box>
          </Tooltip>

          <Tooltip
            title="Add LLM Node"
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
          >
            <Box>
              <DraggableNode type="llm" label="LLM" />
            </Box>
          </Tooltip>

          <Tooltip
            title="Add Output Node"
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
          >
            <Box>
              <DraggableNode type="customOutput" label="Output" />
            </Box>
          </Tooltip>

          {/* Specialized Nodes*/}
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative' }}>
              <Button
                variant="contained"
                onClick={handleToggle}
                endIcon={
                  <ExpandMoreIcon
                    sx={{
                      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                }
                sx={{
                  backgroundColor: open
                    ? theme.palette.secondary.main
                    : 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.3px',
                  boxShadow: open ? '0 4px 8px rgba(0, 0, 0, 0.15)' : 'none',
                  '&:hover': {
                    backgroundColor: open
                      ? theme.palette.secondary.dark
                      : theme.palette.secondary.main,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                Specialized Nodes
              </Button>
              {open && (
                <Fade in={open} timeout={300}>
                  <Paper
                    elevation={4}
                    sx={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      left: 0,
                      width: '100%',
                      backgroundColor: theme.palette.primary.light,
                      padding: '12px',
                      borderRadius: '12px',
                      zIndex: 10,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      border: `1px solid ${theme.palette.primary.dark}`,
                    }}
                  >
                    <DraggableNode type="date" label="Date Picker" />
                    <DraggableNode type="slider" label="Slider Value" />
                    <DraggableNode type="numberInput" label="Numeric Input" />
                    <DraggableNode type="dropdown" label="Parameter Type" />
                    <DraggableNode type="checkbox" label="Processing Options" />
                  </Paper>
                </Fade>
              )}
            </Box>
          </ClickAwayListener>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
