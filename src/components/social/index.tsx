import {ReactNode} from "react"

interface SocialProps{
    url:string;
    children:ReactNode
}
export const Social = ({url,children}:SocialProps) => {
  return (
    <div>
        <a href={url}
        rel="noopener noreFerrer"
        target="_blank">
            {children}
        </a>
    </div>
  )
}
