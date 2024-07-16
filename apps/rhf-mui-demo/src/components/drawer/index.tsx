import { Fragment } from 'react';
import Link from 'next/link';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { DocsPageLinks } from '@/constants';
import { Accordion } from '@/components';

export function Drawer() {
  return (
    <Paper
      sx={{
        height: '100%',
        borderRadius: 0,
				paddingTop: '10px'
      }}
    >
      {DocsPageLinks.map((docsPage) => {
        const isNestedPage = Boolean(docsPage.pages);
        return (
          <Fragment key={docsPage.title}>
            {/* {isNestedPage ? (
              <Accordion page={docsPage} />
            ) : (
              <MenuItem>
                <Typography variant="body1">
                  <Link href={docsPage.href}>{docsPage.title}</Link>
                </Typography>
              </MenuItem>
            )} */}
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
