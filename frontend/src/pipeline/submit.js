import React, { useState } from 'react'
import {
  Button,
  Snackbar,
  Alert,
  Typography,
  Box,
  Zoom,
  IconButton,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CloseIcon from '@mui/icons-material/Close'
import { useStore } from '../store'
import axios from 'axios'

export const SubmitButton = () => {
  const { nodes, edges } = useStore(state => ({
    nodes: state.nodes,
    edges: state.edges,
  }))

  const [openSuccess, setOpenSuccess] = useState(false)
  const [openError, setOpenError] = useState(false)
  const [formattedMessage, setFormattedMessage] = useState('')
  const [severity, setSeverity] = useState('success')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const payload = {
      nodes: nodes.map(node => node.id),
      edges: edges.map(edge => ({
        source: edge.source,
        target: edge.target,
      })),
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/pipelines/parse`,
        payload
      )

      setTimeout(() => {
        setLoading(false)

        if (data.error) {
          setFormattedMessage(data.error)
          setSeverity('error')
          setOpenError(true)
        } else {
          const { num_nodes, num_edges, is_dag } = data
          setFormattedMessage({ num_nodes, num_edges, is_dag })
          setSeverity('success')
          setOpenSuccess(true)
        }
      }, 600) // Add a small delay for better UX
    } catch (error) {
      console.error('Error submitting pipeline:', error)
      setFormattedMessage('Failed to analyze the pipeline. Please try again.')
      setSeverity('error')
      setOpenError(true)
      setLoading(false)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSuccess(false)
    setOpenError(false)
  }

  const isConnected = nodes.length >= 2 && edges.length >= 1

  if (!isConnected) return null

  return (
    <>
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
        endIcon={<SendIcon />}
        sx={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 999,
          backgroundColor: '#4caf50',
          color: '#fff',
          padding: '10px 24px',
          borderRadius: '10px',
          fontWeight: 500,
          letterSpacing: '0.3px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          transition: 'none',
          '&:hover': {
            backgroundColor: '#4caf50',
            transform: 'translateX(-50%)',
          },
          '&:active': {
            backgroundColor: '#4caf50',
            transform: 'translateX(-50%)',
          },
          '& .MuiTouchRipple-root': {
            display: 'none',
          },
        }}
      >
        {loading ? 'Processing...' : 'Shift it!'}
      </Button>

      {/* Success Notification */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={Zoom}
        sx={{
          marginTop: '70px', // Position below the toolbar
          '& .MuiPaper-root': {
            borderRadius: '10px',
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            color: '#1a1a1a',
            borderRadius: '10px',
            padding: '16px',
            width: '280px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e0e0e0',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <CheckCircleOutlineIcon
              sx={{
                mr: 1,
                fontSize: 20,
                color: '#4caf50',
              }}
            />
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                fontWeight: 600,
                fontSize: '15px',
                color: '#4caf50',
              }}
            >
              Pipeline Analysis
            </Typography>
            <IconButton
              size="small"
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: '8px',
                top: '8px',
                padding: '4px',
                color: '#757575',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {typeof formattedMessage === 'object' && (
            <Box sx={{ mt: 1, fontSize: '14px' }}>
              <Typography
                variant="body2"
                component="div"
                sx={{
                  mb: 0.75,
                  color: '#424242',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span style={{ fontWeight: 500 }}>Nodes:</span>{' '}
                {formattedMessage.num_nodes}
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{
                  mb: 0.75,
                  color: '#424242',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span style={{ fontWeight: 500 }}>Edges:</span>{' '}
                {formattedMessage.num_edges}
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{
                  color: '#424242',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span style={{ fontWeight: 500 }}>Is DAG?:</span>{' '}
                {formattedMessage.is_dag ? 'Yes' : 'No'}
              </Typography>
            </Box>
          )}
        </Box>
      </Snackbar>

      {/* Error Notification */}
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          marginTop: '70px',
        }}
        TransitionComponent={Zoom}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          elevation={6}
          sx={{
            width: '100%',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        >
          {typeof formattedMessage === 'string'
            ? formattedMessage
            : 'An error occurred'}
        </Alert>
      </Snackbar>
    </>
  )
}
