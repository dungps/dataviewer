import type { LiHTMLAttributes } from "react"

interface Props extends LiHTMLAttributes<HTMLLIElement> {}

export default function DropdownItem({ children, ...rest }: React.PropsWithChildren<Props>) {
    return <li {...rest}>{children}</li>
}
