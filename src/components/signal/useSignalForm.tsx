import { useMediaQuery } from "@mui/material";
import { useRef, useState } from "react";


const initialState = {
    type: 'spot',
    size: 'long',
    timeFrame: '',
    term: '',
    entryPrice: [{ value: 0 }],
    target: [{ value: 0, risk: 'Low' }],
    leverage: 0,
    stoploss: 0,
    capital: 0
}

export enum TargetTabs {
    EntryPrice = "Entry Price",
    Target = "Target"
}

const useSignalForm = () => {
    
    const [modalStatus, setModalStatus] = useState(false);
    const [openNewTweet, setOpenNewTweet] = useState(false);
    const [targetTab, setTargetTab] = useState<TargetTabs>(TargetTabs.EntryPrice);
    const [postVisibility, showPostVisibilty] = useState(false);
    const [commentSetting, showCommentSetting] = useState(false);
    const [schedule, showSchedule] = useState(false);
    const [removingIndex, setRemovingIndex] = useState<{
        target?: number,
        entry?: number
    }>();
    const [data, setData] = useState(initialState);
    const [isSignal, setIsSignal] = useState(true);
    const isMobile = useMediaQuery('(max-width:576px)');
    const descriptionInputRef = useRef<{ insertSticker: (emoji: string) => void }>(null);

    function onAddEntry() {
        setData((prev) => ({
            ...prev,
            entryPrice: [...prev.entryPrice, { value: 0, risk: 'low' }]
        }))
    }

    function onAddTarget() {
        setData((prev) => ({
            ...prev,
            target: [...prev.target, { value: 0, risk: 'low' }]
        }))
    }

    function onSchedule() {
        showSchedule(true);
    }

    function onSignalChecked(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
        setIsSignal(event.target.checked);
        setOpenNewTweet(!checked);
    }

    function handleTargetTabChange(_event: React.SyntheticEvent, newValue: TargetTabs) {
        setTargetTab(newValue);
    }


    const handleToggleNewTweet = () => {
        setOpenNewTweet(!openNewTweet);
        setIsSignal(true);
    }

    function handleRemoveTarget(index: number) {
        setRemovingIndex((prev) => ({ ...prev, target: index }));
        setTimeout(() => {
            const updatedTarget = data.target.filter((_, i) => i !== index);
            setData((prev) => ({ ...prev, target: updatedTarget }));
            setRemovingIndex((prev) => ({ ...prev, target: undefined }));
        }, 300);
    }

    function handleRemoveEntry(index: number) {
        setRemovingIndex((prev) => ({ ...prev, entry: index }));
        setTimeout(() => {
            const updatedEntry = data.entryPrice.filter((_, i) => i !== index);
            setData((prev) => ({ ...prev, entryPrice: updatedEntry }));
            setRemovingIndex((prev) => ({ ...prev, entry: undefined }));
        }, 300);
    }

    function onTargetInputChanged(e: any, index: number) {
        const updatedTarget = [...data.target];
        updatedTarget[index].value = e.target.value;
        setData((prev) => ({ ...prev, target: updatedTarget }));
    }

    function onEntryInputChanged(e: any /* React.FormEvent<HTMLDivElement> */, index: number) {
        const updatedEntry = [...data.entryPrice];
        updatedEntry[index].value = e.target.value;
        setData((prev) => ({ ...prev, entryPrice: updatedEntry }));
    }

    return {
        data,
        modalStatus,
        openNewTweet,
        targetTab,
        postVisibility,
        commentSetting,
        schedule,
        removingIndex,
        isMobile,
        isSignal,
        descriptionInputRef,
        setData,
        setModalStatus,
        showPostVisibilty,
        showCommentSetting,
        showSchedule,
        onAddEntry,
        onAddTarget,
        onSchedule,
        onSignalChecked,
        handleTargetTabChange,
        handleToggleNewTweet,
        handleRemoveTarget,
        handleRemoveEntry,
        onTargetInputChanged,
        onEntryInputChanged
    };}
 
export default useSignalForm;