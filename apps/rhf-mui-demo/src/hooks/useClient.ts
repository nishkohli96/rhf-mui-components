import { useState, useEffect } from 'react';

export function useClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if(!isClient) {
    return null;
  }
}
