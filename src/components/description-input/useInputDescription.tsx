import { useMemo, useState } from "react";

const MinMaxDescriptions = {
    min: 20,
    max: 3000
}

const useInputDescription = () => {

    const [descriptionParams, updateDescriptionParams] = useState({
        min: 0,
        max: 0,
        charLength: 0
    });

    const onDescriptionLengthChanged = (charLength: number) => {
        updateDescriptionParams({
            ...MinMaxDescriptions, charLength
        })
    }

    const descriptionHandler = useMemo(() => {
        const { min, max, charLength } = descriptionParams;
        let error = "";
        if (charLength > max) {
            error = 'You have exceeded the maximum character limit';
        }
        else if (charLength < min) {
            error = `Description must be at least ${min} characters long`;
        }

        const counter = charLength <= MinMaxDescriptions.max ? (
            `${charLength.toLocaleString()} / ${MinMaxDescriptions.max.toLocaleString()}`
        ) :
            (MinMaxDescriptions.max - charLength).toLocaleString();

        const a = charLength > 0;
        const b = (charLength > MinMaxDescriptions.max) || (charLength < MinMaxDescriptions.min);

        return {
            counter,
            textLengthError: a && b,
            msg: `At least ${MinMaxDescriptions.min} Characters`,
            error,
        }

    }, [descriptionParams])

    return {
        onDescriptionLengthChanged,
        descriptionHandler,
    };
}

export default useInputDescription;