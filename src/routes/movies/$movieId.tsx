import { createFileRoute } from '@tanstack/react-router'
import { Image, Box, Heading, Text, Flex } from '@chakra-ui/react'
import { fetchMovie, fetchMovieTrailers } from '../../api/movies'
import { formatRuntime, formatDate } from '../../util/formats'

type Trailer = {
  key: string
  type: string
}

export const Route = createFileRoute('/movies/$movieId')({
  component: Movie,
  loader: async ({ params }) => {
    try {
      const [movie, trailers] = await Promise.all([
        fetchMovie(params.movieId),
        fetchMovieTrailers(params.movieId)
      ]);
      return { movie, trailers };
    } catch (error) {
      console.error('Error fetching movie and trailers:', error);
      throw new Response('Failed to load movie data', { status: 500 });
    }
  }
})

function Movie() {
  const {movie, trailers} = Route.useLoaderData()
  const onlyTrailers = trailers.results.filter((trailer: Trailer) => trailer.type === 'Trailer')
  const runtime = formatRuntime(movie.runtime)
  const imgURL = import.meta.env.VITE_IMAGE_URL

  if (!movie) {
    return <p>Loading...</p>;
  }

  return(
    <Box pos="relative" display="flex" justifyContent="center">
      <Image
        alt={`${movie.title} poster`}
        src={`${imgURL}/original${movie.backdrop_path}`}
        h="calc(100vh - 56px)"
      />
      <Box
        rounded="lg"
        display="flex"
        pos="absolute"
        bg="rgba(0, 0, 0, 0.8)"
        w={{ base: '100%', md: '90%'}}
        gap={{ base: 4, md: 0, lg: 0}}
        top={{ base: '15%', md: '30%'}}
        flexDirection={{ base: 'column', md: 'row'}}
      >
        <Box
          display="flex"
          flexDirection="column"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          px={{ base: 2, md: 6}}
          gap={{ base: 4, md: 6}}
          w={{ base: '100%', md: '40%'}}
        >
          <Heading color="whitesmoke" textAlign="center">
            {movie.title}
          </Heading>
          <Text color="whitesmoke">
            {movie.overview}
          </Text>
          <Flex gap={4}>
            <Text color="whitesmoke">
              Released: {formatDate(movie.release_date)}
            </Text>
            <Text color="whitesmoke">
              Runtime: {runtime}
            </Text>
          </Flex>
        </Box>
        {
          onlyTrailers.length === 0 ? (
            null
          ) : (
            <Box w={{ base: '100%', md: '60%'}}>
              <Box as="iframe"
                width="100%"
                height={{ base: '300px', md: '400px'}}
                // @ts-ignore
                src={`https://www.youtube.com/embed/${onlyTrailers[0].key}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                rounded={{ base: 'none', md: 'lg'}}
              ></Box>
            </Box>
          )
        }
       
      </Box>
    </Box>
  )
}
