import { Story, Meta } from '@storybook/react'
import { Input, InputProps } from './input'

export default {
    title: 'input',
    component: Input
} as Meta

const Template: Story<InputProps> = (args) => <Input {...args} />
export const InputComponent = Template.bind({})
InputComponent.args = {
  size: 'lg',
  disabled: false,
  placeholder: 'placeholder',
  prepand: 'http://',
  append: 'end'
}