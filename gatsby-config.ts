import type { GatsbyConfig } from "gatsby"
import dotenv from 'dotenv'

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
})

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://www.shopicsv.app/`,
  },
  plugins: [],
}

export default config
