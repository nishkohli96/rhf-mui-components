import MarkdownTable from '@site/src/components/markdown-table';
import { PropsDescription } from '@site/src/constants';
import { type VersionProps } from '@site/src/types';

const RHFNumberInputPropsTable = ({ v4AndAbove }: VersionProps) => {
  const tableRows = [
    PropsDescription.fieldName,
    PropsDescription.control,
    PropsDescription.registerOptions,
    ...(v4AndAbove
      ? [PropsDescription.customOnChange_Inputs]
      : []
    ),
    PropsDescription.onValueChange_numberInput,
    ...(v4AndAbove
      ? [PropsDescription.maxDecimalPlaces, PropsDescription.stepAmount]
      : []),
    PropsDescription.label,
    PropsDescription.showLabelAboveFormField,
    ...(v4AndAbove ? [PropsDescription.hideLabel]: []),
    PropsDescription.formLabelProps,
    PropsDescription.showMarkers,
    PropsDescription.errorMessage,
    PropsDescription.hideErrorMessage,
    PropsDescription.formHelperTextProps
  ];

  return <MarkdownTable rows={tableRows} showType />;
};

export default RHFNumberInputPropsTable;
