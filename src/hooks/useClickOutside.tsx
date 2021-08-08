import { RefObject, useEffect } from "react";

function useClickOutside (ref: RefObject<HTMLElement>, handler: Function) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            // Node.contains()返回的是一个布尔值，来表示传入的节点是否为该节点的后代节点。
            if(!ref.current || ref.current.contains(event.target as HTMLElement)) {
                return
            }
            handler(event)
        }
        document.addEventListener("click", listener) 
        
        return () => {
            document.removeEventListener("click", listener)
        }
    }, [ref, handler])
}

export default useClickOutside