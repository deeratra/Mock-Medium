import { ChangeEvent } from "react";


interface InputBoxType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

export const InputBox = ({ label, placeholder, onChange, type }: InputBoxType) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 text-xl ">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    );
}