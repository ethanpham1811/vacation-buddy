import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xs: '450px'
      },
      boxShadow: {
        card: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        button: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
        inset: '0 0 10px 0 rgba(0,0,0,0.35)'
      },
      backgroundImage: {
        gradient: '-webkit-linear-gradient(left top, rgba(60, 64, 67, 0.3) 0%, rgb(37, 99, 235) 100%)'
      }
    }
  }
}
export default config
