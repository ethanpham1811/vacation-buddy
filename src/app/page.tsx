export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const location = searchParams.location

  return <main className="flex min-h-screen flex-col bg-red-100"></main>
}
