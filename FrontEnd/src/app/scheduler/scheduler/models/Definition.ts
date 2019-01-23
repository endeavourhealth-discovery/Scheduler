import {FileLocationDetails} from "./FileLocationDetails";
import {SftpConnectionDetails} from "./SftpConnectionDetails";

export class Definition {
    name: string;
    id: number;
    projectId: string;
    fileLocationDetails: FileLocationDetails;
    sftpConnectionDetails: SftpConnectionDetails;
}
