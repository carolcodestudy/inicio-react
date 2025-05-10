import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../page/home'
import { CryptoCurrency } from '../page/crypto'
import { NotFound } from '../page/notfound'
import { Layout } from '../component/layout'

const exportRoutes = createBrowserRouter([
    {
        element : <Layout/>,
        children : [
            {
                path : '/',
                element : <Home/>
            },
            {
                path : '/crypto/:key',
                element : <CryptoCurrency/>
            },
            {
                path : '*',
                element : <NotFound/>
            }
        ]
    }
    
])

export {exportRoutes}