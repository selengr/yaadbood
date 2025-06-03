import React from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { useSelected, useFocused } from 'slate-react';
import { MentionElement, HashtagElement, RenderElementPropsFor } from '@/../slate.types';
import { IS_MAC } from './environment';
import { styled, useTheme } from '@mui/material';


export const Element: React.FC<RenderElementProps> = (props) => {
    const { attributes, children, element } = props;
    switch (element.type) {
        case 'mention':
            return <Mention {...props} />;
        case 'hashtag':
            return <Hashtag {...props} />;
        default:
            return <div {...attributes}>{children}</div>;
    }
};


/* @@@@@@@@@@@@@@@ Leaf Component @@@@@@@@@@@@@@@ */
export const Leaf: React.FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
    let formattedChildren = children;

    if (leaf.bold) formattedChildren = <strong>{formattedChildren}</strong>;
    if (leaf.code) formattedChildren = <code>{formattedChildren}</code>;
    if (leaf.italic) formattedChildren = <em>{formattedChildren}</em>;
    if (leaf.underline) formattedChildren = <u>{formattedChildren}</u>;
    if (typeof leaf.text === 'string' && leaf.text.startsWith('#'))
        formattedChildren = <span style={{ color: '#1DA1F2' }}>{formattedChildren}</span>;

    return <span {...attributes}>{formattedChildren}</span>;
};



/* @@@@@@@@@@@@@@@ Mention Component @@@@@@@@@@@@@@@ */
const StyledMention = styled('span')<{
    selected: boolean,
    focused: boolean,
    element: any,
}>(({ theme, selected, focused, element }) => ({
    padding: '3px 3px 2px',
    margin: '2px',
    verticalAlign: 'baseline',
    display: 'inline-block',
    borderRadius: '4px',
    backgroundColor: theme.palette.gray["100"],
    color: theme.palette.primary["400"],
    fontSize: '0.9em',
    boxShadow: selected && focused ? `0 0 0 2px ${theme.palette.info["200"]}` : 'none',
    ...(element.children[0].bold && { fontWeight: 'bold' }),
    ...(element.children[0].italic && { fontStyle: 'italic' }),
}))
export const Mention: React.FC<RenderElementPropsFor<MentionElement>> = ({
    attributes,
    children,
    element,
}) => {
    const selected = useSelected();
    const focused = useFocused();

    return (
        <StyledMention {...attributes}
            contentEditable={false}
            element={element}
            selected={selected}
            focused={focused}>
            <div contentEditable={false}>
                {IS_MAC ? <>{children}@{element.character}</> : <>@{element.character}{children}</>}
            </div>
        </StyledMention>
    );
};



/* @@@@@@@@@@@@@@@ Hashtag Component @@@@@@@@@@@@@@@ */
export const Hashtag: React.FC<RenderElementPropsFor<HashtagElement>> = ({
    attributes,
    children,
    element,
}) => {
    const selected = useSelected();
    const focused = useFocused();
    const theme = useTheme();
    const style: React.CSSProperties = {
        padding: '3px 3px 2px',
        margin: '0 1px',
        verticalAlign: 'baseline',
        display: 'inline-block',
        borderRadius: '4px',
        backgroundColor: theme.palette.gray["100"],
        color: theme.palette.primary["400"],
        fontSize: '0.9em',
        boxShadow: selected && focused ? `0 0 0 2px ${theme.palette.info["200"]}` : 'none',
    };

    return (
        <span {...attributes} contentEditable={false} style={style}>
            <div contentEditable={false}>#{element.tag}{children}</div>
        </span>
    );
};