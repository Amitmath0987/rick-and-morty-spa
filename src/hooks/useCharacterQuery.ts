import { useQuery } from "@tanstack/react-query";
import { getCharacterById } from "../services/rickAndMortyApi";
import type { Character } from "../types/Character";

export const useCharacterQuery = (id: string) => {
  return useQuery<Character>({
    queryKey: ["characters", id],
    queryFn: () => getCharacterById(id),
    // keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
};
