import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { ConfigProvider, RHFDatePicker } from '@nish1896/rhf-mui-components';
import { StyledRHFTextField } from './StyledTextField';
import {
  FormContainer,
	FieldVariantInfo,
  GridContainer,
  RenderFormState,
  SubmitButton,
} from '@site/src/components';
import { reqdMsg, minCharMsg, maxCharMsg } from '@site/src/utils';

type FormSchema = {
  firstName: string;
  lastName: string;
	dob: Date | null;
};

const initialValues: FormSchema = {
  firstName: '',
  lastName: '',
	dob: null
};

export function StyledReusableComponentForm() {
  const {
    register,
		setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: initialValues,
  });

  function onFormSubmit(formValues: FormSchema) {
    alert(`Form Submitted with values: \n\n ${JSON.stringify(formValues)}`);
  }
  return (
    <FormContainer title="TextField & PasswordInput">
      <ConfigProvider
				defaultFormLabelSx={{
					color: '#007bff'
				}}
				defaultFormHelperTextSx={{
					ml: '12px'
				}}
				dateAdapter={AdapterLuxon}
			>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <GridContainer>
            <Grid item xs={12} md={6}>
              <StyledRHFTextField
                fieldName="firstName"
                register={register}
                registerOptions={{
                  required: {
                    value: true,
                    message: reqdMsg('First Name'),
                  },
                }}
                errorMessage={errors?.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledRHFTextField
                fieldName="lastName"
                register={register}
                registerOptions={{
                  minLength: {
                    value: 4,
                    message: minCharMsg(4),
                  },
                  maxLength: {
                    value: 10,
                    message: maxCharMsg(10),
                  },
                }}
                errorMessage={errors?.lastName?.message}
              />
            </Grid>
						<Grid item xs={6}>
							<FieldVariantInfo title='Date Picker with Luxon adapter' />
							<RHFDatePicker 
								register={register}
								setValue={setValue}
								fieldName='dob'
								label='Date of Birth'
								disableFuture
							/>
						</Grid>
            <Grid item xs={12}>
              <SubmitButton />
            </Grid>
            <Grid item xs={12}>
              <RenderFormState formValues={watch()} errors={errors} />
            </Grid>
          </GridContainer>
        </form>
      </ConfigProvider>
    </FormContainer>
  );
}
