import { FC } from 'react'
import Upload, {UploadProps} from './upload'
import UploadList, { UploadListProps } from './uploadList'
import Dragger, { DraggerProps } from './dragger'

export type IUploadComponent = FC<UploadProps> & {
    UploadList: FC<UploadListProps>,
    Dragger: FC<DraggerProps>
}

const TransUplod = Upload as IUploadComponent

TransUplod.UploadList = UploadList
TransUplod.Dragger = Dragger


export default TransUplod