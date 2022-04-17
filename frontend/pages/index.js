import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Head from 'next/head';
import { 
  Jumbotron,
  Button,
  Navbar,
  Nav
} from 'react-bootstrap';

export default function Home() {

  const ParticlesBg = dynamic(() => import('particles-bg'), {
    ssr: false
  });

  return (
    <>
      <Head>
        <title>Home | BUDTRACK</title>
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
            <Link href="/register">
              <a className={`nav-link ${styles.homeNavBar} text-center`}><i className="pe-2 bi bi-person-plus-fill"></i>Register</a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      <Jumbotron className={`${styles.jumbotron} text-center`}>
        <h2 className="fw-bold">Budget Tracking App</h2>
        <p>BUDTRACK is an online money management tool designed to keep track of all your transactions using your computer, mobile phone, or iPad.
        </p>
        <p>
          <Button variant="dark" href="/register">Join Now</Button>
        </p>
      </Jumbotron>

      <footer className="fixed-bottom bg-light text-center border-top">
        <p className="mt-2 mb-2"><i className="pe-2 bi bi-linkedin"></i><a href="https://www.linkedin.com/in/tonino-kentlouise/" target="_blank" className={`${styles.anchorFooter}`}>Kent Louise Tonino</a></p>
      </footer>
      <ParticlesBg type="cobweb" bg={true} />
    </>
  );
};
