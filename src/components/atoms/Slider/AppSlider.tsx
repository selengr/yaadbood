import { StyledSlider } from "./slider.style";

function valuetext(value: number) {
    return `${value}x`;
}

const AppSlider: React.FC = (props) => {
    return (
        <StyledSlider
            aria-label="Temperature"
            defaultValue={5}
            getAriaValueText={valuetext}
            valueLabelFormat={valuetext}
            valueLabelDisplay="auto"
            shiftStep={4}
            step={1}
            marks={[
                { value: 5 },
                { value: 10 },
                { value: 15 },
                { value: 20 },
            ]}
            min={0}
            max={20}
            {...props}
        />
    );
}

export default AppSlider;