import React from 'react'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
    defaultIndex: "0",
    onSelect: jest.fn(),
    className: 'test'
}

const  testVerProps: MenuProps = {
    defaultIndex: "0",
    mode: 'vertial',
    defaultOpenSubMenus: ['3']
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>
                active
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>
            <MenuItem>
                xyz
            </MenuItem>
            <SubMenu title="dropdown">
                <MenuItem>
                    drop1
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}
const createStyleFile = () => {
    const cssFile: string = `
        .fomalhaut-submenu {
            display: none;
        }
        .fomalhaut-submenu.menu-opened {
            display: block; 
        }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}
let wrapper:RenderResult, menuElement:HTMLElement, activeElement:HTMLElement, disabledElement:HTMLElement
describe("test Menu and MenuItem component", () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    it("should render correct Menu and MenuItem based on default props", () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass("fomalhaut-menu test")
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
        expect(activeElement).toHaveClass("menu-item is-active")
        expect(disabledElement).toHaveClass("menu-item is-disabled")
    })

    it("click menu items should change active and call the right callback", () => {
        const thirdItem = wrapper.getByText('xyz')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith("2")
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith("1")
    })

    it("should render vertical mode when mode is set to vertical", () => {
        cleanup()
        const wrapper = render(generateMenu(testVerProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })

    it("should show dropdown items when hover on subMenu",async () => {
        cleanup()
        wrapper = render(generateMenu(testProps))
        expect(wrapper.queryByText('drop1')).not.toBeInTheDocument()
        const dropdownEl = wrapper.getByText("dropdown")
        fireEvent.mouseEnter(dropdownEl)
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText("drop1"))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownEl)
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).not.toBeInTheDocument()
        })
    })

    it("should show dropdown items when set defaultOpenSubMenus", () => {
        cleanup()
        const wrapper = render(generateMenu(testVerProps))
        expect(wrapper.getByText("drop1")).toBeVisible()
    })
})