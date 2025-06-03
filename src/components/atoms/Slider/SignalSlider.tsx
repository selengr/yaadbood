import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import * as React from 'react';
import AppSlider from './AppSlider';

interface SignalSliderProps {
    title?: string;
    sx?: SxProps<Theme>;
    sliderProps?: React.ComponentProps<typeof AppSlider>;
}

const SignalSlider = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    return function withSignalSlider(props: P & SignalSliderProps) {
        const { sx, title, sliderProps, ...otherProps } = props;

        const theme = useTheme();

        return (
            <WrappedComponent
                sx={{
                    borderRadius: "12px",
                    width: "100%",
                    padding: "16px 20px 10px 20px",
                    [theme.breakpoints.down("sm")]: {
                        padding: "16px 0 10px 0",
                    },
                    border: {
                        xs: "none",
                        sm: `1px solid ${theme.palette.gray["200"]}`,
                    },
                    ...sx,
                }}
                {...otherProps as P}
            >
                <Typography sx={(theme) => ({ color: theme.palette.gray["700"] })}>
                    {title}
                </Typography>
                <Box sx={{ display: "flex", gap: "24px", alignItems: "center" }}>
                    <AppSlider {...sliderProps} />
                    <Typography sx={(theme) => ({ color: theme.palette.gray["400"], whiteSpace: "nowrap" })}>
                        20 x
                    </Typography>
                </Box>
            </WrappedComponent>
        )
    }
}

export default SignalSlider(Box);