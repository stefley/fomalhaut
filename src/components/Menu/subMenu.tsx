import React, { Children, useContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
// import { CSSTransition } from 'react-transition-group'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
 
export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({index, title, className, children}) => {
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpen = (index && context.mode === 'vertial') ? openedSubMenus.includes(index) : false
    const [menuOpen, setMenuOpen] = useState(isOpen)
    const classes = classNames("menu-item submenu-item", className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertial'
    })

    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setMenuOpen(toggle)
        }, 300)
    }
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setMenuOpen(!menuOpen)
    }

    const clickEvents = context.mode === 'vertial' ? {
        onClick: handleClick
    } : {}
    const hoverEvents = context.mode !== 'vertial' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)}
    } : {}
    const renderChildren = () => {
        const subMenuClasses = classNames("fomalhaut-submenu", {
            "menu-opened": menuOpen
        })
        const childrenComponent = React.Children.map(children, (child,i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps> 
            if (childElement.type.displayName === "MenuItem") {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error('Warning: Menu has a child which is not a MenuItem')
            }
        })

        return (
            <Transition 
                in={menuOpen}
                timeout={300}
                animation="zoom-in-top"
                wrapper
            >
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
            
        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
                <Icon icon="angle-down" className="arrow-icon" />
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = "SubMenu"
export default SubMenu