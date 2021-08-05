import React from 'react'
import Input, { InputProps } from './input'
import { render, fireEvent, RenderResult } from '@testing-library/react'

const defaultProps: InputProps = {
    onChange: jest.fn(),
    placeholder: 'test-input'
}

describe("test Input component", () => {

    it("should render the correct default Input", () => {
        const wrapper = render(<Input {...defaultProps} />)
        const testNode = wrapper.getByPlaceholderText("test-input") as HTMLInputElement
        expect(testNode).toBeInTheDocument()
        expect(testNode).toHaveClass("fomalhaut-input")
        fireEvent.change(testNode, { target: { value: "3"}})
        expect(defaultProps.onChange).toHaveBeenCalled()
        expect(testNode.value).toEqual("3")
    })

    it("should render the disabled Input on disabled property", () => {
        const wrapper = render(<Input disabled placeholder="test-input"/>)
        const testNode = wrapper.getByPlaceholderText("test-input") as HTMLInputElement
        expect(testNode.disabled).toBeTruthy()
    })

    it("should render different Input size on size property", () => {
        const wrapper = render(<Input size="lg" placeholder="input-size" />)
        const testContainer = wrapper.container.querySelector(".fomalhaut-input-wrapper")
        expect(testContainer).toHaveClass("input-lg")
    })

    it("should render prepand and append element on prepand/append property", () => {
        const {queryByText, container } = render(<Input prepand="prepand" append="append"  />)
        const testContainer = container.querySelector(".fomalhaut-input-wrapper")
        expect(testContainer).toHaveClass("input-group input-group-prepand input-group-append")
        expect(queryByText("prepand")).toBeInTheDocument()
        expect(queryByText("append")).toBeInTheDocument()
    })
})