import UserList from "../UserList/UserList";
import useFetch from "../../useFetch";


const GetUsers = () => {
    const { data: users, isPending, error } = useFetch("http://localhost:8000/users")

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading data, please wait ...</div>}
            {users && <UserList users={users} />}
        </div>
    );
}

export default GetUsers;