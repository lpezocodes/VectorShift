import React from 'react'
import { Button } from '@mui/material'
import { useStore } from './store'
import axios from 'axios'

export const SubmitButton = () => {
  const { nodes, edges } = useStore(state => ({
    nodes: state.nodes,
    edges: state.edges,
  }))

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

      alert(
        `Pipeline Analysis:\nNodes: ${num_nodes}\nEdges: ${num_edges}\nIs DAG: ${
          is_dag ? 'Yes' : 'No'
        }`
      )
    } catch (error) {
      console.error('Error submitting pipeline:', error)
      alert('Failed to analyze the pipeline. Please try again.')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  )
}
