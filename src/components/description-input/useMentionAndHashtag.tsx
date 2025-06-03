import { CustomEditor, HashtagElement, MentionElement } from '@/../slate.types';
import { useGetUserFollowingsData } from '@/hooks/user/useGetUserFollowingsData';
import { useMediaQuery } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createEditor, Editor, Range, Element as SlateElement, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { ReactEditor, withReact } from 'slate-react';
import useInputDescription from './useInputDescription';

type DescriptionHandler = {
    counter: string | number;
    textLengthError: boolean;
    msg: string;
    error: string;
}

export type MentionObject = {
    fullName: string,
    jobTitle: string,
}

interface MentionHookResult {
    target: Range | null;
    index: number;
    count: number;
    search: string;
    chars: MentionObject[] | string;
    mentionRef: React.RefObject<HTMLDivElement | null>;
    editorRef: React.RefObject<HTMLDivElement | null>;
    onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    handleChange: () => void;
    handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    insertSticker: (url: string) => void;
    descriptionHandler: DescriptionHandler;
    editor: CustomEditor;
    isHashtag: boolean;
}

type State = {
    target: Range | null;
    index: number;
    search: string;
    isHashtag: boolean;
    count: number;
    isMentionStarted: boolean;
}

const initialState: State = {
    target: null,
    index: 0,
    search: '',
    isHashtag: false,
    count: 0,
    isMentionStarted: false,
};

