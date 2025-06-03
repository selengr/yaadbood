import { IconButton, List, ListItem, ListItemText, useTheme } from '@mui/material';

const times: string[] = ['1 day', '3 day', '1 week', '2 week', 'unlimited'];

interface TimeMenuProps {
  onChange?: (value: string) => void;
  value: string;
}

const TimeMenu: React.FC<TimeMenuProps> = ({ onChange, value }) => {
  const theme = useTheme();

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: theme.palette.background.paper,
        borderRadius: theme.spacing(1)
      }}>
      {times.map((time) => (
        <ListItem
          secondaryAction={
            <IconButton edge='end' aria-label='check'>
              {/* Optionally, you can add an icon to indicate selection */}
            </IconButton>
          }
          sx={{ cursor: 'pointer', pr: '16px' }}
          key={time}
          onClick={() => onChange?.(time)}>
          <ListItemText
            primary={time}
            sx={{
              color:
                value === time || (value === null && time === 'unlimited')
                  ? theme.palette.primary.main
                  : 'inherit'
            }}
          />
          {value === time || (value === null && time === 'unlimited') ? (
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12.6663 4.79199L6.24967 11.2087L3.33301 8.29199'
                stroke='#1DA1F3'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          ) : null}
        </ListItem>
      ))}
    </List>
  );
};

export default TimeMenu;
