import { Story, Meta } from '@storybook/react'
import { UploadProps, Upload } from './upload'

export default {
    title: 'upload component',
    component: Upload
} as Meta

const Templete: Story<UploadProps> = (args) => <Upload {...args}></Upload>

const checkFileSize = (file:File) => {
    if (Math.round(file.size / 1024) > 50) {
        alert(' file too big')
        return false
    }
    return true
}
const filePromise = (file: File) => {
    const newFile = new File([file], 'new_name.docx', { type: file.type })
    return Promise.resolve(newFile)
}
export const UploadComponent = Templete.bind({})
UploadComponent.args = {
    action: 'https://jsonplaceholder.typicode.com/posts',
    onChange: (file) => console.log(file),
    beforeUpload: filePromise
}
