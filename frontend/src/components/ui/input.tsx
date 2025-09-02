import React from "react"


type IInput = "Primary"


const inputStyle = {
    "Primary": "bg-black px-2 py-1 rounded border-[0.5px] border-white "
}

export function Input({ inputType, type, id, placeholder, className }: {
    inputType: IInput,
    type: string,
    id: string,
    placeholder: string,
    className?: string
}) {

    return <input type={type} id={id} placeholder={placeholder} className={`${inputStyle[inputType]} ${className}`} />

}
