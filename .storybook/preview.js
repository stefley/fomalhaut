import { addDecorator, addParameters } from '@storybook/react';
import '../src/styles/index.scss'

// addParameters({info: { inline: true, header: false}})
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}