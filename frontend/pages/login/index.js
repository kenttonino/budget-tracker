import Swal from 'sweetalert2';
import Router from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { useState } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Navbar,
  Nav
} from 'react-bootstrap';


export default function index() {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  // function for login
  function Login(e) {
    e.preventDefault(e);

    fetch('https://shielded-dusk-98772.herokuapp.com/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => res.json()).then(data => {
      if(data === false) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        }).then(result => {
          Router.push('/login');
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'You are login successfully',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          localStorage.setItem('token', data.accessToken);
          Router.push('/dashboard');
        });
      }
    });
  };
  
  // show password 
  const [ passwordShown, setPasswordShown ] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

	return (
    <>
      <Head>
        <title>Login | BUDTRACK</title>
      </Head>

      <Navbar className="border-bottom fixed-top" bg="light" expand="lg">
        <Link href='/'>
          <a className='ms-3 navbar-brand text-dark fw-bold font-monospace'><i className="pe-2 bi bi-wallet-fill"></i>BUDTRACK</a>
        </Link>
        <Navbar.Toggle className="bg-light me-3" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/register">
              <a className={`nav-link ${styles.homeNavBar} text-center`}><i className="pe-2 bi bi-person-plus-fill"></i>Register</a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

			<Row className={`${styles.loginPage} justify-content-center`}>
				<Col xs md="6">
          <Container>
            <h2 className="text-center mt-5 fw-bold">Login Page</h2>
            <Form onSubmit={(e) => Login(e)}>
              {/* email */}
              <Form.Group controlId='email'>
                <Form.Label className="mb-1 mt-4">Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='Enter email address here'
                  type='email'
                  required>
                </Form.Control>
              </Form.Group>

              {/* password */}
              <Form.Group controlId='password'>
                <Form.Label className="mb-1 mt-4">Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password here"
                  type={passwordShown ? "text" : "password"}
                  required>
                </Form.Control>
              </Form.Group>

              {/* checkbox */}
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check onClick={togglePasswordVisibility} className="mt-4" type="checkbox" label="Show Password" />
              </Form.Group>

              {/* button component */}
              <Button className="mt-4 w-100 text-center justify-content-center" variant="dark" type="submit">Login</Button> 
            </Form>
          </Container>
				</Col>
			</Row>
      <footer className="fixed-bottom bg-light text-center border-top">
        <p className="mt-2 mb-2"><i className="pe-2 bi bi-linkedin"></i><a href="https://www.linkedin.com/in/tonino-kentlouise/" target="_blank" className={`${styles.anchorFooter}`}>Kent Louise Tonino</a></p>
      </footer>
    </>
	);
};