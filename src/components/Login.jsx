import axios from "axios";
import { Formik, ErrorMessage, Field, Form } from "formik";
import React, { useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import * as Yup from "yup";

export default function Login(props) {

  const [modalShow, setModalShow] = useState(false);

  const handleLogin = (e) => {
    axios
      .post("http://challenge-react.alkemy.org/", {
        email: e.email,
        password: e.password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        setModalShow(true)
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
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Email is invalid")
                  .required("Email is required"),
                password: Yup.string()
                  .min(5, "Password must be at least 5 characters")
                  .required("Password is required"),
              })}
              onSubmit={(fields) => {
               handleLogin(fields)
              }}
              render={({ errors, status, touched }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      name="email"
                      type="text"
                      className={
                        "form-control" +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className={
                        "form-control" +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary mr-2">
                      Enviar
                    </button>
                  </div>
                </Form>
              )}
            />
          </Card.Body>
        </Card>
        <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Error de Autenticación
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Email y/o password no coinciden</h6>
        <p>
          Por favor, ingrese un Email y password correcto.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
      </Container>
    </div>
  );
}
