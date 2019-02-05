package org.endeavourhealth.scheduler.api.json;

public class JsonExtract {

    private Integer extractId = null;
    private String extractName = null;
    private Integer cohortId = null;
    private Integer codeSetId = null;
    private Integer datasetId = null;
    private JsonDefinition definition = null;
    private Long transactionId = null;
    private String cron = null;
    private Boolean clearCohortEveryRun = null;

    public Integer getExtractId() {
        return extractId;
    }

    public void setExtractId(Integer extractId) {
        this.extractId = extractId;
    }

    public String getExtractName() {
        return extractName;
    }

    public void setExtractName(String extractName) {
        this.extractName = extractName;
    }

    public Integer getCohortId() {
        return cohortId;
    }

    public void setCohortId(Integer cohortId) {
        this.cohortId = cohortId;
    }

    public Integer getCodeSetId() {
        return codeSetId;
    }

    public void setCodeSetId(Integer codeSetId) {
        this.codeSetId = codeSetId;
    }

    public Integer getDatasetId() {
        return datasetId;
    }

    public void setDatasetId(Integer datasetId) {
        this.datasetId = datasetId;
    }

    public JsonDefinition getDefinition() {
        return definition;
    }

    public void setDefinition(JsonDefinition definition) {
        this.definition = definition;
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    public String getCron() {
        return cron;
    }

    public void setCron(String cron) {
        this.cron = cron;
    }

    public Boolean getClearCohortEveryRun() {
        return clearCohortEveryRun;
    }

    public void setClearCohortEveryRun(Boolean clearCohortEveryRun) {
        this.clearCohortEveryRun= clearCohortEveryRun;
    }

}
