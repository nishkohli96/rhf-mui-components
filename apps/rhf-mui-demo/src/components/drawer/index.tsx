import { Fragment } from 'react';
import Link from 'next/link';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DocsPageLinks } from '@/constants';
import { Accordion } from '@/components';

export function DrawerContent() {
  return (
    <Paper
      sx={{
        height: '100%',
        borderRadius: 0,
        paddingTop: '10px'
      }}
    >
      {DocsPageLinks.map(docsPage => {
        const isNestedPage = Boolean(docsPage.pages);
        return (
          <Fragment key={docsPage.title}>
            <Accordion
              page={docsPage}
              isNested={isNestedPage}
            />
          </Fragment>
        );
      })}
    </Paper>
  );
}
