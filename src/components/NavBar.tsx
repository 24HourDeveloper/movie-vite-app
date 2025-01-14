import { Flex, Box } from "@chakra-ui/react"
import { ColorModeButton } from "./ui/color-mode"
import NavLink from "./NavLink"

export default function NavBar() {
  return (
    <Box
        py={2}
        as="nav"
        left={0}
        right={0}
        zIndex={99}
        bottom={{ base: 0}}
        position={{ base: "fixed", md: 'static'}}
        borderBottom={{ base: 'none', md: '1px solid {colors.reactblue}', _dark: '1px solid white'}}
    >
        <Flex
            px={10}
            alignItems="center"
            gap={{ base: 10 }}
            justifyContent={{ base: 'center', md: 'space-between'}}
        >
            <Flex gap={10} alignItems="center">
                <ColorModeButton color={{ base: '{colors.reactblue}', _dark: 'bg.inverted'}}/>
                <NavLink to="/movies" text="Home"/>
                <NavLink to="/movies" text="Movies"/>
            </Flex>
            <NavLink to="/profile/1" text="Profile"/>
        </Flex>
    </Box>
  )
}
