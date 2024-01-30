import { Link } from 'react-router-dom'


const AdminNavbar = () => {
    return (
        <nav className="admin-navbar">
            <h1>Test Project Python + React / Admin</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/upload-image">Upload Photo</Link>
                <Link to="/create">Create User</Link>
                <Link to="/get-users">Get All Users</Link>
                <Link to='/logout'>Logout</Link>
            </div>
        </nav>
    );
}

export default AdminNavbar;