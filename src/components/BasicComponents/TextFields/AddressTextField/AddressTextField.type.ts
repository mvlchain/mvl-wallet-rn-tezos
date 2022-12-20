export interface IAddressTextFieldProps {
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  label?: string;
  gotoScan?: Function;
  setParentValid: (valid: boolean) => void;
}
