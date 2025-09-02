


type buttonType = "Primary" | "Secondary"

interface IButton {
    Primary: string,
    Secondary: string
}

const buttonStyle: IButton = {
    "Primary": " bg-red-800  px-4 py-1 rounded shadow-xs shadow-green-400 ",
    "Secondary": " flex items-center gap-2 justify-center border-[1px] border-secondary-btn-border text-secondary-btn-text  bg-secondary-btn-background px-4 py-1 rounded"
}

export function Button({ type, btnType, name, icon, className, onClick }: {
    type?: "submit" | "reset" | "button",
    btnType: buttonType,
    name: string,
    icon?: React.ReactNode,
    className?: string,
    onClick?: () => void
}) {

    return <>
        <button type={type} className={`${buttonStyle[btnType]} ${className} cursor-pointer `} onClick={onClick} >{icon}{name}</button>
    </>


}

