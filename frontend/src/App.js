import { PipelineToolbar } from './pipeline/toolbar'
import { PipelineUI } from './pipeline/ui'
import { SubmitButton } from './pipeline/submit'
import { Box, Container, ThemeProvider } from '@mui/material'
import theme from './styles/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          backgroundColor: theme.palette.background.default,
          overflow: 'hidden',
        }}
      >
        <PipelineToolbar />
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            flexGrow: 1,
            padding: 0,
            maxWidth: '100%',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'transparent',
          }}
        >
          <PipelineUI />
          <SubmitButton />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
