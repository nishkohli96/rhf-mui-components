# RHFSelect
now required control instead of register
  onValueChange?: (e: SelectChangeEvent_SelectValueType_, newValue: SelectValueType, child: ReactNode) => void;
add registerOptions to
- RHFCheckbox
- RHFCheckboxGroup
- RHFRadioGroup
- RHFSwitch
- RHFSlider

added `errorMessage`, `helprText` to RHFSwitch