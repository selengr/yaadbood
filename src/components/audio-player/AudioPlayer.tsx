import React, { useState, useRef, useEffect } from 'react';
import styles from './AudioPlayer.module.css';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BsArrowRightShort } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import SvgColor from '../svg-color/SvgColor';
import { Box, IconButton, Stack, Typography } from '@mui/material';

interface AudioPlayerProps {
  // Add props type annotations here if needed
}

const AudioPlayer: React.FC<AudioPlayerProps> = () => {
  // state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  // references
  const audioPlayer = useRef<any>(null); // reference our audio component
  const progressBar = useRef<any>(null); // reference our progress bar
  const animationRef = useRef<number>(0); // reference the animation

  useEffect(() => {
    const audio = audioPlayer.current;
    audio.addEventListener('loadedmetadata', () => {
      const seconds = Math.floor(audio.duration);
      setDuration(seconds);
      progressBar.current.max = seconds;
    });
  }, [audioPlayer, audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current?.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current?.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const backThirty = () => {
    const output = progressBar.current;
    if (output) output.value = Number(parseInt(progressBar.current?.value) - 10);

    changeRange();
  };

  const forwardThirty = () => {
    const output = progressBar.current;
    debugger;
    if (output) output.value = Number(parseInt(progressBar.current?.value) + 10);

    changeRange();
  };

  return (
    <Box
      sx={{
        paddingY: 4,
        paddingX: 6,
        borderRadius: '16px',
        height: '48px',
        backgroundColor: 'white',
        display: 'flex',
        direction: 'rtl',
        maxWidth: 450,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // mb: 1,
      }}
    >
      <Stack
        direction="row"
        sx={{
          display: 'flex',
          direction: 'rtl',
          justifyContent: 'center',
          alignItems: 'center',

          // minWidth: 450,

          width: '100%',
        }}
      >
        <audio
          ref={audioPlayer}
          src="https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3"
          preload="metadata"
        ></audio>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // mr: -2,
          }}
        >
          <IconButton
            size="small"
            onClick={togglePlayPause}
            sx={{
              // width: 48,
              // height: 48,
              '&:hover': {
                // color: '#1758BA',
              },
            }}
          >
            <SvgColor
              src={`/assets/icons/svg/ic_audio_backward.svg`}
              className={styles.forwardBackward}
              onClick={backThirty}
              sx={{ color: '#1758BA' }}
            />
          </IconButton>

          <IconButton
            size="small"
            className={styles.playBox}
            onClick={togglePlayPause}
            sx={{
              width: { xs: 38, sm: 45 },
              height: { xs: 38, sm: 45 },
              border: `none`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: { xs: '0 4px', sm: '0 10px' },
              color: '#FFF',
              '&:hover': {},
            }}
          >
            {isPlaying ? <FaPause className={styles.plause} /> : <FaPlay className={styles.play} />}
          </IconButton>

          <IconButton
            size="small"
            onClick={togglePlayPause}
            sx={{
              '&:hover': {
                color: '#1758BA',
              },
            }}
          >
            <SvgColor
              src={`/assets/icons/svg/ic_audio_forward.svg`}
              className={styles.forwardBackward}
              onClick={forwardThirty}
              sx={{ color: '#1758BA' }}
            />
          </IconButton>
        </Box>

        {/* current time */}

        <Stack
          direction="row"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            minWidth: { xs: 80, sm: 80 },
            maxWidth: { xs: 80, sm: 80 },
            mr: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: (theme) => theme.palette.primary.main, minWidth: 30, maxWidth: 30 }}
          >
            {calculateTime(currentTime)}
          </Typography>{' '}
          &nbsp;{' '}
          <Typography variant="body2" sx={{ color: (theme) => theme.palette.primary.main }}>
            / {duration && !isNaN(duration) && calculateTime(duration)}
          </Typography>
        </Stack>

        {/* <div className={styles.currentTime}>{calculateTime(currentTime)}</div> */}

        {/* progress bar */}

        <input
          type="range"
          className={styles.progressBar}
          defaultValue="0"
          ref={progressBar}
          onChange={changeRange}
        />
        {/* </Stack> */}

        <IconButton
          size="small"
          // onClick={togglePlayPause}
          sx={{
            // width: 48,
            // height: 48,
            mr: { xs: 1, sm: 3 },
            '&:hover': {
              color: '#1758BA',
            },
          }}
        >
          <SvgColor
            src={`/assets/icons/svg/ic_audio_speaker.svg`}
            // onClick={forwardThirty}
            sx={{ color: '#1758BA' }}
          />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default AudioPlayer;