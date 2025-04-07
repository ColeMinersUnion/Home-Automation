import Devices from "../devices.json"

export default function DeviceList({navigation}) {
    return (
        <>
            <div>
                <h1>Device List</h1>
                {Devices.map((device, index) => (
                    <div key={index}>
                        <h2>{device.name}</h2>
                        <button onClick={() => navigation.navigate('Device', {dname: device.name, daddress: device.address})}>
                            Go to Device
                        </button>
                    </div>
                ))}
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
