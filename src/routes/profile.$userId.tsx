import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Text, Heading, Flex, Stack } from '@chakra-ui/react'
import { getUsersLikes } from '../api/users'
import MovieCard from '../components/MovieCard'
import { Avatar } from "../components/ui/avatar"

export const Route = createFileRoute('/profile/$userId')({
  component: Profile,
})

function Profile() {
  const { userId } = Route.useParams()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => await getUsersLikes(userId),
  })

  if (isLoading) return <Text>Loading...</Text>
  if (isError) return <Text>Error: {error.message}</Text>

  return (
    <Stack justifyContent="space-between" h="calc(100vh - 56px)" p={8}>
      <Stack alignItems="center">
        <Flex w={{ base: '96%', md: "90%"}} gap={4} alignItems="center">
          <Avatar name="Michael Moore" variant="solid" w={150} h={150} size="2xl" />
          <Stack>
            <Text color="{colors.reactblue}" _dark={{ color: 'white'}}>{data.name}</Text>
            <Text color="{colors.reactblue}" _dark={{ color: 'white'}}>{data.email}</Text>
          </Stack>
        </Flex>
      </Stack>
      <Stack>  
        <Heading textAlign="center" color="{colors.reactblue}" _dark={{ color: 'white'}}>Liked Movies</Heading>
        <Flex justifyContent="center">
          <Flex
            p={2}
            w={{ base: '96%', md: "90%"}}
            gap={4}
            rounded="lg"
            overflowX="auto"
            border={{ base: "2px solid {colors.reactblue}", _dark: "2px solid white"}}
          >
            {data.likes.map((movie: any) => (
              <Flex key={movie.id}>
                <MovieCard key={movie.id} movie={movie} />
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Stack>
    </Stack>
  )
}
