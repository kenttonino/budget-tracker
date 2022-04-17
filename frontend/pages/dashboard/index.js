import styles from '../../styles/Home.module.css';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import {
	Navbar,
	Nav,
  Container,
  Row,
  Col,
  ListGroup
} from 'react-bootstrap';

export default function index() {
  function logout(e) {
    localStorage.clear();
  };

  const ParticlesBg = dynamic(() => import('particles-bg'), {
    ssr: false
  });

  const [ firstName, setFirstName ] = useState('');

  if(typeof window !== 'undefined') {
    const token = localStorage.getItem('token');

    fetch('https://shielded-dusk-98772.herokuapp.com/api/users/details', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(res => res.json()).then(data => {
      setFirstName(data.firstName); 
    });
  }

	return(
		<>
			<Head>
				<title>Dashboard | BUDTRACK</title>
			</Head>

			<Navbar className="border-bottom fixed-top" bg="light" expand="lg">
				<Link href='#'>
          <a className='ms-3 navbar-brand text-dark fw-bold font-monospace'><i className="pe-2 bi bi-wallet-fill"></i>BUDTRACK</a>
				</Link>
				<Navbar.Toggle className="bg-light me-3" aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
            <Link href="/dashboard">
              <a className={`nav-link ${styles.homeNavBar} text-center fst-italic`}><i className="pe-2 bi bi-hdd-stack-fill"></i>Dashboard</a>
            </Link>
						<Link href="/">
              <a onClick={e => logout(e)} className={`nav-link ${styles.homeNavBar} text-center`}><i className="pe-2 bi bi-door-closed-fill"></i>Logout</a>
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			<div className={`${styles.sidenav}`}>
        {/* profile */}
        <p className={`mb-0 text-light`}><i className="ps-3 pe-2 bi bi-person"></i>Profile</p>
        <ul className={`list-unstyled ps-4`}>
          <li>
            <Link href="/profile/info">
              <a className={`pb-0`}><i className="pe-2 bi bi-info-square"></i>Info</a>
            </Link>
          </li>
        </ul>

        {/* category */}
        <p className={`mb-0 text-light`}><i className="bi bi-view-list ps-3 pe-2"></i>Category</p>
        <ul className={`list-unstyled ps-4`}>
          <li>
            <Link href="/user/categories">
              <a className={`pb-0`}><i className="bi bi-list pe-2"></i>Categories</a>
            </Link>
            <Link href="/user/categories/new">
              <a className={`pb-0`}><i className="bi bi-plus-square pe-2"></i>Add Category</a>
            </Link>
          </li>
        </ul>

        {/* charts */}
        <p className={`mb-0 text-light`}><i className="bi bi-clipboard-data ps-3 pe-2"></i>Chart</p>
        <ul className={`list-unstyled ps-4`}>
          <li>
            <Link href="/user/charts/category-breakdown">
              <a className={`pb-0`}><i className="bi bi-pie-chart pe-2"></i>Breakdown</a>
            </Link>
          </li>
        </ul>

        {/* records */}
        <p className={`mb-0 text-light`}><i className="bi bi-journal-richtext ps-3 pe-2"></i>Record</p>
        <ul className={`list-unstyled ps-4`}>
          <li>
            <Link href="/user/records">
              <a className={`pb-0`}><i className="bi bi-journal-text pe-2"></i>Records</a>
            </Link>
            <Link href="/user/records/new">
              <a className={`pb-0`}><i className="bi bi-journal-plus pe-2"></i>Add Record</a>
            </Link>
          </li>
        </ul>
			</div>

      <Container>
        <Row>
          <Col>
            <p className={`${styles.dashboardContainer}`}><span>Welcome {firstName}!</span></p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <ListGroup className={`${styles.dashboardList} w-50`}>
              <ListGroup.Item className={`fst-italic`}>Things that you can do :</ListGroup.Item>
              <ListGroup.Item className={`bg-dark text-light ps-5`}>Add a category of the different types of your income and expense.</ListGroup.Item>
              <ListGroup.Item className={`bg-dark text-light ps-5`}>View all the category of income and expense type that you added.</ListGroup.Item>
              <ListGroup.Item className={`bg-dark text-light ps-5`}>Add a record of your transactions based on its income type or expense type</ListGroup.Item>
              <ListGroup.Item className={`bg-dark text-light ps-5`}>View all the transactions that you added</ListGroup.Item>
              <ListGroup.Item className={`bg-dark text-light ps-5`}>View your monthly category breakdown</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>

      <ParticlesBg type="cobweb" bg={true} />
		</>
	);
};