import { useHistory } from 'react-router-dom';

const LogOut = ({ setIsLoggedIn, setCreateUser }) => {
    const history = useHistory();

    const handleConfirmLogout = () => {
        setIsLoggedIn(false)
        setCreateUser(false)
        localStorage.removeItem('token');
        history.push('/log-in');
    };

    const handleDeclineLogout = () => {
        history.push('/');
    }

    return (
        <div className='confirmation-dialog'>
            <p>Are you sure you want to logout?</p>
            <button className='confirmation-yes-button' onClick={handleConfirmLogout}>Yes</button>
            <button className="confirmation-no-button" onClick={handleDeclineLogout}>No</button>
        </div>
    );
};

export default LogOut;