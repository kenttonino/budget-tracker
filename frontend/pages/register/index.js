import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import styles from '../../styles/Home.module.css';
import Router from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Navbar,
  Nav
} from 'react-bootstrap';

export default function Register() {
  // bind form components inside a state hook
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [btnActive, setBtnActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();

    fetch('https://shielded-dusk-98772.herokuapp.com/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password1,
      })
    }).then(res => res.json()).then(convertedData => {
      console.log(convertedData);

      if (convertedData == true) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Account created successfully!',
          showConfirmButton: false,
          timer: 1500
        }).then(result => {
          setFirstName("");
          setLastName("");
          setMobileNo("");
          setEmail("");
          setPassword1("");
          setPassword2("");
          Router.push('/login');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Something went wrong, try again later'
        });
      }
    })
  };

  /*
    include the new components to make sure that the
    user would fill in data first before being allowed
    to register.
  */
  useEffect(() => {

    if ((firstName !== "" && lastName !== "" && mobileNo !== "" && email !== "" && password1 !== "" && password2 !== "") && (password2 === password1)) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  }, [firstName, lastName, mobileNo, email, password1, password2]);

  return (
    <>
      <Head>
        <title>Register | BUDTRACK</title>
      </Head>

      <Navbar className="border-bottom fixed-top" bg="light" expand="lg">
        <Link href='/'>
          <a className='ms-3 navbar-brand text-dark fw-bold font-monospace'><i className="pe-2 bi bi-wallet-fill"></i>BUDTRACK</a>
        </Link>
        <Navbar.Toggle className="bg-light me-3" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/login">
              <a className={`nav-link ${styles.homeNavBar} text-center`}><i className="pe-2 bi bi-door-open-fill"></i>Login</a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className={`${styles.registerPage}`}>
        <Row className="justify-content-center mt-4 pt-3">
          <Col xs md="6">
            <Container className="mt-5">
              <h2 className="text-center fw-bold">Register Page</h2>
              <Form className="mb-5" onSubmit={(e) => registerUser(e)}>

                {/*firstName*/}
                <Form.Group>
                  <Form.Label className="mb-1 mt-3">First Name</Form.Label>
                  <Form.Control
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                    type="text"
                    placeholder="Enter your first name here"
                    required
                  />
                </Form.Group>

                {/*lastName*/}
                <Form.Group>
                  <Form.Label className="mb-1 mt-3">Last Name</Form.Label>
                  <Form.Control
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    type="text"
                    placeholder="Enter your first name here"
                    required
                  />
                </Form.Group>

                {/*mobileNo*/}
                <Form.Group>
                  <Form.Label className="mb-1 mt-3">Mobile Number</Form.Label>
                  <Form.Control
                    onChange={e => setMobileNo(e.target.value)}
                    value={mobileNo}
                    type="number"
                    placeholder="Enter your mobile number here"
                    required
                  />
                </Form.Group>

                {/*EMAIL*/}
                <Form.Group>
                  <Form.Label className="mb-1 mt-3">Email</Form.Label>
                  <Form.Control
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Enter your email here"
                    required
                  />
                </Form.Group>

                {/*password*/}
                <Form.Group>
                  <Form.Label className="mb-1 mt-3">Password</Form.Label>
                  <Form.Control
                    onChange={gawa => setPassword1(gawa.target.value)}
                    value={password1}
                    type="password"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    placeholder="Insert Password Here"
                    autoComplete="on"
                    required
                  />
                </Form.Group>

                {/*confirm password*/}
                <Form.Group>
                  <Form.Label className="mb-1 mt-3">Confirm Password</Form.Label>
                  <Form.Control
                    onChange={gawa => setPassword2(gawa.target.value)}
                    value={password2}
                    type="password"
                    placeholder="Confirm Password Here"
                    autoComplete="on"
                    required
                  />
                </Form.Group>

                {/*lets conditionally render the submit button based on the "btnActive" state*/}
                {btnActive ?
                  <Button type="submit" className="mt-3 w-100 text-center justify-content-center" variant="dark">Register</Button>
                  :
                  <Button type="submit" className="mt-3 w-100 text-center justify-content-center" variant="dark" disabled>Register</Button>
                }
              </Form>
            </Container>
          </Col>
        </Row>
      </Container>
      <footer className={`${styles.footerRegister} bg-light text-center border-top`}>
        <p className="mt-2 mb-2"><i className="pe-2 bi bi-linkedin"></i><a href="https://www.linkedin.com/in/tonino-kentlouise/" target="_blank" className={`${styles.anchorFooter}`}>Kent Louise Tonino</a></p>
      </footer>
    </>
  );
};
