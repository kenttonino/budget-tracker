import styles from '../../../styles/Home.module.css';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import Swal from 'sweetalert2';
import { useState } from 'react';
import {
  Navbar,
  Nav, 
  Form, 
  Button, 
  Row, 
  Col, 
  Card,
  Container 
} from 'react-bootstrap';

export default function index() {
  function logout(e) {
    localStorage.clear();
  };

  return (
    <>
      <Head>
        <title>Add Record | BUDTRACK</title>
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
              <a className={`pb-0 text-light fst-italic`}><i className="bi bi-journal-plus pe-2"></i>Add Record</a>
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
                <li className="breadcrumb-item">Record</li>
                <li className="breadcrumb-item active" aria-current="page">Add Record</li>
              </ol>
            </Nav>

            <p className={`ps-5 ms-5 mt-3 fw-bold`}>ADD RECORD</p>
            <Card className={`${styles.addRecord}`}>
              <Card.Header>Record Information</Card.Header>
              <Card.Body>
                <NewRecordForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

// exam-2
const NewRecordForm = () => {
  
  const [ categoryName, setCategoryName ] = useState(undefined);
  const [ typeName, setTypeName ] = useState(undefined);
  const [ amount, setAmount ] = useState(0);
  const [ description, setDescription ] = useState('');
  const [ categories, setCategories ] = useState([]);

  const getCategories = (value) => {
    setTypeName(value);

    if(typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      fetch('https://shielded-dusk-98772.herokuapp.com/api/users/get-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type: value
        })
      }).then(res => res.json()).then(data => {
        console.log(data);
        setCategories(data);
      });
    }
  };

  const addRecord = (e) => {
    e.preventDefault();

    if(typeof window !== 'undefined') {
      const token = localStorage.getItem('token');

      fetch('https://shielded-dusk-98772.herokuapp.com/api/users/add-record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          categoryName: categoryName,
          type: typeName,
          amount: amount,
          description: description
        })
      }).then(res => res.json()).then(data => {
        if(data === true) {
          Swal.fire('New records added', 'The new category has been successfully created', 'success').then(data => {
            Router.push('/user/records');
          });
        }
      });
    }
  };


  return (
    <Form onSubmit={e => addRecord(e)}>
      <Form.Group className={`mb-3`} controlId="typeName">
        <Form.Label>Category Type</Form.Label>
        <Form.Control 
          as="select" 
          required 
          value={typeName} 
          onChange={(event) => getCategories(event.target.value)}>
          <option>Select Category</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className={`mb-3`} controlId="categoryName">
        <Form.Label>Category Name</Form.Label>
        <Form.Control 
          as="select" 
          required
          value={categoryName}
          onChange={(event) => setCategoryName(event.target.value)}>
          <option>Select Category Name</option>
          {
            categories.map((category) => {
              return(
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              )
            })
          }
        </Form.Control>
      </Form.Group>
      <Form.Group className={`mb-3`} controlId="amount">
        <Form.Label>Amount</Form.Label>
        <Form.Control value={amount} onChange={e => setAmount(e.target.value)} type="number" placeholder="Enter amount" required />
      </Form.Group>
      <Form.Group className={`mb-4`} controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control value={description} onChange={e => setDescription(e.target.value)} type="text" placeholder="Enter description" required />
      </Form.Group>
      <Button className={`w-100`} variant="dark" type="submit">Submit</Button>
    </Form>
  );
};