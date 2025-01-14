const baseURL = import.meta.env.VITE_SERVER_URL

export async function fetchMovies(page: number) {
    const res = await fetch(`${baseURL}/movies?page=${page}`)
    if (!res.ok) throw new Error('Failed to fetch movies')
    return res.json()
}

export async function fetchMovie(id: string) {
    const res = await fetch(`${baseURL}/movies/${id}`)
    if (!res.ok) throw new Error('Failed to fetch movie')
    return res.json()
}

export async function fetchMovieTrailers(id: string) {
  const res = await fetch(`${baseURL}/movies/${id}/trailers`)
  if (!res.ok) throw new Error('Failed to fetch movie trailers')
  return res.json()
}

export async function createLike({movieId, userId}: {movieId: string, userId: number}) {
    const res = await fetch(`${baseURL}/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ movieId, userId }),
    })
    if (!res.ok) throw new Error('Failed to like movie')
    return res.json()
}

export async function deleteLike({movieId, userId}: {movieId: string, userId: number}) {
    const res = await fetch(`${baseURL}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ movieId, userId }),
    })
  
    return res.json()
}