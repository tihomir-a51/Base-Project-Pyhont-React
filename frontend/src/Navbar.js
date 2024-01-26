import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Test Project Python + React</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/get-users">Get All Users</Link>
                <Link to="/create">Create User</Link>
                <Link to="/log-in">Log in</Link>
                <Link to="/logout">Log Out</Link>
            </div>
        </nav>
    );
}

export default Navbar;