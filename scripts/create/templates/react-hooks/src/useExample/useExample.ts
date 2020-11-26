import { useState, useCallback } from 'react';

export const useExample = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(
    () => setCount((prevCount) => prevCount + 1),
    []
  );

  return { count, increment };
};
