import { RouterProvider } from 'react-router-dom'
import { exportRoutes } from '../src/router'

function App() {

  return (
    <div>
      <RouterProvider router={exportRoutes}/>
    </div>
  )
}

export default App
