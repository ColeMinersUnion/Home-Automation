//General Christmas list for this page
// Needs:
/*
To be able to toggle the light switch on and off. 
To display the status of the relay module.
General Navigation back to device list.
*/
// Wants:
/*
Title of the page should be renamable.
Profile to be read in from device WSGI
Styled!
*/

export default function Outlet({navigation}) {

    const [status, setStatus] = useState(false);
    const [title, setTitle] = useState("Light Switch");

    return (
        <>
            <div>
                
            </div>
        </>
    );


}
