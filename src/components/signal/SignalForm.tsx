'use client';

import { RootState } from '@/redux/store';
import { Box, Collapse, List, Typography, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import Avatar from '../atoms/Avatar';
import Button from '../atoms/Button/Button';
import CheckBox from '../atoms/Checkbox/CheckBox';
import Dropdown from '../atoms/Dropdown';
import Icon from '../atoms/Icon';
import { icons } from '../atoms/Icon/iconLists';
import Input from '../atoms/Input';
import Modal from '../atoms/Modal/Modal';
import EntryInput from '../atoms/SignalInputs/EntryInput';
import PlusInput from '../atoms/SignalInputs/PlusInput';
import TargetInput from '../atoms/SignalInputs/TargetInput';
import SignalSlider from '../atoms/Slider/SignalSlider';
import SplittedTitle from '../atoms/Title/SplittedTitle';
import DescriptionHandler from '../description-input';
import EmojiPicker from '../explore/EmojiPicker';
import CommentSetting from '../post/CommentSetting';
import CreateNewTweet from '../post/CreateNewTweet';
import PostSetting, { PrivacyIconMap } from '../post/PostSetting';
import ScheduleSetting from '../post/ScheduleSetting';
import FutureIndicator from './components/FutureIndicator';
import SignalFormSubmit from './components/SignalFormSubmit';
import {
    CapitalView,
    DraggableContent,
    EntryContent,
    EntryTargetContainer,
    FuturePositionBox,
    LongPositionBox,
    MobileSubmitBoxContent,
    MobileSubmitBoxParent,
    SelectedMarketContainer,
    SelectedMarketContent,
    SelectedMarketDetails,
    SelectedMarketIcon,
    SelectedMarketMobile,
    ShortPositionBox,
    SignalFormHeader,
    SignalPositionContainer,
    SignalPositionContent,
    SignalProfile,
    SignalShortLongContainer,
    SignalVisibility,
    SpotPositionBox,
    StoplossCapitalContainer,
    StyledTab,
    StyledTabs,
    SubmitContainer,
    TargetContent,
    TimeFrameContainer,
    TimeFrameContent
} from './signalform.styles';
import useSignalForm, { TargetTabs } from './useSignalForm';

const DraggableLayout = dynamic(() => import('./components/DraggableLayout'), {
    ssr: false
})

const SignalFormModal = () => {

    const {
        isMobile,
        openNewTweet,
        postVisibility,
        commentSetting,
        schedule,
        modalStatus,
        isSignal,
        data,
        targetTab,
        removingIndex,
        descriptionInputRef,
        handleToggleNewTweet,
        showPostVisibilty,
        showCommentSetting,
        showSchedule,
        onSchedule,
        onSignalChecked,
        setData,
        handleRemoveEntry,
        handleRemoveTarget,
        handleTargetTabChange,
        onAddEntry,
        onAddTarget,
        onEntryInputChanged,
        onTargetInputChanged,
        setModalStatus,
    } = useSignalForm();

    const tweetDraft = useSelector((state: RootState) => state.tweetCreation);

    const memoaizedVisibility = useMemo(() => {
        return tweetDraft.visibility.replace(/(\w)(\w*)/g,
            function (_g0, g1, g2) { return g1.toUpperCase() + g2.toLowerCase(); })
    }, [tweetDraft.visibility])

    const theme = useTheme();

    return (
        <>
            <Button onClick={() => setModalStatus(true)}>Signal</Button>

            <CreateNewTweet open={openNewTweet} onClose={handleToggleNewTweet} />

            <Modal
                title='Post settings'
                open={postVisibility && !commentSetting}
                closeOnOutsideClick={true}
                onClose={() => showPostVisibilty(false)}
                onBack={!isMobile ? () => showPostVisibilty(false) : undefined}>
                <PostSetting onCommentControl={() => showCommentSetting(true)} />
            </Modal>

            <Modal
                title='Schedule'
                open={schedule}
                closeOnOutsideClick={true}
                onClose={() => showSchedule(false)}
                onBack={!isMobile ? () => showSchedule(false) : undefined}>
                <ScheduleSetting schedule={schedule} onClose={() => showSchedule(false)} />
            </Modal>

            <Modal
                title='Comment Control'
                open={commentSetting}
                closeOnOutsideClick={true}
                onClose={() => showCommentSetting(false)}
                onBack={!isMobile ? () => showCommentSetting(false) : undefined}>
                <Box sx={{ width: { xs: '100%', md: '464px' } }}>
                    <CommentSetting onClose={() => showCommentSetting(false)} />
                </Box>
            </Modal>

            <DraggableLayout
                open={
                    modalStatus &&
                    !postVisibility &&
                    !commentSetting &&
                    !openNewTweet &&
                    !schedule
                }
                setOpen={() => setModalStatus(false)}>
                <FutureIndicator size={data.size} type={data.type} />
                <DraggableContent>
                    <SignalFormHeader sx={{ mb: "40px" }}>
                        <SignalProfile>
                            <IoClose
                                color={theme.palette.gray['700']}
                                style={{ display: isMobile ? "block" : "none" }}
                                onClick={() => setModalStatus(false)}
                            />
                            <Avatar />

                            <Box>
                                <Typography
                                    sx={(theme) => ({
                                        color: theme.palette.gray['700'],
                                        fontSize: '20px',
                                        display: { xs: "none", sm: "block" }
                                    })}
                                >
                                    [Full name]
                                </Typography>
                                <SignalVisibility
                                    onClick={() => showPostVisibilty(true)}
                                >
                                    {
                                        !isMobile &&
                                        <Icon name={PrivacyIconMap[tweetDraft.visibility] as keyof typeof icons} />
                                    }
                                    <Typography sx={(_theme) => ({ fontSize: '14px' })}>
                                        {memoaizedVisibility}
                                    </Typography>
                                    <IoMdArrowDropdown />
                                </SignalVisibility>
                            </Box>
                        </SignalProfile>

                        <MobileSubmitBoxParent>
                            <MobileSubmitBoxContent>
                                <SignalFormSubmit
                                    onSchedule={onSchedule}
                                    submitText='Schedule'
                                />
                            </MobileSubmitBoxContent>
                            <CheckBox label='Idea' checked={isSignal} onChange={onSignalChecked} />
                        </MobileSubmitBoxParent>
                    </SignalFormHeader>

                    <DescriptionHandler ref={descriptionInputRef} />

                    <EmojiPicker
                        sx={{
                            alignSelf: 'center',
                            p: 0.5,
                            display: { xs: 'none', lg: 'flex' },
                            color: theme.palette.gray['700'],
                            fontSize: '20px'
                        }}
                        handleEmojiClick={(emoji) => descriptionInputRef.current?.insertSticker(emoji)}
                    />

                    <SignalPositionContainer sx={{ mt: "16px" }}>
                        <SignalPositionContent>
                            <SpotPositionBox
                                onClick={() => setData((prev) => ({ ...prev, type: 'spot' }))}
                                sx={(theme) => ({
                                    backgroundColor: data.type === 'spot' ? theme.palette.gray['700'] : '',
                                    color: data.type === 'spot' ? 'white' : theme.palette.gray['600']
                                })}>
                                Spot
                            </SpotPositionBox>
                            <FuturePositionBox
                                onClick={() => setData((prev) => ({ ...prev, type: 'futures' }))}
                                sx={(theme) => ({
                                    backgroundColor: data.type === 'futures' ? theme.palette.gray['700'] : '',
                                    color: data.type === 'futures' ? 'white' : theme.palette.gray['600']
                                })}>
                                Futures
                            </FuturePositionBox>
                        </SignalPositionContent>
                        {data.type === 'futures' && (
                            <SignalShortLongContainer sx={{ mt: '20px' }}>
                                <LongPositionBox
                                    onClick={() => setData((prev) => ({ ...prev, size: 'long' }))}
                                    sx={(theme) => ({
                                        backgroundColor: data.size === 'long' ? theme.palette.green['500'] : '',
                                        color: data.size === 'long' ? 'white' : theme.palette.gray['600']
                                    })}>
                                    Long
                                </LongPositionBox>
                                <ShortPositionBox
                                    onClick={() => setData((prev) => ({ ...prev, size: 'short' }))}
                                    sx={(theme) => ({
                                        backgroundColor: data.size === 'short' ? theme.palette.red['500'] : '',
                                        color: data.size === 'short' ? 'white' : theme.palette.gray['600']
                                    })}>
                                    Short
                                </ShortPositionBox>
                            </SignalShortLongContainer>
                        )}
                    </SignalPositionContainer>

                    <SelectedMarketContainer sx={{ mt: "16px" }}>
                        <SelectedMarketMobile>
                            <Typography sx={(theme) => ({ color: theme.palette.gray['400'] })}>Pair</Typography>
                            {
                                isMobile &&
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', p: "2px 1rem" }}>
                                    <Typography sx={(theme) => ({ color: theme.palette.gray['600'], fontSize: '14px' })}>
                                        Binance
                                    </Typography>
                                    {icons["binance"]}
                                </Box>
                            }
                        </SelectedMarketMobile>
                        <SelectedMarketContent>
                            <Typography sx={(theme) => ({ color: theme.palette.gray['400'] })}>BTCUSDT</Typography>
                            {
                                !isMobile &&
                                <SelectedMarketIcon>
                                    <Typography sx={(theme) => ({ color: theme.palette.gray['600'], fontSize: '14px' })}>
                                        Binance
                                    </Typography>
                                    {icons["binance"]}
                                </SelectedMarketIcon>
                            }

                            <SelectedMarketDetails>
                                <Typography sx={(theme) => ({ color: theme.palette.gray['400'], fontSize: '12px' })}>
                                    Current price:
                                </Typography>
                                <Typography sx={(theme) => ({ color: theme.palette.gray['600'] })}>10612</Typography>
                                <Typography sx={(theme) => ({ color: theme.palette.green['600'] })}>8.85</Typography>
                            </SelectedMarketDetails>
                        </SelectedMarketContent>
                    </SelectedMarketContainer>

                    <TimeFrameContainer sx={{ mt: "16px" }}>
                        <TimeFrameContent>
                            <Typography>Time frame</Typography>
                            <Typography sx={{
                                p: "10px",
                                borderRadius: "12px",
                                bgcolor: theme.palette.gray["200"]
                            }}>
                                4H
                            </Typography>
                        </TimeFrameContent>
                        <Dropdown
                            label='Term'
                            required
                            options={[{ label: 'Short Term', value: 'Short_Term' }]}
                            onSelect={(e: any) => setData((prev) => ({ ...prev, term: e.value }))}
                            labelsx={{ color: theme.palette.gray["700"] }}
                        />
                    </TimeFrameContainer>

                    {
                        isMobile &&
                        <StyledTabs value={targetTab} onChange={handleTargetTabChange}>
                            <StyledTab value={TargetTabs.EntryPrice} label={TargetTabs.EntryPrice} wrapped />
                            <StyledTab value={TargetTabs.Target} label={TargetTabs.Target} wrapped />
                        </StyledTabs>
                    }

                    {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
                    {/* Entry + Target Fields */}
                    <EntryTargetContainer sx={{ mt: "16px" }}>
                        {/* Entry Fields */}
                        <EntryContent sx={{
                            display: { xs: targetTab === TargetTabs.EntryPrice ? 'flex' : 'none', sm: "flex" },
                        }}>
                            <SplittedTitle sx={{ display: { xs: "none", sm: "flex" } }}>Entry</SplittedTitle>
                            <List>
                                <TransitionGroup>
                                    {data.entryPrice.map((_item, index) => (
                                        <Collapse key={index}>
                                            <EntryInput
                                                type='number'
                                                label={'Entry' + (index + 1)}
                                                onInput={(e) => onEntryInputChanged(e, index)}
                                                // hasRemove={index > 0 && index === data.entryPrice.length - 1}
                                                hasRemove={index > 0}
                                                onRemove={() => handleRemoveEntry(index)}
                                                sx={{
                                                    transition: 'all 0.5s ease-in-out',
                                                    transform: removingIndex?.entry === index ? 'scale(0)' : 'scale(1)',
                                                }}
                                            />
                                        </Collapse>
                                    ))}
                                </TransitionGroup>
                            </List>
                            {
                                (data.entryPrice.length < 5) &&
                                <PlusInput
                                    fullWidth
                                    onAdd={onAddEntry}
                                    label={'Entry' + (data.entryPrice.length + 1)}
                                />
                            }
                        </EntryContent>

                        {/* Target Fields */}
                        <TargetContent sx={{
                            display: { xs: targetTab === TargetTabs.Target ? 'flex' : 'none', sm: "flex" },
                        }}>
                            <SplittedTitle sx={{ display: { xs: "none", sm: "flex" } }}>Target</SplittedTitle>
                            <List>
                                <TransitionGroup>
                                    {data.target.map((_item, index) => (
                                        <Collapse key={index}>
                                            <TargetInput
                                                type='number'
                                                label={'Target' + (index + 1)}
                                                onInput={(e) => onTargetInputChanged(e, index)}
                                                // hasRemove={index > 0 && index === data.entryPrice.length - 1}
                                                hasRemove={index > 0}
                                                onRemove={() => handleRemoveTarget(index)}
                                                sx={{
                                                    transition: 'all 0.5s ease-in-out',
                                                    transform: removingIndex?.target === index ? 'scale(0)' : 'scale(1)',
                                                }}
                                            />
                                        </Collapse>
                                    ))}
                                </TransitionGroup>
                            </List>
                            {
                                (data.target.length < 5) &&
                                <PlusInput
                                    fullWidth
                                    onAdd={onAddTarget}
                                    label={'Target' + (data.target.length + 1)}
                                />
                            }
                        </TargetContent>
                    </EntryTargetContainer>
                    {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}

                    {data.type == 'futures' &&
                        <SignalSlider
                            sx={{ mt: "20px" }}
                            title='Leverage'
                        />
                    }
                    <StoplossCapitalContainer sx={{ mt: '16px' }}>
                        <Box sx={{ width: '100%' }}>
                            <Input label='Stoploss' required placeholder='Enter Stoploss' />
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <Input
                                label='Capital'
                                required
                                placeholder='Enter Capital'
                                sx={{
                                    "&.MuiTextField-root": {
                                    }
                                }}
                                helperText={
                                    <CapitalView>
                                        <RiErrorWarningFill style={{ width: "18px", height: "18px" }} />
                                        <Typography variant='caption'whiteSpace={"pre-wrap"}>
                                            The total amount of your capital input to the market
                                        </Typography>
                                    </CapitalView>
                                }
                            />
                        </Box>
                    </StoplossCapitalContainer>

                    <Box
                        sx={{
                            width: "100%",
                            height: "60px",
                            mt: 2
                        }}
                    />
                </DraggableContent>
                {!isMobile &&
                    <SubmitContainer sx={{ mt: "32px" }}>
                        <SignalFormSubmit
                            onSchedule={onSchedule}
                            submitText='Post'
                        />
                    </SubmitContainer>
                }

            </DraggableLayout>

        </>
    );
};

export default SignalFormModal;
