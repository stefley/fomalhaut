import { Story, Meta } from '@storybook/react'
import { UploadProps, Upload, UploadFile } from './upload'

export default {
    title: 'upload component',
    component: Upload
} as Meta


const defaultFileList: UploadFile[] = [
    {
        uid: '001',
        size: 100,
        name: 'hello.md',
        status: 'uploading',
        percent: 10,
    },
    {
        uid: '002',
        size: 200,
        name: 'xxx.docx',
        status: 'success',
        percent: 100
    },
    {
        uid: '003',
        size: 300,
        name: 'yx.md',
        status: 'error',
        percent: 30
    }
]
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
const Templete: Story<UploadProps> = (args) => <Upload {...args} ></Upload>
export const UploadComponent = Templete.bind({})
UploadComponent.args = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: (file) => console.log(file),
    beforeUpload: filePromise,
    defaultList: defaultFileList
}
