import type { PropsWithChildren } from "react"

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor: string
}

export default function DrawerTrigger({ children, htmlFor, ...rest }: PropsWithChildren<Props>) {
    return (
        <label htmlFor={htmlFor} aria-label="open sidebar" {...rest}>
            {children}
        </label>
    )
}
