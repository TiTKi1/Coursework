export interface IInputProps {
    label: string;
    name: string;
    id: string;
    type: string;
    value: number;
    setNumber:(arg:(num :number)=>number)=>void
}

export interface IUploadedFile {
    fileName: string;
    filePath: string;
}

export interface IItem {
    id: number;
    name: string;
    place: number;
    quantity: number;
    // number: number;
    fileInfo: IUploadedFile
}

export enum loadingStatuses{
    IDLE = 'idle',
    PENDING = 'pending',
    ERROR = 'error'
}