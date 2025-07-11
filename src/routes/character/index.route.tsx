import { Route } from '@tanstack/react-router'
import { rootRoute } from '../_layout/root.route'
import CharacterList from '../../pages/CharacterList'

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CharacterList,
})