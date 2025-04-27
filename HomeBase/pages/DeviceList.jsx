import Devices from "../devices.json"

export default function DeviceList({navigation}) {
    return (
        <>
            <div>
                <h1>Device List</h1>
                <div>
                    
                </div>
                <div>
                    <h3>Back To Home</h3>
                    <button onClick={() => navigation.navigate('Home')}>
                        Home
                    </button>
                </div>
            </div>
        </>
    );
}
