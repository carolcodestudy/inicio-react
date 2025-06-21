import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { route } from './App'
import CartContext from './context'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartContext >
      <Toaster position='top-center' reverseOrder={false}/>
      <RouterProvider router={route}/>
    </CartContext>
  </StrictMode>,
)
