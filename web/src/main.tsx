import React from "react"
import "style.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import RootTemplate from "./components/templates/root-template"
import Main from "./pages/main"
import { createRoot } from "react-dom/client"

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootTemplate />,
        children: [
            {
                index: true,
                path: "",
                element: <Main />
            }
        ]
    }
])

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
