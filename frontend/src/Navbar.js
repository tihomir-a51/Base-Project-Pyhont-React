import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Test Project Python + React</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/upload-image">Upload Photo</Link>
                <Link to="/get-users">Get All Users</Link>
                <Link to="/create">Create User</Link>
                <Link to='/logout'>Logout</Link>
            </div>
        </nav>
    );
}

export default Navbar;