'use client';

import { DocSearch } from '@docsearch/react';
import { envVariables } from '@/constants';
import '@docsearch/css/dist/style.css';

/**
 * Algolia DocSearch trigger + modal. Renders nothing when the env vars
 * aren't configured (e.g. a local checkout without `.env` filled in) instead
 * of throwing — DocSearch requires all three to be non-empty strings.
 */
const SearchBar = () => {
  const { appId, apiKey, indexName } = envVariables.algoliaConfig;
  if (!appId || !apiKey || !indexName) {
    return null;
  }

  return (
    <DocSearch
      appId={appId}
      apiKey={apiKey}
      indices={[indexName]}
    />
  );
};

export default SearchBar;
