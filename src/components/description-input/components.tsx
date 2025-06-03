import { ReactNode } from "react"
import ReactDOM from 'react-dom'
import { CustomTooltip } from "../atoms"
import { IconButton } from "@mui/material"
import HelpIcon from "../atoms/Icon/icons/HelpIcon"

export const Portal = ({ children }: { children?: ReactNode }) => {
    return typeof document === 'object'
        ? ReactDOM.createPortal(children, document.body)
        : null
}
