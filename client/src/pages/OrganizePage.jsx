import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import Select from 'react-select'

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
const SelectComponent = () => (
    <Select options={options} />
)

export default function OrganizePage() {
    const [eventName, setEventName] = useState('');
    const [selected, setSelected] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);
    async function handleOrganizeSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/organize', {
                eventName: eventName,
                password,
            });
            setUser(data);
            alert('Login successful');
            setRedirect(true);
        } catch (e) {
            alert('Login failed. Please try again later');
        }
    }

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Organize</h1>
                <form className="max-w-md mx-auto" onSubmit={handleOrganizeSubmit}>
                    <input type="text"
                        placeholder="Name of Event"
                        value={eventName}
                        onChange={ev => setEventName(ev.target.value)} />
                    <SelectComponent />
                    <DayPicker mode="single" selected={selected} onSelect={setSelected} />
                    <button className="primary">Find Locations</button>
                    <div className="text-center py-2 text-gray-500">
                        Don&apos;t have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}