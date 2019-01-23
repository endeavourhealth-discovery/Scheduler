package org.endeavourhealth.scheduler.api.dal;

import java.util.List;

import org.endeavourhealth.common.config.ConfigManager;
import org.endeavourhealth.common.config.ConfigManagerException;
import org.endeavourhealth.scheduler.models.database.ExtractEntity;

public class SchedulerDAL_JDBC implements SchedulerDAL {

    public SchedulerDAL_JDBC() throws ConfigManagerException {
        ConfigManager.Initialize("data-generator");
    }

    @Override
    public String getGreeting() {
        return "Hello";
    }

    @Override
    public List<ExtractEntity> getAllExtracts() {
        try {
            List<ExtractEntity> allExtracts = ExtractEntity.getAllExtracts();
            return allExtracts;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
