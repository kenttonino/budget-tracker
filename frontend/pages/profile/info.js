import styles from '../../styles/Home.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import {
	Navbar,
	Nav,
	Container,
	Row,
	Col
} from 'react-bootstrap';

export default function index() {
	function logout(e) {
		localStorage.clear();
	};

  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ mobileNo, setMobileNo ] = useState('');

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
      setLastName(data.lastName);
      setEmail(data.email);
      setMobileNo(data.mobileNo);
    });
  }

	return (
		<>
			<Head>
				<title>Profile Information | BUDTRACK</title>
			</Head>

			<Navbar className="border-bottom fixed-top" bg="light" expand="lg">
				<Link href='/dashboard'>
					<a className='ms-3 navbar-brand text-dark fw-bold font-monospace'><i className="pe-2 bi bi-wallet-fill"></i>BUDTRACK</a>
				</Link>
				<Navbar.Toggle className="bg-light me-3" aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Link href="/dashboard">
							<a className={`nav-link ${styles.homeNavBar} text-center`}><i className="pe-2 bi bi-hdd-stack-fill"></i>Dashboard</a>
						</Link>
						<Link href="/">
							<a onClick={e => logout(e)} className={`nav-link ${styles.homeNavBar} text-center`}><i className="pe-2 bi bi-door-closed-fill"></i>Logout</a>
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			
			{/* side nav */}
			<div className={`${styles.sidenav}`}>
        {/* info */}
				<p className={`mb-0 text-light`}><i className="ps-3 pe-2 bi bi-person"></i>Profile</p>
				<ul className={`list-unstyled ps-4`}>
					<li>
						<Link href="/profile/info">
							<a className={`pb-0 text-light fst-italic`}><i className="pe-2 bi bi-info-square"></i>Info</a>
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
					{/* breadcrumb */}
					<Col className={`col-12`}>
						<Nav className={`pt-5 ms-5`} aria-label="breadcrumb">
							<ol className="breadcrumb ps-2 pt-4">
								<li className="breadcrumb-item">Profile</li>
								<li className="breadcrumb-item active" aria-current="page">Info</li>
							</ol>
						</Nav>

						<p className={`ps-5 ms-5 mt-3 fw-bold`}>PERSONAL INFORMATION</p>
            <p className={`ps-5 ms-5`}>First Name : <b>{firstName}</b></p>
            <p className={`ps-5 ms-5`}>Last Name : <b>{lastName}</b></p>
            <p className={`ps-5 ms-5`}>Mobile Number : <b>{mobileNo}</b></p>
            <p className={`ps-5 ms-5`}>Email : <b>{email}</b></p>
					</Col>
				</Row>
			</Container>
		</>
	);
};
