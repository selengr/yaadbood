import { Box, Typography } from "@mui/material";
import Input from "../Input";
import InputMenus from "./TargetMenus";

interface TargetInputInputProps {
    children?: React.ReactNode;
    hasRemove?: boolean;
    onRemove?: () => void
}

const TargetInput = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    return function WithTargetInputComponent(props: P & TargetInputInputProps) {
        const { onRemove, hasRemove, ...otherProps } = props;
        const onRemoveCallback = hasRemove ? onRemove : undefined;

        return (
            <WrappedComponent {...otherProps as P}
                extra={
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        width={"100%"}
                        justifyContent={"space-between"}
                        sx={(theme) => ({ ml: theme.spacing(1) })}
                    >
                        <InputMenus />
                        {
                            hasRemove &&
                            <Typography sx={(theme) => ({ cursor: "pointer", color: theme.palette.red["500"] })} onClick={onRemoveCallback}>
                                Remove
                            </Typography>
                        }
                    </Box>
                }
            />
        );
    };
}

export default TargetInput(Input);