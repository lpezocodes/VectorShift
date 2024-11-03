// draggableNode.js
import React from 'react'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { toolbarStyles } from '../styles/styles'

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
      sx={styles.commonNodeStyles}
      draggable
    >
      {label}
    </Box>
  )
}
