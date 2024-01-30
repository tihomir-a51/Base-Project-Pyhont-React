import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Pagination from "./Pagination";

const UserList = ({ users }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const [errorMessages, setErrorMessages] = useState({});
    const history = useHistory();
    const token = localStorage.getItem("token");

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

    const userRole = localStorage.getItem('userRole')

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleDelete = (id) => {
        setErrorMessages({});

        fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    response.json().then(data => {
                        setErrorMessages(prevErrors => ({
                            ...prevErrors,
                            [id]: data.detail
                        }));
                    })
                }
            } else {
                setErrorMessages(prevErrors => ({
                    ...prevErrors,
                    [id]: null
                }));
            }
            history.push('/');
        }).catch(error => {
            setErrorMessages(prevErrors => ({
                ...prevErrors,
                [id]: error.message || 'An error occurred.'
            }));
        })
    }

    return (
        <div className="user-list">
            {currentUsers.map((user) => (
                <div className="user-preview" key={user.id}>
                    <h2>{user.username}</h2>
                    <>
                        {userRole === "admin" && (
                            <button onClick={() => handleDelete(user.id)}>delete</button>
                        )}
                    </>
                    {errorMessages[user.id] && <p className="error">{errorMessages[user.id]}</p>}
                </div>
            ))}
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={users.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default UserList;
