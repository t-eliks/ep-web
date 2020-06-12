import { FormikErrors, FormikTouched } from "formik";

export const handleInputChange = (
  fieldName: string,
  setFieldValue?: (fieldName: string, value: string) => void,
  setFieldTouched?: (fieldName: string) => void
) => (event: React.ChangeEvent<HTMLInputElement>) => {
  if (setFieldTouched) {
    setFieldTouched(fieldName);
  }

  if (setFieldValue) {
    setFieldValue(fieldName, event.target.value);
  }
};

export const handleInputChangeValue = (
  fieldName: string,
  value: string,
  setFieldValue?: (fieldName: string, value: string) => void,
  setFieldTouched?: (fieldName: string) => void
) => {
  if (setFieldTouched) {
    setFieldTouched(fieldName);
  }

  if (setFieldValue) {
    setFieldValue(fieldName, value);
  }
};

export const handleOptionChange = (
  fieldName: string,
  setFieldValue?: (fieldName: string, value: any) => void,
  setFieldTouched?: (fieldName: string) => void
) => (option: any) => {
  if (setFieldTouched) {
    setFieldTouched(fieldName);
  }

  if (setFieldValue) {
    setFieldValue(fieldName, option);
  }
};

export function isFormValid<Type>(
  errors: FormikErrors<Type>,
  touched: FormikTouched<Type>
): boolean {
  return (
    Object.keys(errors).filter((error) => {
      return Object.keys(touched).includes(error);
    }).length === 0
  );
}
