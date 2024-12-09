import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/forms.css";

// Function to check password strength
const passwordStrength = (password: string): string =>
  password.length > 12 ? "Strong" : password.length >= 8 ? "Medium" : "Weak";

const SignUpForm: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        // Validations for name, email, and password
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // Save the user details in localStorage
          const existingUsers = JSON.parse(
            localStorage.getItem("users") || "[]"
          );
          const newUser = { email: values.email, password: values.password };
          localStorage.setItem(
            "users",
            JSON.stringify([...existingUsers, newUser])
          );

          // signup successful
          setTimeout(() => {
            setSuccessMessage("Sign Up Successful!");
            resetForm();
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ values, isSubmitting }) => (
            // Form fields and submit button
          <Form>
            {["name", "email", "password"].map((field) => (
              <div key={field} className="form-group">
                <label htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <Field
                  name={field}
                  type={field === "password" ? "password" : "text"}
                />
                <ErrorMessage name={field} component="div" className="error" />
                {field === "password" && values.password && (
                  <div
                    className={`password-strength ${passwordStrength(
                      values.password
                    ).toLowerCase()}`}
                  >
                    Password Strength: {passwordStrength(values.password)}
                  </div>
                )}
              </div>
            ))}

            <button type="submit" disabled={isSubmitting}>
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
