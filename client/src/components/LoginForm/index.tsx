import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import s from "./styles.module.css";
import { AxiosError } from "axios";
import { LoginFields } from "../../types/types";
import AuthApi from "../../services/authService";
import InputField from "../InputField";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm: React.FC = () => {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    console.log(123);
    try {
      await AuthApi.loginUser(data);
      navigate("/profile");
    } catch (error: any) {
      const err = error as AxiosError<any>;
      setServerError(err?.response?.data.message);
    }
  };
  const handleInput = () => {
    setServerError("");
  };

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Username"
          type="text"
          register={register("username")}
          onInput={handleInput}
          error={errors.username?.message}
        />

        <InputField
          label="Password"
          type="password"
          register={register("password")}
          onInput={handleInput}
          error={errors.password?.message}
        />
        <h2 className={s.serverError}>{serverError}</h2>
        <button>Login</button>
      </form>
      <Link className={s.link} to={"/auth/register"}>
        Create new account
      </Link>
    </>
  );
};

export default LoginForm;
