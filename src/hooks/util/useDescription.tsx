import { useMemo, useState } from "react";

const MinMaxDescriptions = {
    min: 10,
    max: 3000
}

const useDescription = () => {

    const [descriptionParams, updateDescriptionParams] = useState({
        min: 0,
        max: 0,
        value: ""
    });

    function onDescriptionChanged(e: any) {
        updateDescriptionParams({
            ...MinMaxDescriptions, value: e.target.value
        })
    }

    const descriptionHandler = useMemo(() => {
        const { min, max, value } = descriptionParams;
        let error = "";
        if (value.length > max) {
            error = 'You have exceeded the maximum character limit';
        }
        else if (value.length < min) {
            error = `Description must be at least ${min} characters long`;
        }

        const counter = value.length <= MinMaxDescriptions.max ? (
            `${value.length} / ${MinMaxDescriptions.max}`
        ) :
            MinMaxDescriptions.max - value.length

        const a = value.length > 0;
        const b = (value.length > MinMaxDescriptions.max) || (value.length < MinMaxDescriptions.min);

        return {
            counter,
            textLengthError: a && b,
            msg: `At least ${MinMaxDescriptions.min} Characters`,
            error,
            length: value.length,
            value
        }

    }, [descriptionParams])

    return {
        onDescriptionChanged,
        descriptionHandler,
    };
}

export default useDescription;