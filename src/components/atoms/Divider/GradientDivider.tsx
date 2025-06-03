import { Box } from "@mui/material";
import { FC } from "react";

type FadeArrow = "Left" | "Right";

interface GradientDividerProps {
    fadeArrow?: FadeArrow
}

const GradientDivider: FC<GradientDividerProps> = ({
    fadeArrow = "Right"
}) => {

    let bg = "linear-gradient(90deg, #E2E8F0FF 0%, #FFFFFFFF 50%)";
    if (fadeArrow === "Left")
        bg = "linear-gradient(90deg, #FFFFFFFF 50%, #E2E8F0FF 100%)";

    return (
        <Box sx={{
            width: "100%",
            height: "1px",
            background: bg
        }} />
    );
}

export default GradientDivider;