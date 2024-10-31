import Link from 'next/link'
import React from 'react'

import s from './Button.module.scss'; 

export const ButtonMain = ({ link, text }) => {
  return (
    <Link href={link} className={`${s.button} ${s.mainButton}`}>
      {text}
    </Link>
  )
}

export const ButtonBlack = ({ link, text }) => {
  return (
    <Link href={link} className={`${s.button} ${s.blackButton}`}>
      {text}
    </Link>
  )
}

export const ButtonTransparent = ({ link, text }) => {
  return (
    <Link href={link} className={`${s.button} ${s.transparentButton}`}>
      {text}
    </Link>
  )
}
