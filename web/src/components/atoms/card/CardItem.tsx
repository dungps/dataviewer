import type { PropsWithChildren } from "react"

interface Props extends React.HTMLAttributes<HTMLElement> {}

export default function CardItem({ children, ...rest }: PropsWithChildren<Props>) {
    return <figure {...rest}>{children}</figure>
}
