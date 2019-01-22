package org.endeavourhealth.scheduler.api.logic;

import org.endeavourhealth.scheduler.api.dal.SchedulerDAL_JDBC;
import org.endeavourhealth.scheduler.api.dal.SchedulerDAL;

public class TemplateLogic {
    private SchedulerDAL dal;

    public TemplateLogic() {
        this.dal = new SchedulerDAL_JDBC();
    }

    public TemplateLogic(SchedulerDAL dal) {
        this.dal = dal;
    }

    public String getMessage(String name) {
        return dal.getGreeting() + " " + name;
    }
}
