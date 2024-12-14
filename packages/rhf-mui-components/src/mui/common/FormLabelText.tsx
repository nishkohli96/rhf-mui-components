import { ReactNode } from 'react';

type FormLabelTextProps = {
  label: ReactNode;
  required?: boolean;
}

const FormLabelText = ({ label, required }: FormLabelTextProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {label}
      {required && (
        <span className="MuiFormLabel-asterisk MuiInputLabel-asterisk">
					&nbsp;*
        </span>
      )}
    </div>
  );
};

export default FormLabelText;
