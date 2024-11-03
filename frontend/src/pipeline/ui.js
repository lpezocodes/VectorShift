// ui.js
import React, { useState, useRef, useCallback } from 'react'
import { Snackbar, Alert, Button } from '@mui/material'
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow'
import { useStore } from '../store'
import { shallow } from 'zustand/shallow'
import { InputNode } from '../nodes/inputNode'
import { LLMNode } from '../nodes/llmNode'
import { OutputNode } from '../nodes/outputNode'
import { TextNode } from '../nodes/textNode'
import { DropdownSelectorNode } from '../nodes/dropdownSelectorNode'
import { CheckboxNode } from '../nodes/checkboxNode'
import { SliderNode } from '../nodes/sliderNode'
import { NumberInputNode } from '../nodes/numberInputNode'
import { DateNode } from '../nodes/dateNode'
import DeleteIcon from '@mui/icons-material/Delete'

const gridSize = 20
const proOptions = { hideAttribution: true }
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  dropdown: DropdownSelectorNode,
  checkbox: CheckboxNode,
  slider: SliderNode,
  numberInput: NumberInputNode,
  date: DateNode,
}

const selector = state => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  clearAllNodesAndEdges: state.clearAllNodesAndEdges,
})

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [openError, setOpenError] = useState(false)
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    clearAllNodesAndEdges,
  } = useStore(selector, shallow)

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` }
    return nodeData
  }

  const onDrop = useCallback(
    event => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(
          event.dataTransfer.getData('application/reactflow')
        )
        const type = appData?.nodeType

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        })

        const nodeID = getNodeID(type)
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        }

        addNode(newNode)
      }
    },
    [addNode, getNodeID, reactFlowInstance]
  )

  const onDragOver = useCallback(event => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const handleDeleteAll = () => {
    // Check if there are any nodes
    if (nodes.length === 0) {
      setOpenError(true) // Show error snackbar if no nodes exist
    } else {
      setOpenConfirm(true) // Show confirmation snackbar if nodes exist
    }
  }

  const handleConfirmDelete = () => {
    clearAllNodesAndEdges()
    setOpenConfirm(false)
  }

  const handleCloseSnackbar = () => {
    setOpenConfirm(false)
    setOpenError(false)
  }

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: '100vw', height: '80vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
        >
          <Background color="#aaa" gap={gridSize} />
          <Controls
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ margin: 3 }}>
              <DeleteIcon
                onClick={handleDeleteAll}
                sx={{
                  fontSize: 15,
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'red',
                  },
                }}
              />
            </div>
          </Controls>

          <MiniMap />
        </ReactFlow>
      </div>
      <Snackbar
        open={openConfirm}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          severity="warning"
          action={
            <>
              <Button
                color="inherit"
                size="small"
                onClick={handleConfirmDelete}
                sx={{
                  '&:hover': {
                    color: 'red',
                  },
                }}
              >
                Confirm
              </Button>
              <Button
                color="inherit"
                size="small"
                onClick={handleCloseSnackbar}
              >
                Cancel
              </Button>
            </>
          }
        >
          <strong>Are you sure you want to delete the entire pipeline?</strong>
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert severity="error" onClose={handleCloseSnackbar}>
          <strong>No nodes exist to delete!</strong>
        </Alert>
      </Snackbar>
    </>
  )
}
