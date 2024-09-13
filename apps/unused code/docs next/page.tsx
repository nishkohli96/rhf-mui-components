import Grid from '@mui/material/Grid';
import {
  GridContainer,
  PageHeading,
  Paragraph,
  Link,
  Table,
} from '@/components';
import { ExternalLinks, PropsDesc } from '@/constants';

export default function DocsPage() {
  console.log(Object.values(PropsDesc));
  return (
    <GridContainer>
      <Grid item />
      <PageHeading title="Introduction" />
      <Paragraph>
        This library makes easier to integrate
        {' '}
        <Link href={ExternalLinks.rhf.home}>react-hook-form</Link>
        {' '}
        with
        {' '}
        <Link href={ExternalLinks.mui}>Material-UI</Link>
        {' '}
        by providing a suite
        of reusable and customizable mui components, thus helping you reduce
        code duplicacy and providing the flexibility to create form fields as
        per your website&apos;s design.
      </Paragraph>
      <PageHeading title="Working" />
      <Paragraph>
        Each component requires some common props which are listed in the table
        below along with its description. Remaining component props include the
        props specific to that material-ui component, say Textfield, and can be
        viewed in the documentation page for that component.
      </Paragraph>
      <Table rows={Object.values(PropsDesc)} isLastColDesc />
    </GridContainer>
  );
}
