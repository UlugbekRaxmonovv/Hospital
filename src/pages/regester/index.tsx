import { useState } from "react";
import axios from "../../api";
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface FormState {
    firstname: string;
    lastname: string;
    date_of_birth: string;
    username: string;
    email: string;
    password: string;
    user_location: string;
}

const initialState: FormState = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    date_of_birth: "",
    user_location: "",
    username: "",
};

const Regester = () => {
    const navigate = useNavigate();
    const [eye, setEye] = useState<boolean>(false);
    const [form, setForm] = useState<FormState>(initialState);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
           setLoading(true);
             axios
            .post("/auth/register", form)
            .then((response) => {
                console.log("Response:", response.data);
                toast('Register Success')
                setForm(initialState);
                navigate("/dashboard");
             })
            .catch((error) => {
                console.error("Error:", error);
                toast('Register Failed')
             })
            .finally(() =>{
                setLoading(false);
            })
    };

    return (
        <div className="flex items-center justify-center flex-col h-[100vh]">
            <div>
                <form onSubmit={handleSubmit} className="w-[700px] py-[20px] shadow-lg px-[20px] rounded-lg">
                    <h1 className="text-[40px] text-center">Sign up</h1>
                    <div className="flex items-center gap-4">
                        <div>
                            <label htmlFor="firstname">First Name</label>
                            <input
                                type="text"
                                name="firstname"
                                value={form.firstname}
                                onChange={handleChange}
                                required
                                className="border h-[40px] w-[310px] rounded px-[10px] outline-none my-[2px]"
                            /> <br />

                            <label htmlFor="date_of_birth">Date of Birth</label>
                            <input
                                type="date"
                                name="date_of_birth"
                                value={form.date_of_birth}
                                onChange={handleChange}
                                required
                                className="border h-[40px] w-[310px] rounded px-[10px] outline-none my-[2px]"
                            /> <br />

                            <label htmlFor="lastname">Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                value={form.lastname}
                                onChange={handleChange}
                                required
                                className="border h-[40px] w-[310px] rounded px-[10px] outline-none my-[2px]"
                            /> <br />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label> <br />
                            <div className="flex justify-between items-centerv w-[310px] h-[40px] rounded bg-white border relative my-[2px]">
                                <input
                                    type={eye ? "password" : "text"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    className="outline-none w-full h-full flex-1 px-[10px]"
                                />
                                <div
                                    className="absolute right-2 top-[50%] -translate-y-[50%]"
                                    onClick={() => setEye(prev => !prev)}
                                >
                                    {eye ? <PiEyeSlashFill /> : <PiEyeFill />}
                                </div>
                            </div>

                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                required
                                className="border h-[40px] w-[310px] rounded px-[10px] outline-none my-[2px]"
                            /> <br />

                            <label htmlFor="user_location">User Location</label>
                            <input
                                type="text"
                                name="user_location"
                                value={form.user_location}
                                onChange={handleChange}
                                required
                                className="border h-[40px] w-[310px] rounded px-[10px] outline-none my-[2px]"
                            /> <br />
                        </div>
                    </div>
                    <div className="flex justify-center items-center flex-col">
                        <div>
                            <label htmlFor="email">Email</label> <br />
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="border h-[40px] w-[310px] rounded px-[10px] outline-none my-[2px]"
                            /> <br />
                        </div>
                    </div>
                    <button type="submit" className="w-[650px] my-[10px] h-[40px] bg-blue-400 rounded-md text-white text-[20px]">{loading ? "loading"  :  "Submit"}</button>
                </form>
            </div>
        </div>
    );
}

export default Regester;
