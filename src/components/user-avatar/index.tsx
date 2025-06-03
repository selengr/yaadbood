import { Box, Typography, useTheme } from "@mui/material"
import Avatar from "../atoms/Avatar"

interface UserAvatarProps extends React.ComponentProps<typeof Box> {
    fullName: string,
    jobTitle: string,
    profilePicture?: string,
}

const UserAvatar = ({
    fullName = "",
    jobTitle = "",
    profilePicture,
    sx,
    ...props
}: UserAvatarProps) => {

    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                p: 1,
                cursor: "pointer",
                "&:hover": {
                    backgroundColor: theme.palette.gray[100]
                },
                ...sx
            }}
            {...props}
        >
            <Avatar width={"40px"} height={"40px"} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <Typography
                    sx={(theme) => ({
                        color: theme.palette.gray[700],
                        fontWeight: 400,
                        fontSize: '14px',
                    })}
                    variant='body1'>
                    {fullName}
                </Typography>
                <Typography
                    variant='caption'
                    sx={(theme) => ({
                        color: theme.palette.gray[500],
                        fontWeight: 325,
                        fontSize: '12px',
                    })}>
                    {jobTitle}
                </Typography>
            </Box>
        </Box>
    )
}

export default UserAvatar;