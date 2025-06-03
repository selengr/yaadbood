import { Stack, Typography, useTheme } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { GoChevronDown } from "react-icons/go";

enum RiskEnum {
  Low,
  Medium,
  High
}

export default function InputMenus() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: any) => {
    setAnchorEl(null);
  };
  const [risk, setRisk] = React.useState<RiskEnum>(RiskEnum.Low);

  const handleSelect = (index: number) => {
    setRisk(index);
    handleClose(event);
  };

  const selectedRisk = React.useMemo(() => {
    switch (risk) {
      case RiskEnum.Low:
        return { title: "Low risk", color: theme.palette.green["600"] };
      case RiskEnum.Medium:
        return { title: "Mid risk", color: theme.palette.warning["500"] };
      case RiskEnum.High:
        return { title: "High risk", color: theme.palette.red["500"] };
    }
  }, [risk]);

  return (
    <div>
      <Stack
        onClick={handleClick}
        direction={'row'}
        display={'flex'}
        alignItems={'center'}
        gap={'2px'}
        sx={{ cursor: "pointer" }}
      >
        <Typography
          color={selectedRisk.color}>{selectedRisk.title}</Typography>
        <GoChevronDown style={{ color: selectedRisk.color }} />
      </Stack>
      <Menu
        // sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleSelect(RiskEnum.Low)}>
          <Typography color={theme.palette.green["500"]}>Low risk</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleSelect(RiskEnum.Medium)}>
          <Typography color={theme.palette.warning["500"]}>Low risk</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleSelect(RiskEnum.High)}>
          <Typography color={theme.palette.red["500"]}>Low risk</Typography>
        </MenuItem>

      </Menu>
    </div>
  );
}
