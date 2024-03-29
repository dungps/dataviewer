import type { PropsWithChildren } from "react"

export default function DrawerContent({ children }: PropsWithChildren) {
    return <div className="drawer-content">{children}</div>
}
