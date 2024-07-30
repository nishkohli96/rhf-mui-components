import Link from 'next/link';
import MuiAccordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Page } from '@/types';
import classes from './accordion.module.css';

type AccordionProps = {
  page: Page;
  isNested: boolean;
};

export function Accordion({ page, isNested }: AccordionProps) {
  return (
    <MuiAccordion sx={{ boxShadow: 'none', border: 'none' }} disableGutters>
      <AccordionSummary
        expandIcon={isNested ? <KeyboardArrowDownIcon /> : undefined}
      >
        <Typography>
          {isNested ? page.title : <Link href={page.href}>{page.title}</Link>}
        </Typography>
      </AccordionSummary>
      {isNested && (
        <AccordionDetails classes={{ root: classes.accordionDetailsRoot }}>
          {page.pages?.length &&
            page.pages.map((page) => (
              <Typography className={classes.nestedItem} key={page.title}>
                <Link href={page.href}>{page.title}</Link>
              </Typography>
            ))}
        </AccordionDetails>
      )}
    </MuiAccordion>
  );
}
