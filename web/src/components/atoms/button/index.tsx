import type { ButtonHTMLAttributes, PropsWithChildren } from "react"
import type { Size } from "../../../types/size"
import classNames from "classnames"
import type { Color } from "../../../types/color"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    as?: React.ElementType
    href?: string
    color?: Color
    size?: Size
    radius?: "md" | "full"
    fullWidth?: boolean
    loading?: boolean
}

export default function Button({
    children,
    className,
    color = "primary",
    size = "md",
    radius = "md",
    as = "button",
    fullWidth,
    loading,
    disabled,
    ...rest
}: PropsWithChildren<Props>) {
    const Component = as
    return (
        <Component
            className={classNames({
                btn: true,
                "btn-primary": color === "primary",
                "btn-secondary": color === "secondary",
                "btn-accent": color === "accent",
                "btn-info": color === "info",
                "btn-success": color === "success",
                "btn-warning": color === "warning",
                "btn-error": color === "error",
                "btn-ghost": color === "ghost",
                "btn-link": color === "link",
                "btn-outline": color === "outline",
                "btn-xs": size === "xs",
                "btn-sm": size === "sm",
                "btn-lg": size === "lg",
                "btn-md": size === "md",
                "btn-square": radius === "md",
                "btn-circle": radius === "full",
                "btn-wide w-full": fullWidth,
                [`${className ? className : ""}`]: true
            })}
            disabled={loading || disabled}
            {...rest}>
            {loading && <span className="loading loading-spinner" />}
            {children}
        </Component>
    )
}
