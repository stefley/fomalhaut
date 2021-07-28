import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonSize, ButtonProps, ButtonType } from './button'

const defaultProps = {
    onClick: jest.fn()
}
const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'test-class'
}
const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}
describe("test button component", () => {
    it("should render the correct default button", () => {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>)
        const el = wrapper.getByText("Nice") as HTMLButtonElement
        expect(el).toBeInTheDocument()
        expect(el.tagName).toEqual('BUTTON')
        expect(el).toHaveClass('btn btn-default')
        expect(el.disabled).toBeFalsy()
        fireEvent.click(el)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
    it("should render the correct component based on different props", () => {
        const wrapper = render(<Button {...testProps}>Nice</Button>)
        const el = wrapper.getByText('Nice')
        expect(el).toBeInTheDocument()
        expect(el).toHaveClass('test-class btn-primary btn-lg')
    })
    it("should render a link when btnType equals link and href is provided", () => {
        const wrapper = render(<Button btnType={ButtonType.Link} href="http://fomalhaut.com">Link</Button>)
        const el = wrapper.getByText('Link') as HTMLAnchorElement
        expect(el).toBeInTheDocument()
        expect(el.tagName).toEqual("A")
        expect(el).toHaveClass("btn btn-link")
        expect(el).toHaveAttribute("href", "http://fomalhaut.com")
    })
    it("should render disabled button when disabled set to true", () => {
        const wrapper = render(<Button {...disabledProps}>Nice</Button>)
        const el = wrapper.getByText("Nice") as HTMLButtonElement
        expect(el).toBeInTheDocument()
        expect(el.disabled).toBeTruthy()
        fireEvent.click(el)
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})