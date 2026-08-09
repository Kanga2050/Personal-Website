import { useEffect, useState } from 'react';

/** Subscribes to a media query and re-renders when it flips. */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia?.(query).matches ?? false,
  );

  useEffect(() => {
    const list = window.matchMedia?.(query);
    if (!list) return undefined;

    const onChange = (event) => setMatches(event.matches);
    setMatches(list.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};

export default useMediaQuery;
