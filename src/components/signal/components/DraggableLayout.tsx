"use client"

import { Box, Modal, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";
import { CgClose } from "react-icons/cg";
import useDragModal from "../useDragModal";
import { DraggableArea, DraggableBox, ResizeArea, ResizeBox } from "./draggable.style";
import ResizeIcon from '/public/icons/resize.svg';
interface DraggableLayoutProps {
    open: boolean;
    setOpen: (b: boolean) => void;
    hasBlur?: boolean;
    children?: React.ReactNode;
}

const DefaultWidth = "744px";


const DraggableLayout: FC<DraggableLayoutProps> = ({
    setOpen,
    open,
    hasBlur,
    children
}) => {
    const isMobile = useMediaQuery('(max-width:576px)');
    const { draggableRef, resizeableBoxRef, sizeReduced, resetSize } = useDragModal({
        isOpen: open,
        defaultSizes: {
            w: DefaultWidth,
            h: `${window.innerHeight - 10}px`,
        }
    });

    const theme = useTheme();

    return (
        <Modal
            onClose={() => setOpen(false)}
            open={open}
        >
            <Box
                ref={draggableRef}
            >
                <DraggableBox
                    ref={resizeableBoxRef}
                    sx={(theme) => ({
                        minWidth: isMobile ? "375px" : "520px",
                        maxWidth: DefaultWidth,
                        width: DefaultWidth,
                    })}>
                    <DraggableArea id="drag-area" />
                    <ResizeArea id="resize-area" />
                    {
                        !isMobile &&
                        <ResizeBox>
                            {
                                sizeReduced &&
                                <ResizeIcon
                                    color={theme.palette.gray['700']}
                                    style={{ cursor: 'pointer' }}
                                    onClick={resetSize}
                                />
                            }
                            <CgClose
                                color={theme.palette.gray['700']}
                                style={{ cursor: 'pointer' }}
                                onClick={() => setOpen(false)}
                            />
                        </ResizeBox>
                    }
                    {children}
                </DraggableBox>
            </Box>
        </Modal>
    );
}

export default DraggableLayout;