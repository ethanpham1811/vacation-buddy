import Link from 'next/link'

function Logo() {
  return (
    <div className="flex flex-shrink-0 items-center">
      <Link href="/">
        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
      </Link>
    </div>
  )
}

export default Logo
