import React from 'react';
import Button from '@/components/atoms/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMode } from '@/redux/slices/themeSlice';
import { RootState } from '@/redux/store';
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
