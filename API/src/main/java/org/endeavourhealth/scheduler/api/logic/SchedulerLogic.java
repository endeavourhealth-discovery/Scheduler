package org.endeavourhealth.scheduler.api.logic;

import org.endeavourhealth.common.config.ConfigManagerException;
import org.endeavourhealth.scheduler.api.dal.SchedulerDAL_JDBC;
import org.endeavourhealth.scheduler.api.dal.SchedulerDAL;
import org.endeavourhealth.scheduler.models.database.ExtractEntity;

import java.util.List;

public class SchedulerLogic {

    private SchedulerDAL dal;

    public SchedulerLogic() {
        try {
            this.dal = new SchedulerDAL_JDBC();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public SchedulerLogic(SchedulerDAL dal) {
        this.dal = dal;
    }

    public String getMessage(String name) {
        return dal.getGreeting() + " " + name;
    }

    public List<ExtractEntity> getAllExtracts() {
        return dal.getAllExtracts();
    }
}
