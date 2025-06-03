import { Box } from "@mui/material"
import React from "react"

const FutureIndicator = ({
    size,
    type
}: {
    size: string,
    type: string
}) => type === "futures" && <React.Fragment>
    <Box
        sx={(theme) => ({
            position: 'absolute',
            top: "40%",
            left: 0,
            width: '8px',
            height: '108px',
            borderTopRightRadius: '99px',
            borderBottomRightRadius: '99px',
            backgroundColor: size === 'long' ? theme.palette.green['500'] : theme.palette.red['500'],
            transition: 'all .3s'
        })}
    />
    <Box
        sx={(theme) => ({
            position: 'absolute',
            top: "40%",
            right: 0,
            width: '8px',
            height: '108px',
            borderTopLeftRadius: '99px',
            borderBottomLeftRadius: '99px',
            backgroundColor: size === 'long' ? theme.palette.green['500'] : theme.palette.red['500'],
            transition: 'all .3s'
        })}
    />
</React.Fragment>

export default FutureIndicator;