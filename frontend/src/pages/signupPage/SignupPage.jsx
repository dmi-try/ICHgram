import styles from "./SignupPage.module.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../../components/input/Input.jsx";
import Button from "../../components/button/Button.jsx";
import logo from "../../assets/images/ICHGRA 2.png";

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const inputs = [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "email", type: "text", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Your password" },
    { name: "fullname", type: "text", placeholder: "Full name" },
  ];
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        formData
      );
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred during registration"
      );
    }
  };

  return (
    <section className={styles.sign_up_container}>
      <div className={styles.sign_up_form_container}>
        <picture className={styles.logo}>
          <img src={logo} alt="" />
        </picture>

        <h3 className={styles.sign_up_subheading}>
          Sign up to share photos and videos with your friends
        </h3>
        <form className={styles.sign_up_form} onSubmit={handleSubmit}>
          {inputs.map((elem) => (
            <Input
              key={elem.name}
              name={elem.name}
              type={elem.type}
              placeholder={elem.placeholder}
              onChange={handleChange}
            />
          ))}

          <p className={styles.sign_up_policy}>
            People who use our service may have uploaded your contact
            information to Instagram. <a href="#">Learn more</a>
          </p>

          <p className={styles.sign_up_policy}>
            By signing up, you agree our <a href="#">Terms</a>,
            <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a>.
          </p>

          <Button type="submit" text="Register" />
        </form>
        {message && <p>{message}</p>}
      </div>
      <p className={styles.sign_up_login_block}>
        Have an account?
        <Link to="/login" className={styles.sign_up_to_login}>
          Log In
        </Link>
      </p>
    </section>
  );
}

export default SignupPage;
