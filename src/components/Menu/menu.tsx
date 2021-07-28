import React from 'react'
import classNames from 'classnames'

type MenuMode = "horizontal" | "vertial"
export interface MenuProps {
    defaultIndex?: number;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: (selectedIndex:number) => void;
}

const Menu: React.FC<MenuProps> = (props) => {
    const { defaultIndex, className, mode, style, onSelect, children } = props
    const classes = classNames("fomalhaut-menu", className, {
        "menu-vertical": mode === "vertial"
    })

    return (
        <ul className={classes} style={style}>
            {children}
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal'
}

export default Menu