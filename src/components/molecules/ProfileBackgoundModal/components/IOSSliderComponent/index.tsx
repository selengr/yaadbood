// React & libs
import Box from '@mui/material/Box';
// components
import { Button } from '@/components/atoms';
// style
import {
    RotateSlider,
    StyledSliderValue,
    StyledSliderControls,
    StyledSliderContainer,
    StyledSliderValueContainer,
  } from '../BackgroundEditingModal.mobile/backgroundEditingModal.mobile.style';

interface ISliderComponentProps {
    type: 'zoom' | 'straighten'; 
    value: number; 
    onDecrease: () => void; 
    onIncrease: () => void; 
    onChange: (event: Event, newValue: number | number[]) => void; 
  }
  
  export const SliderComponent: React.FC<ISliderComponentProps> = ({ type, value, onDecrease, onIncrease, onChange }) => (
    <StyledSliderContainer>
      <Box sx={{ width: '100%' }}>
        <StyledSliderValueContainer>
          <StyledSliderValue>{value}{type === 'zoom' ? 'x' : ''}</StyledSliderValue>
        </StyledSliderValueContainer>
        <StyledSliderControls>
          <Button variant='text' color='neutrals.content' onClick={onDecrease}>-</Button>
          <RotateSlider
            value={value}
            valueLabelDisplay='auto'
            min={type === 'zoom' ? 1 : -45}
            max={type === 'zoom' ? 7 : 45}
            step={type === 'zoom' ? 0.1 : 1}
            marks
            onChange={onChange}
          />
          <Button variant='text' color='neutrals.content' onClick={onIncrease}>+</Button>
        </StyledSliderControls>
      </Box>
    </StyledSliderContainer>
  );