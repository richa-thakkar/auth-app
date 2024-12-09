import React, { useState } from "react";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import "./styles/forms.css";

const App: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const toggleForm = () => setIsSignUp(!isSignUp);

  return (
    <div className="app">
      {isSignUp ? <SignUpForm /> : <LoginForm />}
      <p>
        {isSignUp ? (
          <span onClick={toggleForm} className="toggle-button">
            Already have an account? <span>Login</span>
          </span>
        ) : (
          <span onClick={toggleForm} className="toggle-button">
            Don't have an account? <span>SignUp</span>
          </span>
        )}
      </p>
    </div>
  );
};

export default App;
