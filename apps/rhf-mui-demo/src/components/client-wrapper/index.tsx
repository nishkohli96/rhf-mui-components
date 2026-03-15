/**
 * Upgrading to Next v16 crashed all my forms. This component wraps the
 * client components to prevent prerender error during build.
 *
 * Eg: const AutocompleteForm = clientOnly(() => import('@/forms/autocomplete'));
 * <AutocompleteForm defaultCountry="IN" />
 */

'use client';

import { ComponentType, Fragment } from 'react';
import dynamic from 'next/dynamic';

type Props = {
  importer: () => Promise<{ default: ComponentType<any> }>;
};

export default function ClientWrapper({ importer }: Props) {
  const Component = dynamic(importer, { ssr: false });

  return (
    <Fragment>
      <Component />
    </Fragment>
  );
}
