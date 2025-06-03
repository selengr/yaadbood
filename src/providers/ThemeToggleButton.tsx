import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@/components/atoms/Button/Button';
import { toggleMode } from '@/redux/slices/themeSlice';
import MoonIcon from '@/components/atoms/Icon/icons/MoonIcon';
import SunIcon from '@/components/atoms/Icon/icons/SunIcon';
import { useTheme } from '@mui/material';

const ThemeToggleButton: React.FC = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    return (
        <Button
            onClick={() => dispatch(toggleMode())}
            icon
            variant={theme.palette.mode === 'light' ? 'outlined' : 'contained'}
            color={
                theme.palette.mode === 'light'
                    ? theme.palette.gray['200']
                    : theme.palette.neutrals['content']
            }>
            {theme.palette.mode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
    );
};

export default ThemeToggleButton;
