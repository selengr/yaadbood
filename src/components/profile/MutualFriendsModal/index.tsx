"use client"
// React & Libs
import { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
// constants
import { PROFILE } from '@/constants';
// components
import { Modal } from '@/components/atoms';
import { MutualFriendItem, LoadingSpinner } from './components';
// hooks
import { useGetMutualFollowings, useRemoveFollowReq } from '@/hooks/user';

// type
import { IMutualFriendsModalProps, TUndoState } from './components/type';
//style
import { StyledModalContainer } from './mutualFriendsModal.style';

const MutualFriendsModal: React.FC<IMutualFriendsModalProps> = ({ open, username, handleClose }) => {
  const { TITLE } = PROFILE.MUTUAL_FRIENDS;
  const [undoStates, setUndoStates] = useState<TUndoState>({});
  const [removedItems, setRemovedItems] = useState<Set<string>>(new Set());

  const observerTarget = useRef<HTMLDivElement>(null)

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetMutualFollowings({ username })

  const queryClient = useQueryClient();
  const router = useRouter();
  const removeFollowReq = useRemoveFollowReq({
    onSuccess: (removed: any) => {
      // router.refresh();
      setRemovedItems(prev => new Set(prev).add(removed?.data?.id));
      queryClient.setQueryData(['userMutualFollowingsData', undefined, undefined, username], (oldData: any) =>
        oldData?.filter((conn: any) => conn._id !== removed?.data?.id)
      );
    }
  });

  const handleUnsubscribe = (id: string) => {
    const timeout = setTimeout(() => {
      removeFollowReq.mutate({ id });
      removeUndoState(id);
    }, 2000);
    setUndoStates((prev) => ({ ...prev, [id]: timeout }));
  };

  const handleUndo = (id: string) => {
    if (undoStates[id]) {
      clearTimeout(undoStates[id]);
      removeUndoState(id);
      setRemovedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const removeUndoState = (id: string) => {
    setUndoStates((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const isUndoing = (id: string) => !!undoStates[id];

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  )

  useEffect(() => {
    const element = observerTarget.current
    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const observer = new IntersectionObserver(handleObserver, option)
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [handleObserver])

  const mutualFriendsList = useMemo(
    () =>
      data
        ?.filter(following => !removedItems.has(following._id)) 
        .map((following) => (
          <MutualFriendItem
            key={following._id}
            following={following}
            isUndoing={isUndoing(following._id)}
            onUnsubscribe={() => handleUnsubscribe(following._id)}
            onUndo={() => handleUndo(following._id)}
          />
        )),
    [data, isUndoing, handleUnsubscribe, handleUndo, removedItems]
  );


  return (
    <Modal open={open} onClose={handleClose} title={TITLE} fullScreenOnMobile>
      <StyledModalContainer>
        {isLoading && <LoadingSpinner />}
        {!isLoading && <>{mutualFriendsList}
        {isFetchingNextPage && <LoadingSpinner />}
            <div ref={observerTarget} style={{ height: "20px" }} />
        </>
        }
      </StyledModalContainer>
    </Modal>
  );
};

export default MutualFriendsModal;
