import { createBrowserRouter } from 'react-router-dom'
import { Home } from './page/home'
import { About } from './page/about'
import { Contact } from './page/contact'
import { Product } from './page/product'
import { NotFound } from './page/notfound' 
import { Layout } from './component/layout'

const exportRoutes = createBrowserRouter([
    {
        element : <Layout/>,
        children : [
            {
                path : '/',
                element : <Home/>
            },
            {
                path : '/about',
                element : <About/>
            },
            {
                path : '/contact',
                element : <Contact/>
            },
            {
                path : '/product/:key',
                element : <Product/>
            },
            {
                path : '*',
                element : <NotFound/>
            }
        ]
    }
])

export { exportRoutes }