export const buttonClick = {
    whileTap: { scale: 0.85 },
}
export const fadeInOut = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
}

export const slidetop = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 2, y: 0 },
    exit: { opacity: 0, y: 40 }
}

export const slideIn = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 2, x: 0 },
    exit: { opacity: 0, x: 40 }
}

export const staggerFadeInOut = (i) => {
    return {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 },
        transition: { duration: 0.3, delay: i * 0.15 },
       

    }
}