import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/SignUp.module.css";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import { useContext, useState } from "react";
import AuthContext from "../state-management/contexts/authContext";

interface FormData {
  username: string;
  password: string;
  email: string;
  // Removed firstName, lastName, and birthDate as per your interface
}
interface LoginResponse {
  access: string;
  refresh: string;
}
interface LoginCredentials {
  username: string;
  password: string;
}

const SignUp = () => {
  const { authStateDispatch } = useContext(AuthContext);
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const LoginMutation = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: (loginData: LoginCredentials) => {
      return apiClient
        .post("/auth/jwt/create/", loginData)
        .then((res) => res.data);
    },
    onSuccess: (loginResponse: LoginResponse, sentData) => {
      localStorage.setItem("accessToken", loginResponse.access);
      localStorage.setItem("refreshToken", loginResponse.refresh);

      authStateDispatch({
        type: "LOGIN",
        token: {
          accessToken: loginResponse.access,
          refreshToken: loginResponse.refresh,
        },
        loginCredentials: sentData,
      });
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      setError(error.message);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (data: FormData) => {
      return apiClient
        .post("/auth/users/", data)
        .then((res) => {
          const userData = res.data;
          console.log("User created:", res.data);
          localStorage.setItem("loginCredentials", JSON.stringify(userData));
          return res.data;
        })
        .catch((err) => {
          if (err.response) {
            console.error("Signup error response:", err.response.data);
          } else {
            console.error("Signup error:", err);
          }
          throw err;
        });
    },
    onSuccess: (_, sentData) => {
      const loginCredentials = {
        username: sentData.username,
        password: sentData.password,
      };
      LoginMutation.mutate(loginCredentials);
    },
  }); // ✅ This closing brace and parenthesis were missing

  const onSubmit = (data: FormData) => {
    signUpMutation.mutate(data);
  };

  return (
    <>
      {error && <p>{error}</p>}
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Create Your Account</h1>
          <p className={styles.subtitle}>Join our community today</p>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <input
                type="text"
                id="username"
                className={`${styles.input} ${
                  errors.username ? styles.error : ""
                }`}
                placeholder="Enter your username"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
              />
              {errors.username && (
                <span className={styles.errorMessage}>
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`${styles.input} ${
                  errors.email ? styles.error : ""
                }`}
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className={styles.errorMessage}>
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`${styles.input} ${
                  errors.password ? styles.error : ""
                }`}
                placeholder="Create a password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                  },
                })}
              />
              {errors.password && (
                <span className={styles.errorMessage}>
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={`${styles.input} ${
                errors.confirmPassword ? styles.error : ""
              }`}
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <span className={styles.errorMessage}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div> */}

            <button
              type="submit"
              className={styles.signUpButton}
              disabled={signUpMutation.isPending}
            >
              {signUpMutation.isPending ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <div className={styles.loginRedirect}>
            <p>
              Already have an account?{" "}
              <Link to="/sign-in" className={styles.loginLink}>
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
