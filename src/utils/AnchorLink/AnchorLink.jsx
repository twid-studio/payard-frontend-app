import { useScrollLenis } from '@/lib/providers/ScrollProvider/ScrollProvider';
import Link from 'next/link'
import React from 'react'

export const AnchorLink = ({ children, toSection, ...rest }) => {
  const { scrollTo } = useScrollLenis();

  const handlerScrollTo = (e) => {
    e.preventDefault();
    scrollTo(toSection);
  }

  return (
    <Link href={toSection} onClick={handlerScrollTo} {...rest}>
      {children}
    </Link>
  )
}