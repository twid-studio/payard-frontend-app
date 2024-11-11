import Link from 'next/link'
import React from 'react'

import s from './Button.module.scss'; 

export const ButtonMain = ({ link, text }) => {
  return (
    <Link scroll={false} href={link} className={`${s.button} ${s.mainButton}`}>
      <span className={s.bg} />
      {text}
    </Link>
  )
}

export const ButtonBlack = ({ link, text }) => {
  return (
    <Link scroll={false} href={link} className={`${s.button} ${s.blackButton}`}>
      <span className={s.bg} />
      {text}
    </Link>
  )
}

export const ButtonTransparent = ({ link, text }) => {
  return (
    <Link scroll={false} href={link} className={`${s.button} ${s.transparentButton}`}>
      <span className={s.bg} />
      {text}
    </Link>
  )
}
