import { useState } from "react";
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi";
const Regester = () => {
    const [eye,setEye] = useState<boolean>(false)
    return (
        <div className="flex items-center justify-center flex-col h-[100vh]">
        <div className="">
            <form action="" className="w-[350px] py-[20px]  shadow-lg px-[20px] rounded-lg ">
                <h1 className="text-[40px] text-center">Sign up</h1>
                <label htmlFor="username">Username</label> 
                <input type="text"  required className="border h-[40px] w-full rounded px-[10px] outline-none my-[10px]" /> <br />
                <label htmlFor="password">Password</label> <br />
                <div className="flex justify-between items-center h-[40px]  rounded bg-white  border relative my-[10px]">
                   
                    <input type={eye ? "password" : "text"} required className=" outline-none w-full  h-full flex-1 px-[10px]" /> <br />
                  
                    <div className="absolute right-2 top-[50%] -translate-y-[50%]"  onClick={() => setEye(p => !p)} >
                {
                  eye ?     <PiEyeSlashFill />
                  : <PiEyeFill  />
                }
               
                    </div>
                </div>
                <button type="submit" className="w-full h-[40px] bg-blue-400 rounded-md text-white text-[20px]">Submit</button>
              
            </form>
        </div>
       </div>
    );
}

export default Regester;
