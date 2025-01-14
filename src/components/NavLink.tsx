import { Link } from "@tanstack/react-router"
import { Link as ChakraLink } from "@chakra-ui/react"

type NavLinkProps = {
    to: string
    text: string
}

export default function NavLink({ to, text }: NavLinkProps) {
  return (
    <ChakraLink asChild color={{ base: '{colors.reactblue}', _dark: 'bg.inverted'}} fontSize={{ base: '1rem', md: '1.2rem'}}>
        <Link to={to}>{text}</Link>
    </ChakraLink>
  )
}
