import type { Config } from 'tailwindcss'

import plugin from 'tailwindcss/plugin'

const utilityPlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible'
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden'
    },
    '.pseudo-circle-bg': {
      padding: '2rem',
      'border-radius': '9999px',
      'background-color': '#ccc',
      'z-index': '-1',
      position: 'absolute',
      'backdrop-filter ': 'blur(4px)'
    }
  })
})

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xs: '600px'
      },
      colors: {
        main: 'var(--main-color)',
        secondary: 'var(--secondary-color)',
        chatBox: 'var(--chatBox-color)',
        hoverMain: 'var(--hoverMain-color)',
        btnHover: 'var(--btnHover-color',
        darkGray: 'var(--darkGray-color)',
        blackOverlay: 'var(--blackOverlay-color)',
        feed: 'var(--feed-color)',
        active: 'var(--active-color)',
        offline: 'var(--offline-color)',
        away: 'var(--away-color)',
        busy: 'var(--busy-color)',
        danger: 'var(--danger-color)',
        success: 'var(--success-color)',
        icon: 'var(--icon-color)',
        genderMale: 'var(--genderMale-color)',
        genderFemale: 'var(--genderFemale-color)',
        fb: 'var(--fb-color)',
        twitter: 'var(--twitter-color)',
        insta: 'var(--insta-color)'
      },
      boxShadow: {
        card: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        button: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
        innerChatBox: 'inset 0 32px 32px -32px rgb(0 0 0 / 8%), inset 0 -32px 32px -32px rgb(0 0 0 / 8%)',
        message: '0 0 32px rgb(0 0 0 / 8%), 0rem 16px 16px -16px rgb(0 0 0 / 10%)'
      },
      margin: {
        320: '320px'
      },

      width: {
        190: '190px',
        275: '275px',
        300: '300px',
        340: '340px',
        350: '350px',
        656: '656px',
        880: '880px',
        508: '508px'
      },
      height: {
        80: '80px',
        340: '340px',
        370: '370px',
        420: '420px',
        510: '510px',
        600: '600px',
        685: '685px',
        800: '800px',
        '90vh': '90vh'
      },
      backgroundSize: {
        50: '50%'
      },
      flex: {
        0.7: '0.7 1 0%'
      },
      maxHeight: {
        370: '370px'
      },
      minWidth: {
        210: '210px',
        350: '350px',
        620: '620px'
      },
      textColor: {
        lightGray: '#F1EFEE',
        primary: '#FAFAFA',
        secColor: '#efefef',
        navColor: '#BEBEBE'
      },
      keyframes: {
        'slide-in': {
          '0%': {
            '-webkit-transform': 'translateX(-200px)',
            transform: 'translateX(-200px)'
          },
          '100%': {
            '-webkit-transform': 'translateX(0px)',
            transform: 'translateX(0px)'
          }
        },

        'slide-fwd': {
          '0%': {
            '-webkit-transform': 'translateZ(0px)',
            transform: 'translateZ(0px)'
          },
          '100%': {
            '-webkit-transform': 'translateZ(160px)',
            transform: 'translateZ(160px)'
          }
        }
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
        'slide-fwd': ' slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)'
      },
      transitionProperty: {
        height: 'height'
      }
    },
    cursor: {
      'zoom-in': 'zoom-in',
      pointer: 'pointer'
    }
  },
  plugins: [utilityPlugin]
}
export default config
