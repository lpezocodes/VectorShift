// ui.js
import React, { useState, useRef, useCallback } from 'react'
import { Snackbar, Alert, Button, Tooltip, Fade } from '@mui/material'
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
import { useTheme } from '@mui/material/styles'

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
  const theme = useTheme()
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
      <div
        ref={reactFlowWrapper}
        style={{
          width: '100%',
          height: 'calc(100vh - 150px)',
          position: 'relative',
          backgroundColor: 'transparent',
        }}
      >
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
          defaultEdgeOptions={{
            style: { stroke: theme.palette.secondary.main, strokeWidth: 2 },
            animated: true,
          }}
          style={{ backgroundColor: 'transparent' }}
        >
          <Background
            color={theme.palette.primary.light}
            gap={gridSize}
            size={1.5}
            variant="dots"
            style={{ opacity: 0.4 }}
          />

          <Controls
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            }}
            showInteractive={false}
          >
            <Tooltip
              title="Delete all nodes"
              arrow
              placement="right"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <DeleteIcon
                onClick={handleDeleteAll}
                sx={{
                  fontSize: 18,
                  cursor: 'pointer',
                  color: theme.palette.error.main,
                  opacity: 0.7,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    opacity: 1,
                    transform: 'scale(1.1)',
                  },
                }}
              />
            </Tooltip>
          </Controls>

          <MiniMap
            nodeStrokeColor={node => {
              return theme.palette.primary.main
            }}
            nodeColor={node => {
              return theme.palette.secondary.light
            }}
            nodeBorderRadius={8}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              border: `1px solid ${theme.palette.primary.light}`,
              borderRadius: '8px',
            }}
            zoomable
            pannable
          />
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
                    color: theme.palette.error.main,
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
