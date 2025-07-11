import { createRootRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'

export const rootRoute = createRootRoute({
  component: () => (
    <div>
      <h1>Rick & Morty Character Browser</h1>
      <Outlet />
    </div>
  ),
})
