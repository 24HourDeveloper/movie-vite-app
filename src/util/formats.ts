export function formatRuntime(runtime: number) {
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  return `${hours}h ${minutes}m`
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  const options = { month: "short", day: "numeric", year: "numeric" }
  // @ts-ignore
  return new Intl.DateTimeFormat("en-US", options).format(date)
}