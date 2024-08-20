import { FormEvent, useState } from "react";
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useFormInputValue } from "../../components/hook/useFormInputValue";
import { toast } from "react-hot-toast";
import axios from "axios"
import { useNavigate } from "react-router-dom";
interface FormState {
    email: string;
    password: string;
}

const initialState: FormState = {
    email: "",
    password: ""
};

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [eye, setEye] = useState<boolean>(false);
    const { handleChange, setState, state } = useFormInputValue<FormState>(initialState);
    // let isLogin = localStorage.getItem("x-auth-token")
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user={
            email: state.email,
            password: state.password
        }
        console.log(user);  
        setState(initialState)
        axios
        .post(`https://tour.touristan-bs.uz/v1/users/login`, user)
        .then((response) => {
          console.log(response.data.access_token); 
         
          
          localStorage.setItem("x-auth-token", response.data.access_token);
          toast.success('Successfully toasted!')
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error(error);
          toast.error("This didn't work.")
        });
      
    };

    return (
        <div className="flex items-center justify-center flex-col h-[100vh] ">
            <div>
                <form onSubmit={handleSubmit} className="w-[350px] py-[20px] shadow-lg px-[20px] rounded-lg">
                    <h1 className="text-[40px] text-center">Sign in</h1>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        value={state.email}
                        onChange={handleChange}
                        name="email"
                        required
                        className="border h-[40px] w-full rounded px-[10px] outline-none my-[10px]"
                    />
                    <br />
                    <label htmlFor="password">Password</label>
                    <br />
                    <div className="flex justify-between items-center h-[40px] rounded bg-white border relative my-[10px]">
                        <input
                            value={state.password}
                            onChange={handleChange}
                            name="password"
                            type={eye ? "password" : "text"}
                            required
                            className="outline-none w-full h-full flex-1 px-[10px]"
                        />
                        <br />
                        <div className="absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer" onClick={() => setEye(prev => !prev)}>
                            {eye ? <PiEyeSlashFill /> : <PiEyeFill />}
                        </div>
                    </div>
                    <button type="submit" className="w-full h-[40px] bg-blue-400 rounded-md text-white text-[20px]">
                        Submit
                    </button>
                    <p className="text-center text-[14px]">
                        Already signed up?{" "}
                        <span className="cursor-pointer text-blue-800">
                            <Link to={'/register'}>Go to sign up.</Link>
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
