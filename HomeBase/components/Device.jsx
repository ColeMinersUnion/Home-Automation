import { useState } from "react";


export default function Device({navigation, dname, dtype, daddress}) {

    const [status, setStatus] = useState(false);

    const handlePress = () =>{
        // address/toggle
        fetch(`http://${daddress}/toggle`, {
            method: 'POST',
        })
        .then((response) => {
            if (response.ok) {
                console.log('Device toggled successfully');
            } else {
                console.error('Failed to toggle device');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleGetStatus = () => {
        // address/status
        fetch(`http://${daddress}/status`, {
            method: 'GET',
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch status');
            }
        })
        .then((data) => {
            console.log('Device status:', data);
            setStatus(data.status);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <>
            <div>
                <h1>Device: {dname}</h1>

            </div>
        </>
    );
}