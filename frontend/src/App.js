import { PipelineToolbar } from './pipeline/toolbar'
import { PipelineUI } from './pipeline/ui'
import { SubmitButton } from './pipeline/submit'

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  )
}

export default App
