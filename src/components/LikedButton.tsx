import { Button } from '@chakra-ui/react'
import { useUnLikeMutation, useLikeMutation } from '../hooks/useMovieMutations'
import { queryClient } from '../main'

type MovieProps = {
  movie: {
    id: number
    title: string
    poster_path: string
    liked: boolean
  }
}

export default function LikedButton({ movie }: MovieProps) {
  const likeMutation = useLikeMutation()
  const unlikeMutation = useUnLikeMutation()

  const handleLike = () => likeMutation.mutate({ movieId: `${movie.id}`, userId: 1 })
  const handleUnlike = () => unlikeMutation.mutate({ movieId: `${movie.id}`, userId: 1 }, { onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["profile"]})
  }})
  return (
    <Button
      bg={movie.liked ? '{colors.reactblue}' : 'solid'}
      fontSize={{ base: '1rem', md: '1.4rem' }}
      w={{ base: '100%', md: '100%', lg: '50%' }}
      onClick={() =>  movie.liked ? handleUnlike() : handleLike()}
      disabled={movie.liked ? unlikeMutation.isPending : likeMutation.isPending}
    >
      {movie.liked ? 'Liked' : 'Like'}
    </Button>
  )
}
