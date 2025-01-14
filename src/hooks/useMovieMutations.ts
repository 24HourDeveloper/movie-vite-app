import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../main"
import { createLike, deleteLike } from "../api/movies"

export function useLikeMutation() {
    return useMutation({
        mutationFn: async (likedMovie: {movieId: string, userId: number}) => await createLike(likedMovie),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["movies"] })
        },
    })
}

export function useUnLikeMutation() {
    return useMutation({
        mutationFn: async (likeMovie: { movieId: string, userId: number }) => await deleteLike(likeMovie),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["movies"] })
        },
    })
}