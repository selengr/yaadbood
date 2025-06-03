import { Box } from '@mui/material';
import React from 'react';

interface Props {
  images: string[] | null;
}

const ImageData: React.FC<Props> = ({ images }) => {
  if (!images || images.length === 0) return null;
  const count = images.length;

  // 1. ONE IMAGE: Full width, fixed height 696px.
  if (count === 1) {
    return (
      <Box
        sx={{ width: '100%', height: { xs: '343px', md: '696px' }, overflow: 'hidden', borderRadius: '6px' }}>
        <img src={images[0]} alt='Image 1' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>
    );
  }

  // 2. TWO IMAGES: Side-by-side, each 50% width and height 347px.
  if (count === 2) {
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: { xs: '170px', md: '347px' },
          overflow: 'hidden',
          borderRadius: '6px'
        }}>
        {images.map((img, index) => (
          <div key={index} style={{ flex: 1, overflow: 'hidden' }}>
            <img
              src={img}
              alt={`Image ${index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
      </Box>
    );
  }

  // 3. THREE IMAGES:
  //    Left: fixed width 66.6%, height 696px.
  //    Right: two images vertically (each 696/2 = 348px tall).
  if (count === 3) {
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          backgroundColor: 'red',
          height: { xs: '343px', md: '696px' },
          overflow: 'hidden',
          borderRadius: '6px'
        }}>
        {/* Left image */}
        <div style={{ flex: 2, height: '100%', overflow: 'hidden' }}>
          <img src={images[0]} alt='Image 1' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        {/* Right column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <img
              src={images[1]}
              alt='Image 2'
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <img
              src={images[2]}
              alt='Image 3'
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </Box>
    );
  }

  // 4. Four (or more) IMAGES:
  //    Left: fixed as above.
  //    Right: four images, each 1/4 of 696px (174px tall).
  //         If more than 5 images, overlay on the last right image shows the extra count.
  const extra = count - 4; // extra images beyond the five displayed
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: { xs: '343px', md: '696px' },
        overflow: 'hidden',
        borderRadius: '6px'
      }}>
      {/* Left image */}
      <div style={{ width: '66.6%', height: '100%', overflow: 'hidden' }}>
        <img src={images[0]} alt='Image 1' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      {/* Right column */}
      <div style={{ width: '33.3%', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <img
              src={images[i]}
              alt={`Image ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* On the fourth right image (i === 4) overlay extra count if needed */}
            {i === 3 && extra > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}>
                +5
              </div>
            )}
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ImageData;
