import { FiFacebook, FiGithub, FiTwitter, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/SignIn.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../state-management/contexts/authContext";

interface FormData {
  username: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

const SignIn = () => {
  const { authState, authStateDispatch } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const loginMutation = useMutation<LoginResponse, Error, FormData>({
    mutationFn: (formData: FormData) =>
      axios
        .post<LoginResponse>("http://127.0.0.1:8000/auth/jwt/create/", formData)
        .then((res) => res.data),
    onSuccess: (postResponse: LoginResponse, sentCredentials) => {
      localStorage.setItem("accessToken", postResponse.access);
      localStorage.setItem("refreshToken", postResponse.refresh);

      authStateDispatch({
        type: "LOGIN",
        token: {
          accessToken: postResponse.access,
          refreshToken: postResponse.refresh,
        },
        loginCredentials: sentCredentials,
      });

      localStorage.setItem("loginCredentials", JSON.stringify(sentCredentials));
      navigate("/");
    },
  });

  const onSubmit = (data: FormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>AlagsBay</div>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>
            Sign in to access your account and continue shopping
          </p>
        </div>

        {loginMutation.isError && (
          <div className={styles.errorBanner}>
            {loginMutation.error.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              id="username"
              type="text"
              className={`${styles.input} ${
                errors.username ? styles.inputError : ""
              }`}
              placeholder="Enter your username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <span className={styles.error}>{errors.username.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`${styles.input} ${
                errors.password ? styles.inputError : ""
              }`}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.rememberForgot}>
            <div className={styles.remember}>
              <input
                type="checkbox"
                id="remember"
                className={styles.checkbox}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className={styles.forgot}>
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Signing in..." : "Sign In"}
            {!loginMutation.isPending && (
              <FiArrowRight className={styles.arrowIcon} />
            )}
          </button>
        </form>

        <div className={styles.divider}>
          <span>or continue with</span>
        </div>

        <div className={styles.socialLogin}>
          <button type="button" className={styles.socialButton}>
            <FiFacebook className={styles.socialIcon} />
            Facebook
          </button>
          <button type="button" className={styles.socialButton}>
            <FiTwitter className={styles.socialIcon} />
            Twitter
          </button>
          <button type="button" className={styles.socialButton}>
            <FiGithub className={styles.socialIcon} />
            GitHub
          </button>
        </div>

        <div className={styles.footer}>
          Don't have an account?{" "}
          <Link to="/sign-up" className={styles.link}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
