import { FormWrapperStyle, FormHeader } from "./formStyles";

// export default function FormHeader({ children }) {
//   return <FormHeader>{children}</FormHeader>;
// }

export default function FormWrapper({ children }) {
  return (
    <FormWrapperStyle>
      <FormHeader>Form Header</FormHeader>
      {children}
    </FormWrapperStyle>
  );
}

// statusText={status}
