import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { setTweetData, TweetCreationState } from '@/redux/slices/tweetCreationSlice';
import { AppDispatch, RootState } from '@/redux/store';
import CloseIcon from '../atoms/Icon/icons/CloseIcon';


export default function QuestionBox() {
  const theme = useTheme();
  const tweetDraft = useSelector<RootState, TweetCreationState>((state) => state.tweetCreation);

  const dispatch = useDispatch<AppDispatch>();

  if (!tweetDraft?.pole) return null;

  return (
    <Stack flexDirection={'column'} gap={1}>
      <Stack flexDirection={'row'} gap={1} justifyContent={'end'}>
        <IconButton
          onClick={() => {
            dispatch(
              setTweetData({
                pole: null
              })
            );
          }}
          sx={{
            background: theme.palette.gray[900],
            ':hover': {
              background: theme.palette.gray[700]
            }
          }}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Card
        variant='outlined'
        sx={{
          border: `1px solid ${theme.palette.gray[200]}`,
          borderRadius: theme.spacing(2),
          p: 0
        }}>
        <CardHeader
          title={
            <Typography
              align='center'
              variant='h6'
              color={theme.palette.neutrals.page}
              fontWeight={500}
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                wordBreak: 'break-word'
              }}
              fontSize={'14px'}>
              {tweetDraft?.pole?.question}
            </Typography>
          }
          sx={{
            py: 1.5,
            backgroundColor: theme.palette.gray[700]
          }}
        />
        <CardContent sx={{ p: 0, '&:last-child': { paddingBottom: 0 } }}>
          <List sx={{ gap: 1.5, display: 'flex', flexDirection: 'column', p: 2 }}>
            {tweetDraft?.pole?.answers?.map((item) => (
              <ListItem
                sx={{
                  padding: theme.spacing(1.5),
                  background: theme.palette.gray[100],
                  borderRadius: theme.spacing(1.5),
                  fontSize: '12px',
                  fontWeight: 600
                }}
                key={item}
                disablePadding>
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: 'gray.900' }}>{item}</Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Stack>
  );
}
