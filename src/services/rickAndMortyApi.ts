import axios from 'axios'
import type { PaginatedCharactersResponse } from '../types/Character'

const API_BASE_URL = 'https://rickandmortyapi.com/api'

export const getCharacters = async (page: number): Promise<PaginatedCharactersResponse> => {
  const response = await axios.get(`${API_BASE_URL}/character`, {
    params: { page },
  })
  return response.data
}
