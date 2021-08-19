import React from 'react';
declare type MenuMode = "horizontal" | "vertial";
declare type SelectCallBack = (selectedIndex: string) => void;
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
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: React.FC<MenuProps>;
export default Menu;
