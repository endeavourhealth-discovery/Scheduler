package org.endeavourhealth.scheduler.api.logic;

import com.cronutils.descriptor.CronDescriptor;
import com.cronutils.model.Cron;
import com.cronutils.model.definition.CronDefinition;
import com.cronutils.model.definition.CronDefinitionBuilder;
import com.cronutils.parser.CronParser;
import org.endeavourhealth.scheduler.api.dal.SchedulerDAL_JDBC;
import org.endeavourhealth.scheduler.api.dal.SchedulerDAL;
import org.endeavourhealth.scheduler.models.database.ExtractEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Locale;

import static com.cronutils.model.CronType.QUARTZ;

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

    public String describeCron(String cron) {

        CronDefinition cronDefinition =
                CronDefinitionBuilder.instanceDefinitionFor(QUARTZ);
        CronParser parser = new CronParser(cronDefinition);
        CronDescriptor descriptor = CronDescriptor.instance(Locale.UK);

        String message;
        try {
            message = descriptor.describe(parser.parse(cron));
        } catch (Exception e) {
            message = e.getMessage();
        }
        return message;
    }

    public ExtractEntity saveExtract(ExtractEntity extract, boolean isEdit) throws Exception {

        CronDefinition cronDefinition =
                CronDefinitionBuilder.instanceDefinitionFor(QUARTZ);
        CronParser parser = new CronParser(cronDefinition);
        parser.parse(extract.getCron());

        if (isEdit) {
            extract = ExtractEntity.updateExtract(extract);
        } else {
            extract = ExtractEntity.createExtract(extract);
        }
        return extract;
    }
}
