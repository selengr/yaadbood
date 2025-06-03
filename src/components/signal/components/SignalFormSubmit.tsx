import Button from '@/components/atoms/Button/Button';
import ScheduleIcon from '@/components/atoms/Icon/icons/schedule-icon.svg';
import { IconButton, useTheme } from "@mui/material";
import React, { FC } from "react";

interface SignalFormSubmitProps {
    onSchedule: () => void;
    submitText: string;
}

const SignalFormSubmit: FC<SignalFormSubmitProps> = ({
    onSchedule,
    submitText
}) => {

    const theme = useTheme();

    return (
        <React.Fragment>
            <IconButton
                onClick={onSchedule}
                sx={{ svg: { width: '20px', height: '20px', fill: theme.palette.gray[700] } }}>
                <ScheduleIcon />
            </IconButton>
            <Button sx={{
                height: '32px',
                padding: "0 16px",
                minHeight: 0,
                '&:disabled': {
                    bgcolor: theme.palette.gray['300'],
                    border: 'none',
                    color: theme.palette.gray['700']
                }
            }}
                pill
                disabled>
                {submitText}
            </Button>
        </React.Fragment>
    );
}

export default SignalFormSubmit;