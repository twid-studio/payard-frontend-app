import Image from "next/image";

export const Logo = ({ ...rest }) => (
  <Image
    src="/images/logo.svg"
    alt="logo"
    style={{ objectFit: "contain" }}
    width={210}
    height={47}
    priority
    {...rest}
  />
);

export const LogoWhite = ({ ...rest }) => (
  <Image
    src="/images/logo-white.svg"
    alt="logo"
    style={{ objectFit: "contain" }}
    width={210}
    height={47}
    priority
    {...rest}
  />
);
