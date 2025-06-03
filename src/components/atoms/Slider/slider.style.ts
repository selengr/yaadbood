import { Slider, styled } from "@mui/material";

export const StyledSlider = styled(Slider)(({ theme }) => ({
    ".MuiSlider-thumb": {
        width: "32px",
        height: "32px",
        [theme.breakpoints.down("sm")]: {
            width: "28px",
            height: "28px",
        },
        backgroundColor: theme.palette.gray["700"],
        border: "2px solid white"
    },
    ".MuiSlider-track": {
        backgroundColor: theme.palette.gray["700"],
        height: "10px",
        borderWidth: 0
    },
    ".MuiSlider-valueLabel": {
        backgroundColor: theme.palette.gray["900"],
        borderRadius: "8px",
    },
    ".MuiSlider-rail": {
        backgroundColor: theme.palette.gray["800"],
        height: "12px",
    },
    ".MuiSlider-mark": {
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        backgroundColor: "white",
        ":nth-last-of-type(2)": {
            display: "none"
        }
    },
}))