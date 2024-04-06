import React from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider, createHashRouter } from "react-router-dom"
import "./style.css"

const router = createHashRouter([])

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
