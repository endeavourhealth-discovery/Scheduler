package org.endeavourhealth.scheduler.api.json;

public class JsonDefinition {

    private String name = null;
    private Integer id = null;
    private String projectId = null;
    private JsonFileLocationDetails fileLocationDetails = null;
    private JsonSftpConnectionDetails sftpConnectionDetails = null;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public JsonFileLocationDetails getFileLocationDetails() {
        return fileLocationDetails;
    }

    public void setFileLocationDetails(JsonFileLocationDetails fileLocationDetails) {
        this.fileLocationDetails = fileLocationDetails;
    }

    public JsonSftpConnectionDetails getSftpConnectionDetails() {
        return sftpConnectionDetails;
    }

    public void setSftpConnectionDetails(JsonSftpConnectionDetails sftpConnectionDetails) {
        this.sftpConnectionDetails = sftpConnectionDetails;
    }
}
