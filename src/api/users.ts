const baseURL = import.meta.env.VITE_SERVER_URL

export async function getUsersLikes(userId: number) {
    const res = await fetch(`${baseURL}/users/${userId}/likes`)
    if (!res.ok) throw new Error('Failed to fetch likes')
    return res.json()
}