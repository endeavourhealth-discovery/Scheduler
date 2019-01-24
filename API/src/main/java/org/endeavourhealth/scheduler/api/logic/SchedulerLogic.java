package org.endeavourhealth.scheduler.api.logic;

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

    public List<ExtractEntity> getAllExtracts() {
        return dal.getAllExtracts();
    }

    public void deleteExtract(String id) {
        dal.deleteExtract(id);
    }

}
