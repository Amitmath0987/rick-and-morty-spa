import { useQuery } from '@tanstack/react-query'
import { getCharacters } from '../services/rickAndMortyApi'
import type { PaginatedCharactersResponse } from '../types/Character'

export const useCharactersQuery = (page: number) => {
  return useQuery<PaginatedCharactersResponse>({
    queryKey: ['characters', page],
    queryFn: () => getCharacters(page),
    // keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  })
}
