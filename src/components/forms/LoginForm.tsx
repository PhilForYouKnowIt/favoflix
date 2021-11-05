import { Alert, Form } from "react-bootstrap";
import React, { useState } from "react";
import { auth } from "services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm = (props: LoginFormProps): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      await signInWithEmailAndPassword(auth, email, password);
      props.onSuccess();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <>
      {error && (
        <Alert key={"alert-login-error"} variant={"warning"}>
          {error}
        </Alert>
      )}
      <Form
        id={"login-form"}
        noValidate
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <fieldset disabled={false}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </fieldset>
      </Form>
    </>
  );
};
