import { createFileRoute } from '@tanstack/react-router'
import { Heading, Flex } from '@chakra-ui/react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Flex justifyContent="center" alignItems="center" h='90vh'>
      <Heading size={{ base: '3xl', md: '4xl', lg: '6xl'}}>Page is under contruction.</Heading>
    </Flex>
  )
}