export const useMentionAndHashtag = (): MentionHookResult => {

    const {
        descriptionHandler,
        onDescriptionLengthChanged
    } = useInputDescription();

    const matches = useMediaQuery('(max-width:768px)');
    const mentionRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<State>(initialState);

    const {
        count,
        index,
        isHashtag,
        isMentionStarted,
        search,
        target
    } = state;

    const editor = useMemo(
        () => withMentionsAndHashtags(withReact(withHistory(createEditor()))),
        []
    );

    const { data: followings, isLoading, refetch } = useGetUserFollowingsData({ search });

    // const memorizedFollowers = useMemo(() => {
    //     return followings.map((following) => {
    //         const { firstName, lastName, job } = following.user;
    //         return {
    //             fullName: `${firstName} ${lastName}`,
    //             jobTitle: job,
    //         }
    //     })
    // }, [followings]);

    // const chars = isHashtag ? search : memorizedFollowers;
    const chars = search 

    const onKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {

            event.stopPropagation();

            if (target && chars.length) {
                switch (event.key) {
                    case 'ArrowDown': {
                        event.preventDefault();
                        const selectionIndex = index > chars.length - 1 ? 0 : index + 1;
                        setState(prev => ({ ...prev, index: selectionIndex }));
                        break;
                    }

                    case 'ArrowUp': {
                        event.preventDefault();
                        const selectionIndex = index <= 0 ? chars.length - 1 : index - 1;
                        setState(prev => ({ ...prev, index: selectionIndex }));
                        break;
                    }

                    case 'Tab':
                    case 'Enter': {
                        event.preventDefault();
                        Transforms.select(editor, target);
                        if (isHashtag && typeof chars === 'string') {
                            insertHashtag(chars);
                        } else if (!isHashtag && Array.isArray(chars)) {
                            insertMention(chars[index].fullName);
                        }
                        setState({ ...initialState, count: state.count });
                        break;
                    }

                    case 'Escape': {
                        event.preventDefault();
                        setState({ ...initialState, count: state.count });
                        break;
                    }
                }
            }

            if (event.ctrlKey && event.key === 'b') {
                event.preventDefault();
                const marks = Editor.marks(editor);
                Editor.addMark(editor, 'bold', !marks?.bold);
            }
        },
        [editor, target, chars, index, isHashtag, state.count]
    );

    /* To detect mention start */
    function getLastCharacter() {
        const end = Editor.end(editor, []);
        if (!end) return null;
        const [textNode] = Editor.node(editor, end.path);
        const r = textNode as any;
        if (!r || !r.text) return null;
        return r.text.slice(-1);
    }

    const countCharacters = () => {
        let finalText = '';
        let specialChars = 0;
        editor.children.forEach((c) => {
            (c as any).children.map((t: any) => {
                if (t.type === 'hashtag' || t.type === 'mention' || t.type === 'sticker') {
                    specialChars++;;
                }
                finalText += t.text || t.tag || t.character || "";
            })
        })

        const payload = finalText.length + specialChars;
        onDescriptionLengthChanged(payload);
        setState(prev => ({ ...prev, count: payload }));
    };

    const handleChange = useCallback(() => {

        // const lastCharacter = getLastCharacter();
        // setState(prev => ({ ...prev, isMentionStarted: lastCharacter === '@' }));
        countCharacters();

        const { selection } = editor;
        if (!selection || !Range.isCollapsed(selection)) {
            setState(prev => ({ ...prev, target: null }));
            return;
        }

        const [start] = Range.edges(selection);
        const wordBefore = Editor.before(editor, start, { unit: 'word' });
        const before = wordBefore && Editor.before(editor, wordBefore);
        const beforeRange = before && Editor.range(editor, before, start);
        const beforeText = beforeRange && Editor.string(editor, beforeRange);
        const beforeMentionMatch = beforeText && beforeText.match(/^@(\w+)$/);
        const beforeHashtagMatch = beforeText && beforeText.match(/^#(\w+)$/);
        const after = Editor.after(editor, start);
        const afterRange = Editor.range(editor, start, after);
        const afterText = Editor.string(editor, afterRange);
        const afterMatch = afterText.match(/^(\s|$)/);

        if (beforeHashtagMatch && afterMatch) {
            setState(prev => ({
                ...prev,
                isHashtag: true,
                target: beforeRange,
                search: beforeHashtagMatch[1],
            }));
            return;
        }

        if (beforeMentionMatch && afterMatch) {
            setState(prev => ({
                ...prev,
                isHashtag: false,
                target: beforeRange,
                search: beforeMentionMatch[1],
            }));
            return;
        }

        setState(prev => ({
            ...prev,
            target: null,
            search: '',
        }));
    }, [editor]);


    useEffect(() => {
        if (target && chars.length && mentionRef.current) {
            const domRange = ReactEditor.toDOMRange(editor, target);
            const rect = domRange.getBoundingClientRect();

            const bottom = editorRef.current?.getBoundingClientRect().bottom;

            if (!isHashtag && matches) {
                mentionRef.current.style.top = `${bottom}px`;
                mentionRef.current.style.left = `0px`;
                mentionRef.current.style.right = `0px`;
            }
            else {
                mentionRef.current.style.top = `${rect.top + window.scrollY + 24}px`;
                mentionRef.current.style.left = `${rect.left + window.scrollX}px`;
            }

        }
    }, [editor, target, chars.length, index]);

    function handleClick() {
        if (target) {
            Transforms.select(editor, target);
            if (isHashtag) {
                insertHashtag(chars as string);
            }
            else if (!isHashtag && Array.isArray(chars)) {
                insertMention(chars[index].fullName);
            }
            setState({ ...initialState, count: state.count });
        }
    }


    const insertMention = (username: string) => {
        const mention: MentionElement = {
            type: 'mention',
            character: username,
            children: [{ text: '' }],
        };
        Transforms.insertNodes(editor, mention);
        Transforms.move(editor);
        ReactEditor.focus(editor);
    };

    const insertHashtag = (tag: string) => {
        const hashtag: HashtagElement = {
            type: 'hashtag',
            tag,
            children: [{ text: '' }],
        };
        Transforms.insertNodes(editor, hashtag);
        Transforms.move(editor);
        ReactEditor.focus(editor);
    };

    const insertSticker = (url: string) => {
        Transforms.insertText(editor, url);
        ReactEditor.focus(editor);
    };

    return {
        count,
        target,
        index,
        search,
        chars,
        editorRef,
        mentionRef,
        editor,
        isHashtag,
        descriptionHandler,
        insertSticker,
        handleClick,
        onKeyDown,
        handleChange,
    };
};

const withMentionsAndHashtags = (editor: CustomEditor) => {
    const { isInline, isVoid, markableVoid } = editor

    editor.isInline = (element: SlateElement) => {
        return element.type === 'mention' || element.type === 'hashtag'
            ? true
            : isInline(element)
    }

    editor.isVoid = (element: SlateElement) => {
        return element.type === 'mention' || element.type === 'hashtag'
            ? true
            : isVoid(element)
    }

    editor.markableVoid = (element: SlateElement) => {
        return element.type === 'mention' || element.type === 'hashtag'
            ? true
            : markableVoid(element)
    }

    return editor
}