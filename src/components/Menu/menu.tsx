import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
type MenuMode = "horizontal" | "vertial"
type SelectCallBack = (selectedIndex:string) => void;
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
    style?: React.CSSProperties;
    onSelect?: SelectCallBack;
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallBack;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({
    index: "0"
})

const Menu: React.FC<MenuProps> = (props) => {
    const { defaultIndex, className, mode, style, onSelect, children, defaultOpenSubMenus } = props
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classNames("fomalhaut-menu", className, {
        "menu-vertical": mode === "vertial",
        'menu-horizontal': mode !== 'vertial'
    })
    const handleClick = (index: string) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive || "0",
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }
    const renderChildern = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                return React.cloneElement(childElement, {index: index.toString()})
            } else {
                console.error('Warning: Menu has a child which is not a MenuItem')
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildern()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: "0",
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu