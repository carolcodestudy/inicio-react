import { createBrowserRouter } from 'react-router-dom'

import { Layout } from './component/layout'
import { Home } from './pages/home'
import { Basket } from './pages/basket'

const route = createBrowserRouter([
    {
      element : <Layout/>,
      children : [
        {
          path : '/',
          element : <Home/>
        },
        {
          path : '/basket',
          element : <Basket/>
        }
      ]
    }
])

export {route}