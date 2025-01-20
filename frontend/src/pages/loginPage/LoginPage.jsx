import styles from "./LoginPage.module.css";
import bannerImage from "../../assets/images/main_banner_image.jpg";
import logo from "../../assets/images/ICHGRA 2.png";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/input/Input.jsx";
import Button from "../../components/button/Button.jsx";
import Divider from "../../components/divider/Divider.jsx";

function LoginPage() {
  const api = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    { name: "email", type: "text", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Your password" },
  ];

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Хук для навигации

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", formData);

      // Сохраняем токен в localStorage
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Устанавливаем сообщение о успешном логине
      setMessage("Login successful!");

      // Перенаправляем на страницу профиля
      navigate("/profile");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred during login"
      );
    }
  };

  return (
    <section className={styles.login_container}>
      <picture className={styles.login_banner}>
        <img src={bannerImage} alt="" />
      </picture>

      <div className={styles.login_info_container}>
        <div className={styles.login_form_container}>
          <picture className={styles.login_logo}>
            <img src={logo} alt="" />
          </picture>

          <form className={styles.login_form} onSubmit={handleSubmit}>
            {inputs.map((elem) => (
              <Input
                key={elem.name}
                name={elem.name}
                type={elem.type}
                placeholder={elem.placeholder}
                // value={formData[inputs.name] || ""}
                onChange={handleChange}
              />
            ))}
            <Button text="Log in" />
          </form>
          {message && <p>{message}</p>}
          <Divider />
          <div>
            <Link to="" className={styles.login_forgot_pass}>
              Forgot Password?
            </Link>
          </div>
        </div>
        <p className={styles.login_sign_up_block}>
          Dont have an account?
          <Link to="/register" className={styles.login_to_sign_up}>
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
