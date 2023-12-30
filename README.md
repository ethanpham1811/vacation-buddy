# Trip advisor app

![Vacation Buddy](public/preview.png)

# NextJs (App router) + Redux (thunk) + Leaflet + Tailwind

## Demo

You can find the [live demo](https://vacation-buddy.vercel.app/) here

## Technical recap

> 100% [TailwindCss](https://tailwindcss.com/docs).
> NextJS [App router](https://nextjs.org/docs/app).
> Leaflet Map provider [Leaflet React](https://react-leaflet.js.org/).
> Core FE framework [ReactJS 18](https://react.dev/learn).
> Production is deployed on [Vercel](https://vercel.com/).

## Getting Started

### Retrieve Rapid API key:

- subscribe to travel-advisor: https://rapidapi.com/apidojo/api/travel-advisor/
- Store key under .env keys: [RAPID_API_KEY]

### Install dependencies:

```bash
npm
#or
yarn
```

### Run dev:

```bash
npm run dev
#or
yarn dev
```

### Build & run prod:

```bash
npm run build
npm run start

#or

yarn build
yarn start
```

Navigate [http://localhost:3000](http://localhost:3000) (Both Dev & Prod)

## Environments

Private (server only):

```bash
RAPID_API_KEY
```

## Typescript & linting

### Compile typescript

> Typescript validation won't be triggered on dev mode, please build before pushing to repository.

```bash
npm run build
# or
yarn build
```

### Linting

> Add this comment on top of the next line you want ignore eslint just in case
> `// eslint-disable-next-line <lint>`

```bash
npm run lint
# or
yarn lint
```

### Unit tests (Jest/Testing library)

** coming soon **

## End-to-end tests (Cypress/Playwright)

** coming soon **

## Crossbrowsers support

|         |     |
| ------- | --: |
| Chrome  |  20 |
| Firefox |  28 |
| Safari  | 6.1 |
| Edge    |  12 |
| IE      |  11 |
| Opera   |  12 |

## Packages & Dependencies

### Global dependencies

|                              |         |
| ---------------------------- | ------- |
| [Node](https://nodejs.org/)  | 18.17.0 |
| [Yarn](https://yarnpkg.com/) | 1.12.19 |

### Dependencies

|                      |        |
| -------------------- | -----: |
| @headlessui/react    | 1.7.17 |
| @heroicons/react     |  2.1.1 |
| @reduxjs/toolkit     |  2.0.1 |
| clsx                 |  2.1.0 |
| leaflet              |  1.9.4 |
| next                 | 13.5.6 |
| next-usequerystate   | 1.13.2 |
| next                 | 14.0.3 |
| react                | 18.2.0 |
| react-icons          | 4.12.0 |
| react-leaflet        |  4.2.1 |
| react-lines-ellipsis | 0.15.4 |
| react-redux          |  9.0.4 |
| react-spinners       | 0.13.8 |
| supercluster         |  7.0.0 |
| tailwind-merge       |  2.1.0 |
| use-supercluster     |   0.2. |

### Dev dependencies

|                             |        |
| --------------------------- | -----: |
| eslint                      |  8.0.0 |
| typescript                  |  5.0.0 |
| tailwindcss                 |  3.3.0 |
| eslint-config-prettier      |  9.1.0 |
| eslint-plugin-prettier      |  5.1.2 |
| husky                       |  8.0.3 |
| lint-staged                 | 15.2.0 |
| postcss                     |      8 |
| prettier                    |  3.1.1 |
| prettier-plugin-tailwindcss | 0.5.10 |

## Maintenance

** coming soon **

## Technical tips

** coming soon **

## Further help

To get more help on deploying this, please contact me via [email] (ethanpham.etev@gmail.com)
