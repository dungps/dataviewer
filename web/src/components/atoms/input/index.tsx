import type React from "react"
import type { Color } from "../../../types/color"
import classNames from "classnames"
import type { Size } from "../../../types/size"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    color?: Color
    inputSize?: Size
    bordered?: boolean
    label?: string
    error?: string
}

export default function Input({
    type = "text",
    inputSize = "md",
    bordered,
    label,
    className,
    required,
    error,
    ...rest
}: Props) {
    return (
        <label className="form-control w-full max-w-xs">
            {label && (
                <div className="label">
                    <span className="label-text">
                        {label}
                        {required && <span className="text-error"> *</span>}
                    </span>
                </div>
            )}
            <input
                type={type}
                required={required}
                className={classNames({
                    input: true,
                    "input-primary": rest.color === "primary",
                    "input-secondary": rest.color === "secondary",
                    "input-accent": rest.color === "accent",
                    "input-info": rest.color === "info",
                    "input-success": rest.color === "success",
                    "input-warning": rest.color === "warning",
                    "input-error": rest.color === "error" || error,
                    "input-ghost": rest.color === "ghost",
                    "input-link": rest.color === "link",
                    "input-outline": rest.color === "outline",
                    "input-xs": inputSize === "xs",
                    "input-sm": inputSize === "sm",
                    "input-lg": inputSize === "lg",
                    "input-md": inputSize === "md",
                    "input-bordered": bordered,
                    [`${className ? className : ""}`]: true
                })}
                {...rest}
            />
            {error && (
                <div className="label">
                    <span className="label-text text-error">{error}</span>
                </div>
            )}
        </label>
    )
}
