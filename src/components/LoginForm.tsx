import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/forms.css";

const LoginForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [rememberedEmails, setRememberedEmails] = useState<string[]>([]);

  useEffect(() => {
    // Retrieve the list of remembered emails from localStorage
    const savedEmails = localStorage.getItem("rememberedEmails");
    if (savedEmails) {
      setRememberedEmails(JSON.parse(savedEmails));
    }
  }, []);

  return (
    <div className="form-container">
      <h2>Login</h2>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <Formik
        initialValues={{
          email: rememberedEmails[0] || "",
          password: "",
          rememberMe: rememberedEmails.includes(rememberedEmails[0]),
        }}
        // Validations for email and password
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setErrorMessage(null);
          const existingUsers = JSON.parse(
            localStorage.getItem("users") || "[]"
          );
          const userFound = existingUsers.find(
            (user: { email: string; password: string }) =>
              user.email === values.email && user.password === values.password
          );

          if (userFound) {
            // Successful login
            if (values.rememberMe) {
              // Add the email to the remembered list
              if (!rememberedEmails.includes(values.email)) {
                const updatedEmails = [...rememberedEmails, values.email];
                localStorage.setItem(
                  "rememberedEmails",
                  JSON.stringify(updatedEmails)
                );
                setRememberedEmails(updatedEmails);
              }
            } else {
              // Remove the email from remembered list
              const updatedEmails = rememberedEmails.filter(
                (email) => email !== values.email
              );
              localStorage.setItem(
                "rememberedEmails",
                JSON.stringify(updatedEmails)
              );
              setRememberedEmails(updatedEmails);
              localStorage.removeItem("rememberedEmail");
            }

            setTimeout(() => {
              setSuccessMessage("Login Successful!");
              resetForm();
              setSubmitting(false);
            }, 500);
          } else {
            // Invalid credentials
            setTimeout(() => {
              setErrorMessage("Wrong username or password");
              setSubmitting(false);
            }, 500);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email"></Field>
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="form-group checkbox">
              <label>
                <Field name="rememberMe" type="checkbox" />
                <span>Remember Me</span>
              </label>
            
            </div>

            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
