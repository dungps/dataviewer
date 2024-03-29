import classNames from "classnames"
import type { PropsWithChildren } from "react"

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string
}

export default function Drawer({
    children,
    id,
    className,
    ...rest
}: PropsWithChildren<DrawerProps>) {
    return (
        <div
            className={classNames({
                "drawer lg:drawer-open": true,
                [`${className ? className : ""}`]: true
            })}
            {...rest}>
            <input id={id} type="checkbox" className="drawer-toggle" />
            {children}
        </div>
    )
}
