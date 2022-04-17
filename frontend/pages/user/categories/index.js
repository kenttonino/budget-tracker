import styles from '../../../styles/Home.module.css';
import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Table
} from 'react-bootstrap';

export default function index() {
  function logout(e) {
    localStorage.clear();
  };

	return (
    <>
      <Head>
        <title>Categories | BUDTRACK</title>
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
              <a className={`pb-0 text-light fst-italic`}><i className="bi bi-list pe-2"></i>Categories</a>
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
          <Col className={`col-12`}>
            {/* breadcrumb */}
            <Nav className={`pt-5 ms-5`} aria-label="breadcrumb">
              <ol className="breadcrumb ps-2 pt-4">
                <li className="breadcrumb-item">Category</li>
                <li className="breadcrumb-item active" aria-current="page">Categories</li>
              </ol>
            </Nav>
            
            {/* tables for categories */}
            <p className={`ps-5 ms-5 mt-3 fw-bold`}>CATEGORIES</p>
            <Link href="/user/categories/new">
              <a className={`btn btn-dark ${styles.addButton} w-100`}>Add</a>
            </Link>
            <Table className={`${styles.tableCategory}`} striped bordered hover>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <CategoryList />
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
	);
};

const CategoryList = () => {

  const [categories, setCategories] = useState([]);

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');

    fetch('https://shielded-dusk-98772.herokuapp.com/api/users/get-categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(res => res.json()).then(data => {
        setCategories(data);
    });
  }

  return (
    <>
      {
        categories.map((category) => {
          return (
            <tr>
              <td key={category.id} value={category.name}>{category.name}</td>
              <td key={category.id} value={category.type}>{category.type}</td>
            </tr>
          )
        })
      }
    </>
  )
};