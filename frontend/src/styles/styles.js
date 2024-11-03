export const toolbarStyles = theme => ({
  toolbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    minHeight: '64px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  draggableNodesContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    justifyContent: 'center',
    flexGrow: 1,
  },
  commonNodeStyles: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    borderRadius: '8px',
    color: '#fff',
    padding: '8px 16px',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  iconButtonStyles: {
    color: '#fff',
    marginLeft: '5px',
    padding: 0,
    transition: 'transform 0.2s',
  },
  specializedNodesContainer: {
    position: 'relative',
    marginLeft: '16px',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: 0,
    alignItems: 'left',
    backgroundColor: '#1E2B3D',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 10,
    display: 'none',
    flexDirection: 'column',
    gap: '8px',
    minWidth: '200px',
  },
  dropdownVisible: {
    display: 'flex',
  },
  dragClone: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '16px',
    opacity: 0.8,
    backgroundColor: theme.palette.secondary.main,
    pointerEvents: 'none',
  },
  nodeContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    color: '#333',
    padding: '15px',
    borderRadius: '12px',
    width: '220px',
    border: '1px solid #E0E0E0',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },

  topbarStyles: {
    backgroundColor: theme.palette.secondary.main,
    padding: '10px',
    fontSize: '12px',
    borderRadius: '12px',
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  fieldContainer: {
    padding: '12px 0',
    color: 'black',
  },

  fieldWrapper: {
    marginBottom: '10px',
    borderRadius: '8px',
  },

  fieldLabel: {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#5f6368',
  },

  inputField: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #D1D1D1',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#F7F7F7',
  },

  deleteButton: {
    position: 'absolute',
    top: '50%',
    right: '8px',
    transform: 'translateY(-50%)',
    color: theme.palette.error.main,
    padding: '4px',
    '& .MuiSvgIcon-root': {
      fontSize: '16px',
    },
    '&:hover': {
      color: theme.palette.error.dark,
    },
  },
  textAreaField: {
    marginTop: '10px',
    marginBottom: '0px',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #D1D1D1',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#F7F7F7',
    resize: 'none',
    overflow: 'hidden',
    minHeight: '40px',
  },
  sliderFieldContainer: {
    marginTop: '15px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  sliderLabel: {
    fontSize: '14px',
    marginBottom: '8px',
    color: theme.palette.text.primary,
  },

  slider: {
    color: theme.palette.primary.main,
    width: '100%',
  },

  currentValueText: {
    marginTop: '10px',
    fontSize: '14px',
    color: theme.palette.text.secondary,
  },

  formattedMessageContainer: {
    textAlign: 'left',
    padding: '0',
    margin: '0',
  },
  successMessageTitle: {
    fontSize: '18px',
    display: 'block',
    marginBottom: '10px',
    color: '#4CAF50',
    textAlign: 'left',
  },
  pipelineAnalysisLabel: {
    position: 'relative',
    fontSize: '16px',
    display: 'block',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  pipelineAnalysisList: {
    paddingLeft: '20px',
    marginBottom: '0px',
    fontSize: '14px',
    textAlign: 'left',
  },
  pipelineAnalysisListItem: {
    marginBottom: '5px',
    textAlign: 'left',
  },
  snackbarPosition: {
    top: '80px !important',
    right: '15px !important',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '25px',
    fontSize: '14px',
    textTransform: 'none',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#388E3C',
    },
  },
})
