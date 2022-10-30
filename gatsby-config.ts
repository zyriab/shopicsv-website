import type { GatsbyConfig } from 'gatsby';
import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: `ShopiCSV - Time to ditch Excel`,
    description: `An awesome and non-intrusive business-oriented SaaS especially crafted to edit Shopify's CSV files without destroying your shop while maximizing your productivity`,
    image: `/logo.svg`,
    siteUrl: `https://www.shopicsv.app/`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'ShopiCSV - Time to ditch Excel',
        short_name: 'ShopiCSV',
        start_url: '/',
        background_color: '#f6f6f7',
        theme_color: '#178b6e',
        display: 'standalone',
        icon: 'src/images/favicon.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};

export default config;
