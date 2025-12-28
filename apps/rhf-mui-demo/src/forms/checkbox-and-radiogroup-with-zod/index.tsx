'use client';

import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Grid from '@mui/material/Grid2';
import RHFCheckbox from '@nish1896/rhf-mui-components/mui/checkbox';
import RHFCheckboxGroup from '@nish1896/rhf-mui-components/mui/checkbox-group';
import RHFRadioGroup from '@nish1896/rhf-mui-components/mui/radio-group';
import { toast } from 'react-toastify';
import {
  FormContainer,
  FormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton
} from '@/components';
import { CountriesList, formSubmitEventName } from '@/constants';
import { Gender } from '@/types';
import { showToastMessage, logFirebaseEvent } from '@/utils';
import { formSchema, type PersonInfo } from './validation';

type CandidateInfo = PersonInfo & { marks: number[] };

const CheckboxRadioZodForm = () => {
  const pathName = usePathname();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<CandidateInfo>({
    resolver: zodResolver(formSchema)
  });

  async function onFormSubmit(formValues: CandidateInfo) {
    await logFirebaseEvent(formSubmitEventName, { pathName });
    showToastMessage(formValues);
  }

  return (
    <FormContainer title="Checkbox & Radio Group">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <GridContainer>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Radio Group with onValueChange function" />
            <RHFRadioGroup
              fieldName="gender"
              control={control}
              options={Object.values(Gender)}
              onValueChange={newVal => toast.info(`You selected ${newVal}`)}
              required
              errorMessage={errors?.gender?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="CheckboxGroup with options as an array of objects" />
            <RHFCheckboxGroup
              fieldName="countriesVisited"
              label="Select the countries have you visited"
              control={control}
              options={CountriesList}
              labelKey="country"
              valueKey="code"
              required
              errorMessage={errors?.countriesVisited?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="CheckboxGroup with options as an array of numbers" />
            <RHFCheckboxGroup
              fieldName="marks"
              control={control}
              options={['10', '20', '30', '40', '50']}
              required
              errorMessage={errors?.marks?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Single Checkbox" />
            <RHFCheckbox
              fieldName="agreeTnC"
              control={control}
              label="Agree to Terms & Conditions"
              errorMessage={errors?.agreeTnC?.message}
            />
          </Grid>
          <Grid size={12}>
            <SubmitButton />
          </Grid>
          <Grid size={12}>
            <FormState formValues={watch()} errors={errors} />
          </Grid>
        </GridContainer>
      </form>
    </FormContainer>
  );
};

export default CheckboxRadioZodForm;
