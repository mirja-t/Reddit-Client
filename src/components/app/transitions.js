export const cardTransition = {
    initial: {
        scale: .9, 
        opacity: 0
    },
    animate: {
        scale: 1, 
        opacity: 1, 
        transition: {
            duration: .35, 
            delay: .3
        }
    },
    exit: {
        scale: .9, 
        opacity: 0
    },
    transition: { 
        duration: .35 
    }
}

export const bgTransition = {
    initial: {opacity: 0},
    animate: {opacity: .8},
    exit: {opacity: 0},
    transition: { duration: .35 }
}

export const buttonTransition = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0},
    transition: { duration: .35 }
}