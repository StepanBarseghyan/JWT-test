import React from "react";
import { Link } from "react-router-dom";
import s from "./styles.module.css";

const Home = () => {
  return (
    <header className={s.home}>
      <nav>
        <ul>
          <li>
            <Link to={"/auth/register"}>Register</Link>
          </li>
          <li>
            <Link to={"/auth/login"}>Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Home;
