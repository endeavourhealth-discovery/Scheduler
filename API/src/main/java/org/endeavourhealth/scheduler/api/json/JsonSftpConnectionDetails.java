package org.endeavourhealth.scheduler.api.json;

public class JsonSftpConnectionDetails {

    private String hostname = null;
    private String hostPublicKey = null;
    private Integer port = null;
    private String username = null;
    private String clientPrivateKeyPassword = null;
    private String clientPrivateKey = null;

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public String getHostPublicKey() {
        return hostPublicKey;
    }

    public void setHostPublicKey(String hostPublicKey) {
        this.hostPublicKey = hostPublicKey;
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getClientPrivateKeyPassword() {
        return clientPrivateKeyPassword;
    }

    public void setClientPrivateKeyPassword(String clientPrivateKeyPassword) {
        this.clientPrivateKeyPassword = clientPrivateKeyPassword;
    }

    public String getClientPrivateKey() {
        return clientPrivateKey;
    }

    public void setClientPrivateKey(String clientPrivateKey) {
        this.clientPrivateKey = clientPrivateKey;
    }
}
