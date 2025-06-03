// import { EmojiStyle, type PickerProps } from 'emoji-picker-react'
import dynamic from 'next/dynamic';

import { EmojiPickerContainer } from './style';
const Picker = dynamic(() => import('@emoji-mart/react'), { ssr: false });

export default function AppEmojiSelector(props: { onEmojiSelect: (emoji: string) => void }) {
  return (
    <EmojiPickerContainer>
      <Picker
        // data={data}
        navPosition='bottom'
        previewPosition='none'
        set='apple'
        autoFocus={true}
        skinTonePosition='none'
        onEmojiSelect={(emoji: { id: string; name: string; native: string; unified: string }) =>
          props.onEmojiSelect(emoji.native)
        }
      />
    </EmojiPickerContainer>
  );
}
