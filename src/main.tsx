import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './route'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <TanStackRouterDevtools /> */}
    </QueryClientProvider>
  </StrictMode>,
)
