import React, { useEffect, useState } from 'react';
import CheckboxRadioZodForm from './Form';

function MyFormWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <CheckboxRadioZodForm />;
}

export default MyFormWrapper;
