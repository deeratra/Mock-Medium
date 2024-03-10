import { Link, useNavigate } from "react-router-dom"
import { InputBox } from "./InputBox"
// import { SignupInput } from "@100xdevs/medium-common";
import { useState } from "react";
import { Button } from "./Button";
// import { SigninInput } from "@deer21/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";


export const Auth = ({ type }: { type: "signup" | "signin" }) => {

    const navigate = useNavigate()

    const [postInputs, setPostInputs] = useState({
        name: "",
        password: "",
        email: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                postInputs)
            const jwt = response.data;
            console.log(jwt.jwt)
            localStorage.setItem("token", jwt.jwt)
            console.log(localStorage)
            navigate("/blogs")

        }
        catch (e) {

        }
    }
    return <div className=" max-w-full  flex flex-col justify-center h-screen">
        <div className=" max-w-full flex justify-center">
            <div className=" max-w-full flex flex-col gap-y-10">
                <div className="px-20">
                    <div className="flex flex-col gap-y-2">
                        <div className="text-4xl font-bold">Create an Account</div>
                        <div className="text-lg text-center text-slate-400">
                            {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                            < Link className="pl-2 underline" to={type === "signup" ? "/signin" : "/signup"}>
                                {type === "signup" ? "Login" : "Sign up"}
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex gap-y-3 flex-col">
                    <div className=""><InputBox onChange={e => {
                        setPostInputs({
                            ...postInputs, name: e.target.value
                        })
                    }} label={"Name"} placeholder={"Enter your Name"} />
                    </div>
                    <div className=""><InputBox onChange={e => {
                        setPostInputs({
                            ...postInputs, email: e.target.value
                        })
                    }} label={"Email"} placeholder={"x@example.com"} />
                    </div>
                    <div className=""><InputBox onChange={e => {
                        setPostInputs({
                            ...postInputs, password: e.target.value
                        })
                    }} label={"Password"} type={"password"} placeholder={"Enter your Password"} />
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button type={"auth"} onClick={sendRequest} name={type === "signup" ? "Sign up" : "Sign in"} />
                </div>
            </div>
        </div>
    </div >

}