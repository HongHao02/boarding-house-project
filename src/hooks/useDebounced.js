import { useState, useEffect } from 'react';
/**
 * Call when the user search boarding or other users
 * @param {*} value 
 * @param {*} delay 
 * @returns final value
 */
function useDebounced(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handle = setTimeout(() => setDebouncedValue(value), delay);
        // console.log('setTimeout ', value);
        return () => {
            // console.log('clearTimout ', value);
            clearTimeout(handle);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debouncedValue;
}

export default useDebounced;
