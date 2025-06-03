import { Box, SxProps, Typography } from "@mui/material";
import React, { FC } from "react";
import GradientDivider from "../Divider/GradientDivider";
import { Theme } from "@emotion/react";

interface SplittedTitleProps {
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
}

const SplittedTitle: FC<SplittedTitleProps> = ({
    children,
    sx
}) => {
    return (
        <Box display={"flex"} width={"100%"} alignItems={"center"} gap={1} sx={sx}>
            <GradientDivider fadeArrow="Left" />
            <Typography sx={(theme) => ({ color: theme.palette.gray["700"] })}>{children}</Typography>
            <GradientDivider />
        </Box>
    );
}

export default SplittedTitle;