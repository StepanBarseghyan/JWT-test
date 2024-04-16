import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  gender: yup.string().required("Gender is required"),
  username: yup
    .string()
    .min(8, "Username must be at least 8 characters")
    .required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/,
      "Password must contain at least one letter and one number"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});
