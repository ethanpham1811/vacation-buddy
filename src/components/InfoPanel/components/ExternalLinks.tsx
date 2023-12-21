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
          <Link href={web_url} className="link text-lg mt-1">
            <Image src={tripAdvisorLogo} alt="trip advisor logo" width={20} height={20} />
          </Link>
        )}
        {website && (
          <Link href={website} className="link text-lg mt-1">
            <HiOutlineExternalLink />
          </Link>
        )}
      </div>
      <Spacer />
    </>
  )
}

export default ExternalLinks
