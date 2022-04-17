// import { useContext } from 'react'
// import UserContext from '../UserContext'; 
import { useState, useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap';
//lets acquire The routing components of next JS
import Link from 'next/link'

//lets acquire the context object that determines the value of the user.
import UserContext from '../UserContext';

export default function NavBar() {
	const [isExpanded, setIsExpanded] = useState(false)

	//lets destructure the context object and acquire the values/components you want to consume. 
	const { user } = useContext(UserContext)

	//lets create a ternary structure for us to be able to determine what element can be seen if user is mounted.

	return (
		// lets render the navbar component as routing components
		<Navbar expanded={isExpanded} expand="lg" variant="dark" bg="dark" fixed="top">
			<Container>
				<Link href="/">
					<a className="navbar-brand">Batch 99 CLUB!</a>
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">

						<Link href="/register">
							<a className="nav-link">Register</a>
						</Link>

						<Link href="/categories">
							<a className="nav-link">Categories</a>
						</Link>

						<Link href="/new-category">
							<a className="nav-link">New Category</a>
						</Link>

						<Link href="/records">
							<a className="nav-link">Records</a>
						</Link>

						<Link href="/create-records">
							<a className="nav-link">Create Records</a>
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
