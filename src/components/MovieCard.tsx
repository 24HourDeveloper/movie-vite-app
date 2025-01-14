import { Card, Image } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import LikedButton from './LikedButton'

type MovieProps = {
    movie: {
        id: number
        title: string
        poster_path: string
        liked: boolean
    }
}

function MovieCard({ movie }: MovieProps) {
    const imgURL = import.meta.env.VITE_IMAGE_URL
    return (
        <Card.Root
            key={movie.id}
            overflow="hidden"
            w={{ base: '8rem', md: '10rem' }}
            variant={{ base: 'elevated', md: 'outline' }}
        >
        <Link
            key={movie.id}
            to={`/movies/$movieId`}
            params={{ movieId: movie.id }}
        >
            <Image
                alt={`${movie.title} poster`}
                src={`${imgURL}/w500${movie.poster_path}`}
            />
        </Link>
        <Card.Body paddingX="1.5" paddingY="1" textAlign="center">
            <Card.Title fontSize={{ base: '1rem', md: '1.2rem' }} truncate>
                {movie.title}
            </Card.Title>
        </Card.Body>
        <Card.Footer paddingX="1.5" paddingY="1">
            <LikedButton movie={movie} />
        </Card.Footer>
    </Card.Root>
  )
}

export default MovieCard