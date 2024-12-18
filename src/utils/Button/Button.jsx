import Link from 'next/link'
import React from 'react'

import s from './Button.module.scss'; 
import { AnchorLink } from '../AnchorLink/AnchorLink';

export const ButtonMain = ({ link, text, addClass }) => {
  return (
    <Link scroll={false} href={link} className={`${s.button} ${s.mainButton} ${addClass}`}>
      <span className={s.bg} />
      {text}
    </Link>
  )
}

export const AnchorButtonMain = ({ link, text, addClass, ...rest }) => {
  return (
    <AnchorLink toSection={link} className={`${s.button} ${s.mainButton} ${addClass}`} {...rest}>
      <span className={s.bg} />
      {text}
    </AnchorLink>
  )
}

export const ButtonBlack = ({ link, text, addClass, ...rest }) => {
  return (
    <Link scroll={false} href={link} className={`${s.button} ${s.blackButton} ${addClass}`} {...rest}>
      <span className={s.bg} />
      {text}
    </Link>
  )
}

export const ButtonTransparent = ({ link, text, addClass, ...rest }) => {
  return (
    <Link scroll={false} href={link} className={`${s.button} ${s.transparentButton} ${addClass}`} {...rest}>
      <span className={s.bg} />
      {text}
    </Link>
  )
}
