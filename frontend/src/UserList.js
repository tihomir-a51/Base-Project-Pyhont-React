import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UserList = ({ users }) => {
    const history = useHistory()

    const handleDelete = (id) => {
        fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE"
        }).then(() => {
            history.push('/')
        })
    }

    return (
        <div className="user-list">
            {users.map((user) => (
                <div className="user-preview" key={user.id}>
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                    <button onClick={() => handleDelete(user.id)}>delete</button>
                </div>
            ))}
        </div>
    );
}

export default UserList;