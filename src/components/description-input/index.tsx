import HelpIcon from '@/components/atoms/Icon/icons/help-icon.svg';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { forwardRef, useCallback, useImperativeHandle } from 'react';
import { Descendant } from 'slate';
import { RenderElementProps, RenderLeafProps, Slate } from 'slate-react';
import { icons } from '../atoms/Icon/iconLists';
import MentionItem from '../user-avatar';
import { Portal } from './components';
import { Element, Leaf } from './renderers';
import { MentionObject, useMentionAndHashtag } from './useMentionAndHashtag';
import { StyledEditable, StyledMentionBox, StyledMentionItem, StyledTag } from './description.style';
import { CustomTooltip } from '../atoms';

/* Should be replaced with real tooltip text */
const TooltipText = "In the description section, it’s best to clearly specify which market and symbol you are discussing. This will help you engage your audience more effectively.";

const DescriptionHandler = forwardRef((props, ref) => {
    const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
    const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
    const {
        target,
        index,
        chars,
        mentionRef,
        isHashtag,
        editor,
        editorRef,
        descriptionHandler,
        onKeyDown,
        handleChange,
        handleClick,
        insertSticker
    } =
        useMentionAndHashtag();

    useImperativeHandle(ref, () => ({
        insertSticker,
    }));

    const theme = useTheme();

    return (
        <Slate editor={editor} initialValue={initialValue}
            onChange={handleChange}
        >

            <Stack flexDirection={'row'} alignItems={'center'} gap={theme.spacing(0.05)}>
                <Typography
                    variant='caption'
                    sx={{
                        color: theme.palette.gray[700],
                        fontSize: '16px',
                        fontWeight: 500
                    }}>
                    Description
                </Typography>

                <CustomTooltip title={TooltipText} placement="top-start" arrow>
                    <IconButton>
                        <HelpIcon />
                    </IconButton>
                </CustomTooltip>

                {/* <IconButton size='small'>
                    <HelpIcon />
                </IconButton> */}
            </Stack>

            <StyledEditable
                ref={editorRef}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={onKeyDown}
                placeholder="Enter some text..."
                style={{
                    borderColor: descriptionHandler.textLengthError ? theme.palette.red['500'] : theme.palette.gray['200'],
                    color: descriptionHandler.textLengthError ? theme.palette.red['500'] : theme.palette.gray['700']
                }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: theme.spacing(1) }}>
                <Box display={"flex"} alignItems={"center"} gap={"4px"}>
                    {descriptionHandler.textLengthError && icons["circleError"]}
                    <Typography
                        sx={(theme) => ({
                            color: descriptionHandler.textLengthError ? theme.palette.red['500'] : theme.palette.gray['400'],
                            fontSize: '12px',
                            fontWeight: 400
                        })}>
                        {descriptionHandler.textLengthError ? descriptionHandler.error : descriptionHandler.msg}
                    </Typography>
                </Box>
                <Typography
                    sx={(theme) => ({
                        color: descriptionHandler.textLengthError ? theme.palette.red['500'] : theme.palette.gray['400'],
                        fontSize: '12px',
                        fontWeight: 400
                    })}>
                    {descriptionHandler.counter}
                </Typography>
            </Box>

            {target && chars.length > 0 && (
                <Portal>
                    <StyledMentionBox ref={mentionRef}>
                        {
                            isHashtag ? <StyledTag onClick={handleClick}>{`#${chars}`}</StyledTag> :
                                (chars as MentionObject[]).map((char, i) => (
                                    <StyledMentionItem
                                        key={i}
                                        onClick={handleClick}
                                        fullName={char.fullName}
                                        jobTitle={char.jobTitle}
                                        sx={{
                                            bgcolor: i === index ? theme.palette.gray["100"] : 'transparent',
                                        }}
                                    />
                                ))
                        }
                    </StyledMentionBox>
                </Portal>
            )}
        </Slate>
    );
});

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [
            { text: '' },
        ],
    },
];

export default DescriptionHandler;