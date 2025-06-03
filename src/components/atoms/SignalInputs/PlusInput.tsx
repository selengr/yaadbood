import { Button, Stack, Typography, useTheme } from "@mui/material";
import { FC } from "react";

interface PlusInputProps {
    label?: string;
    onAdd?: () => void;
    fullWidth?: boolean;
}

const PlusInput: FC<PlusInputProps> = ({
    label = "Target",
    fullWidth,
    onAdd
}) => {

    const theme = useTheme();
    const color = theme.palette.gray["400"];

    return (
        <Stack sx={{ width: fullWidth ? '100%' : "fit-content", color }}>
            <Typography>{label}</Typography>
            <Button
                sx={{
                    border: "1px dashed",
                    borderColor: theme.palette.gray["200"],
                    color: theme.palette.gray["400"],
                    justifyContent: "start",
                    fontWeight: 325
                }}
                onClick={onAdd}>
                {label && `Enter new ${label.toLowerCase()}`}
            </Button>
        </Stack>
    );
}

export default PlusInput;