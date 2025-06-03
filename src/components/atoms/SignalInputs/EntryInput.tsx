import { Box, Typography } from "@mui/material";
import Input from "../Input";

interface EntryInputInputProps {
    children?: React.ReactNode;
    hasRemove?: boolean;
    onRemove?: () => void;
    destroyed?: boolean;
}

const EntryInput = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    return function WithEntryInputComponent(props: P & EntryInputInputProps) {
        const { onRemove, hasRemove, destroyed, ...otherProps } = props;
        const onRemoveCallback = hasRemove ? onRemove : undefined;

        return (
            <WrappedComponent {...otherProps as P}
                extra={
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        gap={"4px"}
                        bgcolor={"red"}
                        width={"100%"}
                        justifyContent={"end"}
                    >
                        {
                            hasRemove &&
                            <Typography color="error" sx={(theme) => ({ color: theme.palette.red["500"], cursor: "pointer" })} onClick={onRemoveCallback}>
                                Remove
                            </Typography>
                        }
                    </Box>
                }
            />
        );
    };
}

export default EntryInput(Input);