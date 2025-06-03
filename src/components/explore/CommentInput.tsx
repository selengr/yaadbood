'use client';

import { Box, IconButton, useTheme } from '@mui/material';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { createEditor, Descendant, Editor, Range, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, ReactEditor, RenderElementProps, Slate, withReact } from 'slate-react';

import { useGetUserFollowingsData } from '@/hooks/user/useGetUserFollowingsData';

import { AllEditors, HashtagElement, MentionElement } from '../../../slate.types';
import EmojiPicker from './EmojiPicker';
import MentionSuggestionBox from './MentionSuggestionBox';

// interface MentionElement {
//   type: 'mention';
//   username: string;
//   children: Descendant[];
// }

// interface HashtagElement {
//   type: 'hashtag';
//   tag: string;
//   children: Descendant[];
// }

// interface StickerElement {
//   type: 'sticker';
//   url: string;
//   children: Descendant[];
// }

// interface ParagraphElement {
//   type: 'paragraph';
//   children: Descendant[];
// }

// type CustomElement = MentionElement | HashtagElement | StickerElement | ParagraphElement;

// declare module 'slate' {
//   interface CustomTypes {
//     Editor: BaseEditor & ReactEditor;
//     Element: CustomElement;
//   }
// }

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }]
  }
];

const withMentionsAndHashtags = (editor: AllEditors) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element) => {
    return element.type === 'mention' || element.type === 'hashtag' ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === 'sticker' ? true : isVoid(element);
  };

  return editor;
};

const renderElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case 'mention':
      return (
        <a
          href={`/c/${element.character}`}
          {...attributes}
          contentEditable={false}
          style={{ color: '#1DA1F3', textDecoration: 'none' }}>
          @{element.character}
        </a>
      );
    case 'hashtag':
      return (
        <a
          href={`/hashtag/${element.tag}`}
          {...attributes}
          contentEditable={false}
          style={{ color: '#1DA1F3', textDecoration: 'none' }}>
          #{element.tag}
        </a>
      );
    case 'sticker':
      return (
        <img {...attributes} src={element.url} alt='Sticker' style={{ width: '50px', height: '50px' }} />
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const CommentInput: React.FC = () => {
  const theme = useTheme();
  const [editor] = useState(() => withMentionsAndHashtags(withHistory(withReact(createEditor()))));
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [isMultiLine, setIsMultiLine] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [popperAnchor, setPopperAnchor] = useState<{ top: number; left: number } | null>(null);
  const [mentionTarget, setMentionTarget] = useState<Range | null>(null);
  const editableRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  const { data: followings, isLoading } = useGetUserFollowingsData({ search: mentionQuery });

  const handleSelectMention = useCallback(
    (username: string) => {
      if (mentionTarget) {
        Transforms.select(editor, mentionTarget);
        Transforms.delete(editor);
        const mention: MentionElement = {
          type: 'mention',
          character: username,
          children: [{ text: '' }]
        };
        Transforms.insertNodes(editor, mention);
        Transforms.move(editor);
        setMentionTarget(null);
      }
    },
    [editor, mentionTarget]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (mentionTarget && followings?.length > 0) {
        switch (event.key) {
          case 'ArrowDown': {
            event.preventDefault();
            const prevIndex = index >= followings.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          }
          case 'ArrowUp': {
            event.preventDefault();
            const nextIndex = index <= 0 ? followings.length - 1 : index - 1;
            setIndex(nextIndex);
            break;
          }
          case 'Tab':
          case 'Enter':
            event.preventDefault();
            Transforms.select(editor, mentionTarget);
            handleSelectMention(followings[index]?.user?.username);
            setMentionTarget(null);
            break;
          case 'Escape':
            event.preventDefault();
            setMentionTarget(null);
            break;
        }
      }
      // Detect hashtag completion on space or enter
      if (event.key === ' ' || event.key === 'Enter') {
        const { selection } = editor;
        if (!selection || !Range.isCollapsed(selection)) {
          setMentionTarget(null);
          return;
        }

        const [start] = Range.edges(selection);
        let before = start;

        while (true) {
          const charBefore = Editor.before(editor, before, { unit: 'character' });
          if (!charBefore) break;

          const charText = Editor.string(editor, Editor.range(editor, charBefore, before));

          if (charText === '#') {
            const hashtagRange = Editor.range(editor, charBefore, start);
            const hashtagText = Editor.string(editor, hashtagRange);
            const tag = hashtagText.slice(1);

            if (tag.length > 0) {
              // Wait for space or enter before converting
              Transforms.select(editor, hashtagRange);
              Transforms.delete(editor);
              const hashtag: HashtagElement = {
                type: 'hashtag',
                tag: tag.trim(),
                children: [{ text: '' }]
              };
              Transforms.insertNodes(editor, hashtag);
              event.preventDefault();
            }
          }

          if (charText.match(/\s/)) break; // Stop if we hit a space

          before = charBefore;
        }

        // Prevent default behavior to avoid scrolling
      }
    },
    [editor, followings, handleSelectMention, index, mentionTarget]
  );

  useEffect(() => {
    if (mentionTarget) {
      try {
        const domRange = ReactEditor.toDOMRange(editor, mentionTarget);
        const rect = domRange.getBoundingClientRect(); // Get position of the mention target

        setPopperAnchor({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error positioning mention suggestion:', error);
      }
    }
  }, [mentionTarget, editor]);
  const isContentEmpty =
    value.length === 1 &&
    (value[0] as any)?.children.length === 1 &&
    (value[0] as any)?.children[0].text === '';

  useEffect(() => {
    if (!editableRef.current) return;

    const observer = new ResizeObserver(() => {
      if (editableRef.current) {
        setIsMultiLine(editableRef.current.scrollHeight > 34);
      }
    });

    observer.observe(editableRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      sx={{
        flex: 1,
        borderRadius: isMultiLine ? '12px' : '9999px',
        backgroundColor: 'gray.100',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: 0.5,
        pl: isMultiLine ? 0.5 : 1.5,
        transition: 'border-radius 0.3s ease'
      }}>
      <IconButton sx={{ p: 0 }} onClick={() => setShowStickerPicker(!showStickerPicker)}>
        <FaImage size={16} />
      </IconButton>
      <Box
        sx={{
          borderRight: '1px solid',
          borderColor: isMultiLine ? 'transparent' : 'gray.200',
          height: '24px',
          mx: '-3px'
        }}
      />
      <Slate
        editor={editor}
        initialValue={value}
        onChange={(newValue) => {
          setValue(newValue);
          // Manually check scrollHeight
          if (editableRef.current) {
            setIsMultiLine(editableRef.current.scrollHeight > 34);
          }
          const { selection } = editor;
          if (!selection || !Range.isCollapsed(selection)) {
            setMentionTarget(null);
            return;
          }

          const [start] = Range.edges(selection);
          let before = start;

          while (true) {
            const charBefore = Editor.before(editor, before, { unit: 'character' });
            if (!charBefore) break;

            const charText = Editor.string(editor, Editor.range(editor, charBefore, before));

            if (charText === '@') {
              const mentionRange = Editor.range(editor, charBefore, start);
              const mentionText = Editor.string(editor, mentionRange);

              setMentionTarget(mentionRange);
              setMentionQuery(mentionText.slice(1)); // Remove `@` from query
              return;
            }

            if (charText.match(/\s/)) break; // Stop if we hit a space

            before = charBefore;
          }
          setMentionTarget(null);
        }}>
        <Editable
          ref={editableRef}
          renderElement={renderElement}
          placeholder='Add a comment...'
          onKeyDown={onKeyDown}
          className='comment-input'
          style={{
            flex: 1,
            outline: 'none',
            maxHeight: '54px',
            overflowY: 'auto',
            color: theme.palette.gray[700],
            fontSize: '14px',
            lineHeight: '21px',
            wordBreak: 'break-word'
          }}
        />
        {mentionTarget && (
          <MentionSuggestionBox
            handleClose={() => setMentionTarget(null)}
            popperAnchor={popperAnchor}
            followings={followings}
            handleSelectMention={handleSelectMention}
          />
        )}
      </Slate>
      <EmojiPicker handleEmojiClick={(emoji) => Transforms.insertText(editor, emoji)} />
      {!isContentEmpty ? (
        <IconButton sx={{ alignSelf: 'end', p: 0 }}>
          <Image src='/icons/explore/sendButton.svg' width={24} height={24} alt='send icon' />
        </IconButton>
      ) : null}
    </Box>
  );
};

export default CommentInput;
