import { createSystem, defineConfig, mergeConfigs, defaultConfig } from "@chakra-ui/react"

const config = defineConfig({
    theme: {
      tokens: {
        colors: {
          reactblue: { value: "#087ea4" },
        },
      },
      semanticTokens: {
        colors: {
          danger: { value: "{colors.red}" },
        },
      },
      layerStyles: {
        base: {
          bg: "red.500",
        },
      },
    },
  })

  const theme = mergeConfigs(defaultConfig, config)
  
  export default createSystem(theme)