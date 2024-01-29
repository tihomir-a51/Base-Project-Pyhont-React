import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LogOut = () => {
    const [showConfirmation, setShowConfirmation] = useState()
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    };

    const handleConfirmLogout = () => {
        handleLogout();
        setShowConfirmation(false);
    };

    return (
        <div>
            <button onClick={() => setShowConfirmation(true)}>Logout</button>
            {showConfirmation && (
                <div className='confirmation-dialog'>
                    <p>Are you sure you want to logout?</p>
                    <button onClick={handleConfirmLogout}>Yes</button>
                    <button onClick={() => setShowConfirmation(false)}>No</button>
                </div>
            )}
        </div>
    );
};

export default LogOut;