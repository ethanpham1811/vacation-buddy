import tripAdvisorHover from '@/assets/images/trip_advisor_hover.png'
import tripAdvisorLogo from '@/assets/images/trip_advisor_logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineExternalLink } from 'react-icons/hi'

type TFavoriteBtnProps = {
  web_url: string | undefined
  website: string | undefined
}

function ExternalBtns({ web_url, website }: TFavoriteBtnProps) {
  return (
    <div className="link absolute left-2 top-2 mt-1 flex flex-col gap-2 p-1 text-lg">
      {web_url && (
        <Link className="group/advisor-link rounded-full shadow-card" href={web_url} target="_blank">
          <Image
            src={tripAdvisorLogo}
            className="block transition-all group-hover/advisor-link:hidden"
            alt="trip advisor logo"
            width={35}
            height={35}
          />
          <Image
            src={tripAdvisorHover}
            className="hidden transition-all group-hover/advisor-link:block"
            alt="trip advisor hovered logo"
            width={35}
            height={35}
          />
        </Link>
      )}
      {website && (
        <Link
          href={website}
          target="_blank"
          className="flex items-center justify-center rounded-full bg-white object-center p-1 shadow-card hover:bg-blue-500 hover:text-white"
        >
          <HiOutlineExternalLink size={25} />
        </Link>
      )}
    </div>
  )
}

export default ExternalBtns
