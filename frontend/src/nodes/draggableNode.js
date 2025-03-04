// draggableNode.js
import React from 'react'
import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { toolbarStyles } from '../styles/styles'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'

export const DraggableNode = ({ type, label }) => {
  const theme = useTheme()
  const styles = toolbarStyles(theme)

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing'
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData))
    event.dataTransfer.effectAllowed = 'move'

    const dragClone = document.createElement('div')
    dragClone.textContent = label
    Object.assign(dragClone.style, {
      ...styles.dragClone,
      width: `${event.target.offsetWidth}px`,
      height: `${event.target.offsetHeight}px`,
      position: 'absolute',
      left: `${event.clientX}px`,
      top: `${event.clientY}px`,
      pointerEvents: 'none',
      padding: '10px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '500',
    })

    document.body.appendChild(dragClone)

    event.dataTransfer.setDragImage(
      dragClone,
      dragClone.offsetWidth / 2,
      dragClone.offsetHeight / 2
    )

    requestAnimationFrame(() => {
      document.body.removeChild(dragClone)
    })
  }

  return (
    <Box
      className={type}
      onDragStart={event => onDragStart(event, type)}
      onDragEnd={event => (event.target.style.cursor = 'grab')}
      sx={{
        ...styles.commonNodeStyles,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        cursor: 'grab',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: theme.palette.secondary.main,
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
        },
        '&:active': {
          cursor: 'grabbing',
          transform: 'translateY(-1px)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
      }}
      draggable
    >
      <DragIndicatorIcon fontSize="small" sx={{ opacity: 0.7 }} />
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {label}
      </Typography>
    </Box>
  )
}
