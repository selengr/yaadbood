import {
    ListItem,
    styled
} from '@mui/material';


export const StyledListItem = styled(ListItem)<{ animation?: string }>(({ animation }) => ({
    padding: 0,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    opacity: 1,
    ...(animation && {
        animation: `${animation} 0.3s ease-in-out`,
    }),
    '@keyframes fadeIn': {
        from: {
            opacity: 0,
            transform: 'translateY(-10px)',
        },
        to: {
            opacity: 1,
            transform: 'translateY(0)',
        },
    },
    '@keyframes fadeOut': {
        from: {
            opacity: 1,
        },
        to: {
            opacity: 0,
            transform: 'translateY(-10px)',
        },
    },
    '@keyframes bounceIn': {
        '0%': {
            opacity: 0,
            transform: 'scale(0.3)',
        },
        '50%': {
            opacity: 1,
            transform: 'scale(1.05)',
        },
        '70%': {
            transform: 'scale(0.9)',
        },
        '100%': {
            transform: 'scale(1)',
        },
    },
    '@keyframes scaleIn': {
        from: {
            opacity: 0,
            transform: 'scale(0)',
        },
        to: {
            opacity: 1,
            transform: 'scale(1)',
        },
    },
    '@keyframes scaleOut': {
        from: {
            opacity: 1,
            transform: 'scale(1)',
        },
        to: {
            opacity: 0,
            transform: 'scale(0)',
        },
    },
    '@keyframes slideInRight': {
        from: {
            opacity: 0,
            transform: 'translateX(100%)',
        },
        to: {
            opacity: 1,
            transform: 'translateX(0)',
        },
    },
    '@keyframes slideOutLeft': {
        from: {
            opacity: 1,
            transform: 'translateX(0)',
        },
        to: {
            opacity: 0,
            transform: 'translateX(-100%)',
        },
    },
    '@keyframes rotateIn': {
        from: {
            opacity: 0,
            transform: 'rotate(-180deg) scale(0)',
        },
        to: {
            opacity: 1,
            transform: 'rotate(0) scale(1)',
        },
    },
    '@keyframes rotateOut': {
        from: {
            opacity: 1,
            transform: 'rotate(0) scale(1)',
        },
        to: {
            opacity: 0,
            transform: 'rotate(180deg) scale(0)',
        },
    },
    '@keyframes flipIn': {
        from: {
            opacity: 0,
            transform: 'perspective(400px) rotateX(-90deg)',
        },
        to: {
            opacity: 1,
            transform: 'perspective(400px) rotateX(0)',
        },
    },
    '@keyframes flipOut': {
        from: {
            opacity: 1,
            transform: 'perspective(400px) rotateX(0)',
        },
        to: {
            opacity: 0,
            transform: 'perspective(400px) rotateX(90deg)',
        },
    },
}));
