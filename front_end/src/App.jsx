import React, { useEffect, useState } from 'react';
import api from './api/api.jsx';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get('hello/')
            .then((response) => setMessage(response.data.message))
            .catch((error) => console.error(error));
    }, []);

    return <div>{message}</div>;
}

export default App;
