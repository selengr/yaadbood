import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

import Button from '@/components/atoms/Button/Button';
import DashedBorderSVG from '@/components/General/DashedBorderSVG';

interface CategorySelectionProps {
  items: { id: string; name: string }[]; 
  selectedOptions: string[]; 
  toggleHasOnSaved: (status: boolean) => void;
  onCatSelectClick: (id: string) => void; 
  hasOnSaved: boolean;

}

export default function CategorySelection({ items, selectedOptions, onCatSelectClick, hasOnSaved, toggleHasOnSaved }: CategorySelectionProps) {
  const isOptionSelected = (id: string): boolean => {
    return selectedOptions.includes(id);
  };

  return (

    <Stack sx={{ width: { xs: '100%', md: '372px' }, height: { md: '306px' } }} flexDirection={'column'}>
      <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography
          sx={{
            color: '#64748B',
            textAlign: 'center',
            fontSize: '14px',
            lineHeight: '21px',
            margin: '0px',
            padding: '0px'
          }}
        >
          {/* qc: we should use of texts from seperate file */}
          Choose the content category you’re most interested in seeing. You can update these anytime
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginTop: { xs: '16px', sm: '24px' },
            height: 'auto',
          }}
        >
          {items.map((item, index) => (
        item.name!=='All'&&  <Button
              key={index}
              variant="outlined"
              sx={{
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isOptionSelected(item.id) ? '#E2E8F0' : 'transparent',
                color: isOptionSelected(item.id) ? '#94A3B8' : '#64748B',
                fontSize: '14px',
                letterSpacing: '0%',
                textAlign: 'center',
                paddingRight: '8px',
                paddingLeft: '8px',
                height: '32px',
                minHeight: '32px',
                maxHeight: '32px',
                paddingTop: '5.5px',
                paddingBottom: '5.5px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: isOptionSelected(item.id) ? '#E2E8F0' : 'transparent',
                  border: 'none'
                },
              }}
              onClick={() => onCatSelectClick(item.id)}
            >
              {!isOptionSelected(item.id) && (
                <DashedBorderSVG />

              )}
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                {!isOptionSelected(item.id) && <FaPlus style={{ width: '10px', height: '10px' }} />}
                <Typography
                  sx={{
                    color: isOptionSelected(item.id) ? '#94A3B8' : '#64748B',
                    textAlign: 'center',
                    fontSize: '14px',
                    lineHeight: '21px',
                    fontWeight: '500',
                  }}
                >
                  {item.name}
                </Typography>
              </div>
            </Button>
          ))}
        </Box>
        {/* qc code: if cat has been added before in server it doesn't need to call request */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end', width: '100%', height: { xs: '64px' } }}>
          <Button
            onClick={() => { toggleHasOnSaved(false) }}
            disabled={!hasOnSaved}
            sx={{
              backgroundColor: '#1DA1F3',
              color: '#fff',
              width: '72px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '9999px',
              height: '32px',
              minHeight: '32px',
              maxHeight: '32px',
              textTransform: 'none',
            }}
          >
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: '500',
                padding: 0
              }}
            >
              {/* qc: we should use of texts from seperate file */}
              Confirm
            </Typography>
          </Button>

        </Box>
      </Box>
    </Stack >
  );
}
