import { Box, Stack, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '@/components/atoms/Button/Button';
import DashedBorderSVG from '@/components/General/DashedBorderSVG';

interface CategorySelectionProps {
  items: { id: string; name: string }[]; 
  selectedOptions: string[]; 
  onCatSelectClick: (id: string) => void; 
  
}

export default function CategoryList({ items, selectedOptions, onCatSelectClick }: CategorySelectionProps) {
  const isOptionSelected = (id: string): boolean => {
    return selectedOptions.includes(id);
  };
//qc code: this scroll logic can be a hook or component 
  const scrollRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX: number, scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown = true;
    startX = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust drag speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <Stack
      ref={scrollRef}
      sx={{
        width: { xs: '100%', lg: 'auto' },
        // , md: '372px'
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        backgroundColor: '#F5F6FA',
        cursor: 'grab',
        '&::-webkit-scrollbar': { height: '0px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: '#CBD5E1BF', borderRadius: '8px' },
        '&::-webkit-scrollbar-track': { backgroundColor: '#F1F5F9' },
      }}
      flexDirection="row"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        {items.map((item, index) => (
          <Button
            key={index}
            variant="outlined"
            sx={{
              display:{xs:'flex',lg:index>5?'none':'flex'},
              borderRadius: '8px',
              border: 'none !important',
              backgroundColor: isOptionSelected(item.id) ? '#ffffff' : 'transparent',
              color: isOptionSelected(item.id) ? '#64748B' : '#64748B',
              fontSize: '14px',
              paddingRight: '8px',
              paddingLeft: '8px',
              paddingTop: '5.5px',
              paddingBottom: '5.5px',
              height: '32px',
              minHeight: '32px',
              minWidth:'32px',
              maxHeight: '32px',
              position: 'relative',
              whiteSpace: 'nowrap',
              '&:hover': { backgroundColor: isOptionSelected(item.id) ? '#ffffff' : 'transparent' },
            }}
            onClick={() => onCatSelectClick(item.id)}
          >
            {!isOptionSelected(item.id) && <DashedBorderSVG />}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', zIndex: 1 }}>
              {(!isOptionSelected(item.id) && index !== 0) && <FaPlus style={{ width: '10px', height: '10px' }} />}
              <Typography
                sx={{
                  color: isOptionSelected(item.id) ? '#64748B' : '#94A3B8',
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
    </Stack>
  );
}
