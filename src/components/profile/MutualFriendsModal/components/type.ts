export type TUndoState = { [key: string]: NodeJS.Timeout };

export interface IMutualFriendsModalProps {
  open: boolean
  handleClose: () => void
  username: string;
}

export interface IMutualFriendItemProps {
    following: any;
    isUndoing: boolean;
    onUndo: () => void;
    onUnsubscribe: () => void;
}