import { createBrowserRouter } from 'react-router-dom'

import { Layout } from './component/layout'
import { Home } from './pages/home'
import { Basket } from './pages/basket'
import { Product } from './pages/product'

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
        },
        {
          //Precisa passar o mesmo nome do parametro do path onde quiser buscar esse parametro
          path : '/product/:id',
          element : <Product/>
        }
      ]
    }
])

export {route}