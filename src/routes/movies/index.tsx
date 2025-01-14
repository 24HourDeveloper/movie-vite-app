import { useRef, useState, Fragment, UIEvent } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Text, Flex, Box, Spinner } from '@chakra-ui/react'
import MovieCard from '../../components/MovieCard'
import { fetchMovies } from '../../api/movies'
import { queryClient } from '../../main'

type MovieSearch = {
  page: number
}

export const Route = createFileRoute('/movies/')({
  component: Movies,
  validateSearch: (search: Record<string, unknown>): MovieSearch => {
    return {
      page: Number(search.page ?? 1),
    }
  },
})

function Movies() {
  const search = Route.useSearch()
  const { page } = search
  const [prevPage, setPrevPage] = useState(page)
  const navigate = useNavigate({ from: Route.fullPath })
  const loadMoreRef = useRef<HTMLButtonElement>(null)

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: async ({ pageParam = page }) => await fetchMovies(pageParam),
    initialPageParam: page,
    getNextPageParam: (lastPage) => lastPage.page + 1,
    getPreviousPageParam: () => prevPage - 1,
    //staleTime: 0,
  })

  const handlePageChange = () => {
    navigate({ search: (prev: MovieSearch) => ({ page: prev.page + 1 }) })
  }

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget

    if (
      scrollTop + clientHeight >= scrollHeight * 0.98 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage().then(() => handlePageChange())
    }

    if (
      scrollTop <= 0 &&
      prevPage > 1 &&
      hasPreviousPage &&
      !isFetchingPreviousPage
    ) {
      setPrevPage(prevPage - 1)
      fetchPreviousPage().then(() => {
        queryClient.setQueryData(['movies'], (prev: any) => {
          if (!prev) return

          const seenMovieIds = new Set()
          const deduplicatedPages = prev.pages.map((page: any) => ({
            ...page,
            results: page.results.filter((movie: any) => {
              if (seenMovieIds.has(movie.id)) {
                return false
              }
              seenMovieIds.add(movie.id)
              return true
            }),
          }))

          return {
            ...prev,
            pages: deduplicatedPages,
            pageParams: prev.pageParams,
          }
        })
      })
    }
  }

  if (status === 'pending') return <Text>Loading...</Text>
  if (status === 'error') return <Text>Error: {error.message}</Text>

  return (
    <>
      <Flex
        height="calc(100vh - 64px)"
        flexWrap="wrap"
        rowGap={{ base: 2, md: 4 }}
        pt={{ base: 2, md: 4 }}
        overflow="scroll"
        justifyContent="space-around"
        onScroll={handleScroll}
      >
        {data.pages.map((movie: any, index: number) => (
          <Fragment key={index}>
            {movie.results.map((movie: any) => (
              <MovieCard movie={movie} key={movie.id}/>
            ))}
          </Fragment>
        ))}
      </Flex>
      <Box ref={loadMoreRef} textAlign="center" mt={4}>
        {isFetchingNextPage && <Spinner />}
        {!hasNextPage && <Text>No more items to load</Text>}
      </Box>
    </>
  )
}
