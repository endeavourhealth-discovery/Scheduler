package org.endeavourhealth.scheduler.api.dal;

import java.util.List;
import org.endeavourhealth.scheduler.models.database.ExtractEntity;

public interface SchedulerDAL {

    String getGreeting();

    List<ExtractEntity> getAllExtracts();

}
