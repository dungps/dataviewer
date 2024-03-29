import classNames from "classnames"
import type { PropsWithChildren } from "react"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    width?: number
}

export default function Card({ children, className, ...rest }: PropsWithChildren<Props>) {
    return (
        <div
            className={classNames({
                "card bg-base-100 shadow-xl": true,
                [`${className ? className : ""}`]: true
            })}
            {...rest}>
            {children}
        </div>
    )
}
