import { animate } from "framer-motion";

export const anim = (variants) => {
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants,
  };
};

const ease1 = [0.88, 0.05, 0.1, 0.97];
const ease2 = [0.23, 0.7, 0.23, 0.72];
const ease3 = [0.7, 0.2, 0.7, 0.9];

export const MenuAnim = {
  bg: {
    initial: {
      backdropFilter: "blur(0vw)",
    },
    animate: {
      backdropFilter: "blur(6vw)",
      transition: {
        ease: ease3,
        duration: 0.5,
      },
    },
    exit: {
      backdropFilter: "blur(0vw)",
      transition: {
        ease: ease2,
        duration: 0.5,
        delay: 0.5,
      },
    },
  },
  menuBody: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        ease: ease3,
        duration: 0.2,
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        ease: ease3,
        duration: 0.3,
        delay: 0.5,
      },
    },
  },
  links: {
    initial: {
      opacity: 0,
      filter: "blur(1vw)",
      transition: {
        ease: [0.88, 0.05, 0.1, 0.97],
        duration: 1,
        delay: 1,
      },
    },
    animate: (i) => ({
      opacity: 1,
      filter: "blur(0vw)",
      transition: { 
        duration: .5,
        ease: ease2,
        delay: (i + 1) * 0.15
      },
    }),
    exit: {
      opacity: 0,
      filter: "blur(1vw)",
      transition: {
        ease: [0.88, 0.05, 0.1, 0.97],
        duration: 0.6,
      },
    },
  },
};

export const TitleAnim = {
  initial: {
    y: "80%",
    clipPath: "inset(0% 0% 100% 0%)"
  },
  animate: {
    y: "0%",
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      ease: ease3,
      duration: 0.5,
      delay: 0.5,
    },
  },
  exit: {
    y: "80%",
    clipPath: "inset(0% 0% 100% 0%)",
    transition: {
      ease: ease2,
      duration: 0.5,
      delay: 0.5,
    },
  },
}

export const ContactAnim = {
  sucess: {
    initial: {
      scale: .95,
      filter: "blur(1vw)",
      opacity: 0,
    },
    animate: {
      scale: 1,
      filter: "blur(0vw)",
      opacity: 1,
      transition: {
        ease: ease1,
        duration: 0.5,
        // delay: 0.5,
      },
    },
    exit: {
      scale: .95,
      filter: "blur(1vw)",
      opacity: 0,
      transition: {
        ease: ease1,
        duration: 0.5,
        // delay: 0.5,
      },
    }
  },
  sucessIcon: {
    initial: {
      rotate: "-10deg",
      y: "10%",
      opacity: 0,
    },
    animate: {
      rotate: "0deg",
      y: "0%",
      opacity: 1,
      transition: {
        ease: ease3,
        duration: 0.4,
        delay: .05,
      },
    },
    exit: {
      rotate: "10deg",
      y: "-10%",
      opacity: 0,
      transition: {
        ease: ease3,
        duration: 0.4,
        delay: .05,
      },
    }
  }
}
