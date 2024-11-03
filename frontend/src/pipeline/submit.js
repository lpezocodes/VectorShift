import React, { useState } from 'react'
import { Button, Snackbar, Alert, Typography } from '@mui/material'
import { useStore } from '../store'
import axios from 'axios'
import { toolbarStyles } from '../styles/styles'
import { useTheme } from '@mui/material/styles'

export const SubmitButton = () => {
  const theme = useTheme()
  const styles = toolbarStyles(theme)

  const { nodes, edges } = useStore(state => ({
    nodes: state.nodes,
    edges: state.edges,
  }))

  const [open, setOpen] = useState(false)
  const [formattedMessage, setFormattedMessage] = useState('')
  const [severity, setSeverity] = useState('success')

  const handleSubmit = async () => {
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

      const { num_nodes, num_edges, is_dag } = data

      const formattedMsg = (
        <Typography component="span" sx={styles.formattedMessageContainer}>
          <Typography
            variant="h6"
            sx={styles.successMessageTitle}
            component="strong"
          >
            Success!
          </Typography>
          <Typography
            variant="body1"
            sx={styles.pipelineAnalysisLabel}
            component="label"
          >
            Pipeline Analysis
          </Typography>
          <ul sx={styles.pipelineAnalysisList}>
            <li sx={styles.pipelineAnalysisListItem}>
              <strong>Nodes:</strong> {num_nodes}
            </li>
            <li sx={styles.pipelineAnalysisListItem}>
              <strong>Edges:</strong> {num_edges}
            </li>
            <li sx={styles.pipelineAnalysisListItem}>
              <strong>Is DAG?:</strong> {is_dag ? 'Yes' : 'No'}
            </li>
          </ul>
        </Typography>
      )

      setFormattedMessage(formattedMsg)
      setSeverity('success')
      setOpen(true)
    } catch (error) {
      console.error('Error submitting pipeline:', error)
      setFormattedMessage('Failed to analyze the pipeline. Please try again.')
      setSeverity('error')
      setOpen(true)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const isConnected = nodes.length >= 2 && edges.length >= 1

  return (
    <>
      {isConnected && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={styles.submitButton}
          >
            Shift it!
          </Button>
        </div>
      )}

      {/* Snackbar Notification */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={styles.snackbarPosition}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {formattedMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
