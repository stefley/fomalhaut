import { VFC } from 'react'
import { Story, Meta } from '@storybook/react'
import { AutoComplate, AutoCompleteProps } from './autoComplete'
export default {
    title: 'autoComplate',
    component: AutoComplate,
} as Meta

  
const data = ["apple", "banale", "pear", "coat", "shirt", "paint"]
const handleFetch = (str: string) => {
    return data.filter(name => name.includes(str))
}
export const Default: VFC<{}> = () => <AutoComplate fetchSuggestions={handleFetch} />