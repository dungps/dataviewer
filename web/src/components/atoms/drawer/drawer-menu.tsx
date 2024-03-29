import classnames from "classnames"
import type { PropsWithChildren } from "react"

interface DrawerMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    htmlFor: string
    classNames?: {
        base?: string
        menu?: string
    }
}

export default function DrawerMenu({
    children,
    htmlFor,
    className,
    classNames,
    ...rest
}: PropsWithChildren<DrawerMenuProps>) {
    return (
        <div
            className={classnames({
                "drawer-side": true,
                [className ? className : ""]: true,
                [`${classNames?.base ? classNames.base : ""}`]: true
            })}
            {...rest}>
            <label htmlFor={htmlFor} aria-label="close sidebar" className="drawer-overlay"></label>
            <ul
                className={classnames({
                    "menu p-4 min-h-full bg-base-200": true,
                    [`${classNames?.menu ? classNames.menu : ""}`]: true
                })}>
                {children}
            </ul>
        </div>
    )
}
