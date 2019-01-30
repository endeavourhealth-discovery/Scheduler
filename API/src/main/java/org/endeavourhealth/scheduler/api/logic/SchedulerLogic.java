package org.endeavourhealth.scheduler.api.logic;

import org.endeavourhealth.scheduler.api.dal.SchedulerDAL_JDBC;
import org.endeavourhealth.scheduler.api.dal.SchedulerDAL;
import org.endeavourhealth.scheduler.models.database.ExtractEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class SchedulerLogic {

    private static final Logger LOG = LoggerFactory.getLogger(SchedulerLogic.class);

    private SchedulerDAL dal;

    public SchedulerLogic() {
        try {
            this.dal = new SchedulerDAL_JDBC();
        } catch (Exception e) {
            LOG.error(e.getMessage());
        }
    }

    public List<ExtractEntity> getAllExtracts() throws Exception {
        return ExtractEntity.getAllExtracts();
    }

    public void deleteExtract(String id) throws Exception {
        ExtractEntity.deleteExtract(Integer.valueOf(id));
    }

    public ExtractEntity saveExtract(ExtractEntity extract, boolean isEdit) throws Exception {

        if (isEdit) {
            extract = ExtractEntity.updateExtract(extract);
        } else {
            extract = ExtractEntity.createExtract(extract);
        }
        return extract;
    }
}
