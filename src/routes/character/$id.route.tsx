import { Route } from '@tanstack/react-router'
import { rootRoute } from '../_layout/root.route'
import CharacterDetail from '../../pages/CharacterDetail'

export const characterRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'character/$id',
  component: CharacterDetail,
})
