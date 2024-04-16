import s from "./styles.module.css";
import RegistrationForm from "../../components/RegistrationForm";

const Register = () => {
  return (
    <main className={s.register}>
      <h1>Register</h1>
      <RegistrationForm />
    </main>
  );
};

export default Register;
