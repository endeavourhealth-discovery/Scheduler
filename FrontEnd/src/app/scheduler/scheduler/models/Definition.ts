import {FileLocationDetails} from "./FileLocationDetails";
import {SftpConnectionDetails} from "./SftpConnectionDetails";

export class Definition {

    name: string;
    id: number;
    projectId: string;
    fileLocationDetails: FileLocationDetails;
    sftpConnectionDetails: SftpConnectionDetails;

  constructor() {
    this.name = '';
    this.id = 0;
    this.projectId = '';
    this.fileLocationDetails = new FileLocationDetails();
    this.sftpConnectionDetails = new SftpConnectionDetails();
  }
}
