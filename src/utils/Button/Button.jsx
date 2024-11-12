import Link from 'next/link'
import React from 'react'

import s from './Button.module.scss'; 
import { AnchorLink } from '../AnchorLink/AnchorLink';

export const ButtonMain = ({ link, text }) => {
  return (
    <Link scroll={false} href={link} className={`${s.button} ${s.mainButton}`}>
      <span className={s.bg} />
      {text}
    </Link>
  )
}

export const AnchorButtonMain = ({ link, text, ...rest }) => {
  return (
    <AnchorLink toSection={link} className={`${s.button} ${s.mainButton}`} {...rest}>
      <span className={s.bg} />
      {text}
    </AnchorLink>
  )
}

export const ButtonBlack = ({ link, text, ...rest }) => {
  return (
    <Link scroll={false} href={link} className={`${s.button} ${s.blackButton}`} {...rest}>
      <span className={s.bg} />
      {text}
    </Link>
  )
}

export const ButtonTransparent = ({ link, text, ...rest }) => {
  return (
    <Link scroll={false} href={link} className={`${s.button} ${s.transparentButton}`} {...rest}>
      <span className={s.bg} />
      {text}
    </Link>
  )
}
