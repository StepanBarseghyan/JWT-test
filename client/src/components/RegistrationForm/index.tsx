import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import s from "./styles.module.css";
import { RegisterFields } from "../../types/types";
import AuthApi from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../../helpers/validationSchemas";

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFields>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    const { confirmPassword, ...userData } = data;
    await AuthApi.registerUser(userData);
    navigate("/auth/login");
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.fieldBox}>
        <label>Name</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div className={s.fieldBox}>
        <label>Surname</label>
        <input {...register("surname")} />
        {errors.surname && <p>{errors.surname.message}</p>}
      </div>

      <label>Gender</label>
      <div className={s.radioBtns}>
        <div>
          <input type="radio" id="male" value="male" {...register("gender")} />
          <label htmlFor="male">Male</label>
        </div>
        <div>
          <input
            type="radio"
            id="female"
            value="female"
            {...register("gender")}
          />
          <label htmlFor="female">Female</label>
        </div>
        <div>
          <input
            type="radio"
            id="other"
            value="other"
            {...register("gender")}
          />
          <label htmlFor="other">Other</label>
        </div>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>

      <div className={s.fieldBox}>
        <label>Username</label>
        <input {...register("username")} />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div className={s.fieldBox}>
        <label>Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div className={s.fieldBox}>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div className={s.fieldBox}>
        <label>Confirm Password</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit">Register</button>
      <span className={s.link}>
        Already have an account? <Link to={"/auth/login"}>Login now</Link>
      </span>
    </form>
  );
};

export default RegistrationForm;
