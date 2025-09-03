import { useScrollLenis } from '@/lib/providers/ScrollProvider/ScrollProvider';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

export const AnchorLink = ({ children, toSection, page, ...rest }) => {
  const { scrollTo } = useScrollLenis();
  const pathname = usePathname();

  const handlerScrollTo = (e) => {
    e.preventDefault();
    scrollTo(toSection);
  }

  const handlerLinkScrollTo = () => {
    if(toSection) {
      setTimeout(() => {
        scrollTo(toSection);
      }, 2400)
    }
  }

  return (page && pathname !== page) ? (
    <Link href={page} onClick={handlerLinkScrollTo} scroll={true} {...rest}>
      {children}
    </Link>
  ) : (
    <Link href={toSection || "/"} onClick={handlerScrollTo} {...rest}>
      {children}
    </Link>
  )
}
