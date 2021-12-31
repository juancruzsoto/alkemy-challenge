import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";

const Login = () => {

  const [values, setValues] = useState({
		email: '',
		password: '',
		showPassword: false,
	});

  const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e.values);

    axios
      .post("http://challenge-react.alkemy.org/", {
        email: "challenge@alkemy.org",
        password: "react",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <Container>
        <Card
          style={{
            marginTop: "150px",
            maxWidth: "600px",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Card.Body>
            <Card.Title className="text-center">
              <h1>Login</h1>
            </Card.Title>
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleLogin} noValidate>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Ingresar
                    </Button>
                  </Form>
                </form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
