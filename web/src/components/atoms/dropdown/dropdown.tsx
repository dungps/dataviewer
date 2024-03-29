interface DropdownProps {
    label: React.ReactNode
}

export default function Dropdown({ children, label }: React.PropsWithChildren<DropdownProps>) {
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
                <div className="w-10 rounded-full">{label}</div>
            </div>
            <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                {children}
            </ul>
        </div>
    )
}
