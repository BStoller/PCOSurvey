import { ReactNode } from "react";

export default function PersonLayout({children} : {children : ReactNode}) {
    return (
        <div className="container">
            {children}
        </div>
    )
}