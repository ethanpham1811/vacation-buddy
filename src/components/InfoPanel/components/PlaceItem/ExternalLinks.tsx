'use client'
import tripAdvisorLogo from '@/assets/images/trip_advisor_logo.png'
import { Spacer } from '@/components'
import { HiOutlineExternalLink } from '@/constants/icons'
import Image from 'next/image'
import Link from 'next/link'

function ExternalLinks({ web_url, website }: { web_url: string | undefined; website: string | undefined }) {
  return (
    <>
      <div className="flex items-center gap-2">
        {web_url && (
          <Link href={web_url} target="_blank" className="link mt-1 text-lg">
            <Image src={tripAdvisorLogo} alt="trip advisor logo" width={20} height={20} />
          </Link>
        )}
        {website && (
          <Link href={website} target="_blank" className="link mt-1 text-lg">
            <HiOutlineExternalLink />
          </Link>
        )}
      </div>
      <Spacer className="hidden lg:block" />
    </>
  )
}

export default ExternalLinks
