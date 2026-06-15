'use client';

import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Grid from '@mui/material/Grid';
import { green } from '@mui/material/colors';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import RHFCheckbox from '@nish1896/rhf-mui-components/mui/checkbox';
import RHFCheckboxGroup from '@nish1896/rhf-mui-components/mui/checkbox-group';
import RHFRadioGroup from '@nish1896/rhf-mui-components/mui/radio-group';
import { toast } from 'react-toastify';
import {
  FormContainer,
  FormState,
  GridContainer,
  FieldVariantInfo,
  SubmitButton,
  ResetButton
} from '@/components';
import { CountriesList, formSubmitEventName } from '@/constants';
import { Colors, Gender } from '@/types';
import { showToastMessage, logFirebaseEvent } from '@/utils';
import { formSchema, type PersonInfo } from './validation';

const ageGroupOptions = [
  { ageGroup: '1-10', minAge: 1 },
  { ageGroup: '11-20', minAge: 11 },
  { ageGroup: '21-30', minAge: 21 },
  { ageGroup: '31-40', minAge: 31 },
  { ageGroup: '41-50', minAge: 41 },
  { ageGroup: '51-60', minAge: 51 },
  { ageGroup: '61+', minAge: 61 },
];

const initialValues = {
  gender: undefined,
  ageGroup: undefined,
  favouriteColors: [],
  countriesVisited: [],
  marks: [],
  agreeTnC: false
};

const CheckboxRadioZodForm = () => {
  const pathName = usePathname();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<PersonInfo>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
  });

  async function onFormSubmit(formValues: PersonInfo) {
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
              onValueChange={({ newValue }) => {
                toast.info(`You selected ${newValue}`);
              }}
              required
              errorMessage={errors?.gender?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Radio Group with options as an array of objects" />
            <RHFRadioGroup
              fieldName="ageGroup"
              control={control}
              options={ageGroupOptions}
              labelKey="ageGroup"
              valueKey="minAge"
              required
              getOptionDisabled={opn => opn.minAge === 61 || opn.minAge === 1}
              errorMessage={errors?.ageGroup?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="CheckboxGroup with options as an array of strings" />
            <RHFCheckboxGroup
              fieldName="favouriteColors"
              label="Select your favourite colors"
              control={control}
              options={Object.values(Colors)}
              formControlLabelProps={{ sx: { color: 'orange' } }}
              checkboxProps={{
                icon: <FavoriteBorder />,
                checkedIcon: <Favorite />,
                sx: {
                  '&.Mui-checked': {
                    color: green[600]
                  }
                }
              }}
              required
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
              renderOption={opn => `${opn.country} (${opn.code})`}
              onValueChange={({ newValue }) => {
                toast.info(`You've visited ${newValue.join(', ')}`);
              }}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="CheckboxGroup with options as an array of numbers" />
            <RHFCheckboxGroup
              fieldName="marks"
              control={control}
              options={[10, 20, 30, 40, 50]}
              customOnChange={({
                rhfOnChange,
                toggledValue,
                event,
                currentValue,
                checked
              }) => {
                if (toggledValue === 20) {
                  event.preventDefault();
                  return;
                }
                if (checked) {
                  rhfOnChange([...currentValue, toggledValue]);
                } else {
                  rhfOnChange(currentValue.filter((v) => v !== toggledValue));
                }
              }}
              required
              getOptionDisabled={opn => opn === 10}
              helperText="Note: 10 is disabled, 20 cannot be selected due to custom onChange logic"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FieldVariantInfo title="Single Checkbox with custom ID" />
            <RHFCheckbox
              fieldName="agreeTnC"
              control={control}
              label="Agree to Terms & Conditions"
              customIds={{
                field: 'terms&Condition'
              }}
            />
          </Grid>
          <Grid size={12}>
            <SubmitButton />
            <ResetButton onClick={() => reset(initialValues)} />
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
