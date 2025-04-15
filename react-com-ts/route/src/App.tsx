import { RouterProvider } from 'react-router-dom'
import { exportRoutes } from './router'

import './App.css'

function App() {

  return (
      <div>
      <RouterProvider router={exportRoutes}/>
      </div>
      
  )
}

export default App
