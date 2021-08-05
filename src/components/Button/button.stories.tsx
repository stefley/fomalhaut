import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Button, ButtonProps } from './button'

export default {
    title: 'button',
    component: Button,
    parameters: {
      actions: {
        handles: ['click .btn'],
      },
    },
  } as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>按钮</Button>
export const Primary = Template.bind({})
Primary.args = {
  size: 'lg',
  btnType: 'primary'
}
// export const Default: React.VFC<{}> = () => <Button size="sm">default small button</Button>

