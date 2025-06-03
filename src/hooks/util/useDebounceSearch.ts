
import { useEffect,useState } from 'react'

export const useDebounceSearch = (value: string, delay: number = 300): string => {
    const [debouncedValue, setDebouncedValue] = useState<string>(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}
