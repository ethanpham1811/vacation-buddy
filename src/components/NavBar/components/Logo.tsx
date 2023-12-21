import logo from '@/assets/images/logo.png'
import Image from 'next/image'
import Link from 'next/link'

function Logo() {
  return (
    <div className="flex flex-shrink-0 items-center">
      <Link href="/">
        <Image width={40} height={40} src={logo} alt="Vacation Buddy Logo" />
      </Link>
    </div>
  )
}

export default Logo
