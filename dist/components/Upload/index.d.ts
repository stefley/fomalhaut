import { FC } from 'react';
import { UploadProps } from './upload';
import { UploadListProps } from './uploadList';
import { DraggerProps } from './dragger';
export declare type IUploadComponent = FC<UploadProps> & {
    UploadList: FC<UploadListProps>;
    Dragger: FC<DraggerProps>;
};
declare const TransUplod: IUploadComponent;
export default TransUplod;
