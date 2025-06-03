import { Box, IconButton, Input, Typography, useTheme } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';

import Drawer from '@/components/atoms/Drawer/Drawer';
import Dropdown from '@/components/atoms/Dropdown';

import useModal from '@/components/atoms/Modal/useModal';

import SortIcon from '../../../../public/icons/sort.svg';
import ChevronRightIcon from '@/components/atoms/Icon/icons/ChevronRightIcon';
import SearchIcon from '@/components/atoms/Icon/icons/SearchIcon';
import CloseIcon from '@/components/atoms/Icon/icons/CloseIcon';

const SubscriptionsHeader = ({
  followingsLength,
  search,
  setSearch,
  setSort,
  sort
}: {
  search: string;
  sort: 'oldest' | 'recently' | 'popular';
  setSort: Dispatch<SetStateAction<'oldest' | 'recently' | 'popular'>>;
  setSearch: Dispatch<SetStateAction<string>>;
  followingsLength: number;
}) => {
  const theme = useTheme();
  const { isMobile } = useModal();
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (value: any) => {
    setSort(value);
    setIsSortDrawerOpen(false);
  };

  const handleSearchIconClick = () => {
    setIsSearchActive(true);
  };

  const handleBackClick = () => {
    setIsSearchActive(false);
    setSearch(''); // Clear the search input if needed
  };

  const handleClearSearch = () => {
    setSearch('');
  };

  if (isMobile) {
    return (
      <Box
        sx={(theme) => ({
          display: { xs: 'flex', sm: 'none' },
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
          borderBottom: '1px solid',
          borderColor: theme.palette.gray['100']
        })}>
        {isSearchActive ? (
          // Search Mode
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
            <IconButton onClick={handleBackClick} sx={{ transform: 'rotate(180deg)' }}>
              <ChevronRightIcon />
            </IconButton>
            <Box
              sx={(theme) => ({
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#f1f5f9',
                borderRadius: '35px',
                padding: '2px 12px',
                svg: { stroke: theme.palette.gray[400], width: '16px', height: '16px' }
              })}>
              <SearchIcon />
              <Input
                value={search}
                onChange={handleSearchChange}
                placeholder='Search'
                sx={(theme) => ({
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  '::placeholder': { color: theme.palette.gray[400] },
                  '::before': { display: 'none', background: 'transparent' },
                  '::after': { display: 'none', background: 'transparent' }
                })}
              />
              {search ? (
                <IconButton
                  sx={{
                    svg: { stroke: theme.palette.neutrals.content, width: '10px', height: '10px' },
                    borderRadius: 9999,
                    backgroundColor: theme.palette.gray[500],
                    padding: '4px'
                  }}
                  onClick={handleClearSearch}>
                  <CloseIcon />
                </IconButton>
              ) : null}
            </Box>
          </Box>
        ) : (
          // Default Mode
          <>
            {/* Title */}
            <Typography
              variant='h4'
              sx={(theme) => ({
                color: theme.palette.gray['700'],
                fontSize: '18px',
                lineHeight: '27px',
                fontWeight: 500
              })}>
              {followingsLength} Subscriptions
            </Typography>

            {/* Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Search Button */}
              <IconButton
                sx={{
                  svg: {
                    width: '16px',
                    height: '16px',
                    stroke: theme.palette.gray[700]
                  },
                  padding: 0
                }}
                onClick={handleSearchIconClick}>
                <SearchIcon />
              </IconButton>

              {/* Sort Button */}
              <IconButton
                sx={{
                  svg: {
                    width: '16px',
                    height: '16px',
                    stroke: theme.palette.gray[700],
                    fill: theme.palette.gray[700]
                  },
                  padding: 0
                }}
                onClick={() => setIsSortDrawerOpen(true)}>
                <SortIcon />
              </IconButton>
            </Box>

            {/* Sort Drawer */}
            <Drawer
              open={isSortDrawerOpen}
              onClose={() => setIsSortDrawerOpen(false)}
              backgroundColor='background.paper'>
              <Box sx={{ padding: '16px' }}>
                <Typography
                  variant='h6'
                  sx={(theme) => ({
                    marginBottom: '18px',
                    color: theme.palette.gray['700'],
                    fontWeight: 600
                  })}>
                  Sort By
                </Typography>
                {['recently', 'oldest', 'popular'].map((option) => (
                  <Typography
                    key={option}
                    variant='body1'
                    onClick={() => handleSortChange(option)}
                    sx={{
                      padding: '8px 0',
                      cursor: 'pointer',
                      color: sort === option ? 'primary.main' : 'gray.700',
                      fontWeight: 600
                    }}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Typography>
                ))}
              </Box>
            </Drawer>
          </>
        )}
      </Box>
    );
  }

  // Desktop rendering remains unchanged
  return (
    <Box
      sx={(theme) => ({
        display: { xs: 'none', sm: 'flex' },
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: '20px',
        borderBottom: '1px solid',
        borderColor: theme.palette.gray['100']
      })}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
        <Typography
          variant='h4'
          sx={(theme) => ({
            color: theme.palette.gray['700'],
            fontSize: '20px',
            lineHeight: '30px',
            fontWeight: 500
          })}>
          {followingsLength} Subscriptions
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'gray.500',
            fontSize: '14px',
            lineHeight: '21px',
            fontWeight: 500,
            gap: '4px',
            whiteSpace: 'nowrap'
          }}>
          <Typography variant='caption'>Sort by</Typography>
          <Dropdown
            sx={{
              minWidth: '75px !important',
              '& .MuiTypography-root': {
                fontSize: '14px !important',
                color: 'gray.500'
              },
              '& .MuiSelect-select': {
                paddingLeft: '4px !important',
                paddingRight: '24px !important',
                // marginBottom: '4px !important',
                width: 'auto !important'
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '0px !important',
                border: 'none !important'
              }
            }}
            selectedValues={sort}
            onSelect={handleSortChange}
            options={[
              { label: 'Recently', value: 'recently' },
              { label: 'Oldest', value: 'oldest' },
              { label: 'Popular', value: 'popular' }
            ]}
          />
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#f1f5f9',
          borderRadius: '35px',
          padding: '6px 12px',
          svg: { stroke: theme.palette.gray[400], width: '16px', height: '16px' }
        })}>
        <SearchIcon />
        <Input
          value={search}
          onChange={handleSearchChange}
          placeholder='Search by name'
          sx={(theme) => ({
            border: 'none',
            outline: 'none',
            '::placeholder': { color: theme.palette.gray[400] },
            '::before': { display: 'none', background: 'transparent' },
            '::after': { display: 'none', background: 'transparent' }
          })}
        />
      </Box>
    </Box>
  );
};

export default SubscriptionsHeader;
