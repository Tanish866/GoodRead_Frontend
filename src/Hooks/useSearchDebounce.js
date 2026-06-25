import { useCallback,useEffect, useRef } from "react";

export default function useSearchDebounce(searchQuery, onSearch, onClear, bookList) {
    const debounceTimer = useRef(null);
    const throttleTimer = useRef(null);
    const lastThrottleCall = useRef(0);

    const throttledSearch = useCallback((query) => {
        const now = Date.now();
        const timeSinceLastCall = now - lastThrottleCall.current;
        const THROTTLE_LIMIT = 1000;

        if (timeSinceLastCall >= THROTTLE_LIMIT) {
            lastThrottleCall.current = now;
            onSearch(query);
        } else {
            if (throttleTimer.current) clearTimeout(throttleTimer.current);
            throttleTimer.current = setTimeout(() => {
                lastThrottleCall.current = Date.now();
                onSearch(query);
            }, THROTTLE_LIMIT - timeSinceLastCall);
        }
    }, [onSearch]);

    useEffect(() => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        if (searchQuery.trim().length === 0) {
            onClear();
            return;
        }

        debounceTimer.current = setTimeout(() => {
            throttledSearch(searchQuery);
        }, 400);

        return () => {
            clearTimeout(debounceTimer.current);
            clearTimeout(throttleTimer.current);
        };
    }, [searchQuery, throttledSearch, onClear]);

    function getSuggestions() {
        if (searchQuery.trim().length === 0) return [];
        return bookList
            .filter((book) =>
                book.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, 6);
    }

    return { getSuggestions };
}