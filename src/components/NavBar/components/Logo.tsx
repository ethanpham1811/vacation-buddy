'use client'
import logo from '@/assets/images/logo.png'
import Image from 'next/image'

function Logo() {
  return (
    <div className="flex flex-shrink-0 items-center gap-4">
      <Image priority width={40} height={40} src={logo} alt="Vacation Buddy Logo" />
      <div className="text-white font-bold hidden lg:block">VACATION BUDDY</div>
    </div>
  )
}

export default Logo
