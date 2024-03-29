import classnames from "classnames"
import type { PropsWithChildren } from "react"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    label?: React.ReactNode
    actions?: React.ReactNode[]
    classNames?: {
        label?: string
        actions?: string
    }
}

export default function CardContent({
    children,
    className,
    classNames,
    label,
    actions,
    ...rest
}: PropsWithChildren<Props>) {
    return (
        <div
            className={classnames({
                "card-body": true,
                [`${className ? className : ""}`]: true
            })}
            {...rest}>
            {label && (
                <h2
                    className={classnames({
                        "card-title": true,
                        [`${classNames?.label ? classNames.label : ""}`]: true
                    })}>
                    {label}
                </h2>
            )}
            {children}
            {actions && actions.length > 0 && (
                <div
                    className={classnames({
                        "card-actions": true,
                        [`${classNames?.actions ? classNames.actions : ""}`]: true
                    })}>
                    {actions.join("")}
                </div>
            )}
        </div>
    )
}
