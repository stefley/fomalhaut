import { VFC } from 'react'
import { Story, Meta } from '@storybook/react'
import { AutoComplate, AutoCompleteProps, DataSourceType } from './autoComplete'
export default {
    title: 'autoComplate',
    component: AutoComplate,
} as Meta

const data = ["apple", "banale", "pear", "coat", "shirt", "paint"]
// const handleFetch = (str: string) => {
//     return data.filter(name => name.includes(str)).map(name => ({value: name}))
// }
interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}
const handleFetch = (query: string) => {
    // return fetch(`https://api.github.com/search/users?q=${query}`)
    //   .then(res => res.json())
    //   .then(({ items }) => {
    //     console.log(items)
    //     return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
    //   })
    return fetch(`https://api.github.com/search/users?q=${query}`)
        .then(res => res.json())
        .then(({items}) => {
            console.log(items)
            return items.slice(0,10).map((item: any) => ({value: item.login, ...item}))
        })
}
const data2 = [
    {value: 'apple', price: 12},
    {value: 'pen', price: 8},
    {value: 'book', price: 22},
    {value: 'bag', price: 40}
]
// const handleFetch = (query: string) => {
//     return data2.filter(item => item.value.includes(query))
// }
const renderOptions = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (<>
    <h1>Name: {itemWithGithub.login}</h1>
    <p>url:{itemWithGithub.url}</p>
</>)
}
// type Diff<T, U> = T extends U ? never : T;
 
// type R1 = Diff<"A" | "B", "A" |  "C">; 
// type R = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;
// type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;
export const Default: VFC<{}> = () => (
  <AutoComplate fetchSuggestions={handleFetch} renderOptions={renderOptions} />
);