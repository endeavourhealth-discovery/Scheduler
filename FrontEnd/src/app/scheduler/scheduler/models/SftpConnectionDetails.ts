export class SftpConnectionDetails {

  hostname: string;
  hostPublicKey: string;
  port: number;
  username: string;
  clientPrivateKeyPassword: string;
  clientPrivateKey: string;

  constructor() {
    this.hostname = '';
    this.hostPublicKey = '';
    this.port = 0;
    this.username = '';
    this.clientPrivateKeyPassword = '';
    this.clientPrivateKey = '';
  }
}
