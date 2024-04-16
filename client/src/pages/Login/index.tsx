import s from "./styles.module.css";
import LoginForm from "../../components/LoginForm";
const Login = () => {
  return (
    <main className={s.login}>
      <h1>Login</h1>
      <LoginForm />
    </main>
  );
};

export default Login;
