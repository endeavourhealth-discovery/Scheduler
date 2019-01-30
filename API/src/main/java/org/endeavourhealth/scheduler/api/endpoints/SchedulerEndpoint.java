package org.endeavourhealth.scheduler.api.endpoints;
import com.codahale.metrics.annotation.Timed;
import io.astefanutti.metrics.aspectj.Metrics;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.endeavourhealth.common.security.annotations.RequiresAdmin;
import org.endeavourhealth.scheduler.api.json.JsonExtract;
import org.endeavourhealth.scheduler.api.logic.SchedulerLogic;
import org.endeavourhealth.scheduler.models.database.ExtractEntity;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.List;

@Path("/scheduler")
@Metrics(registry = "schedulerMetricRegistry")
@Api(description = "Api for all calls relating to the Scheduler")
public class SchedulerEndpoint {

    private static final Logger LOG = LoggerFactory.getLogger(SchedulerEndpoint.class);

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Timed(absolute = true, name="Scheduler.SchedulerEndpoint.Get.Get") // metrics name <application>.<endpoint>.<path>.<method>
    @Path("/get")
    @ApiOperation(value = "Returns a list of all extracts") // operation description
    public Response get(@Context SecurityContext sc) throws Exception {

        LOG.debug("Get All Extracts Called");

        List<ExtractEntity> result = new SchedulerLogic().getAllExtracts();

        return Response
                .ok(result)
                .build();
    }

    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Timed(absolute = true, name="Scheduler.SchedulerEndpoint.Delete")
    @Path("/")
    @ApiOperation(value = "Delete an extract based on id that is passed to the API.  Warning! This is permanent.")
    public Response deleteExtract(@Context SecurityContext sc,
                                  @ApiParam(value = "ID of the extract to be deleted")
                                  @QueryParam("id") String id) throws Exception {

        LOG.debug("Delete Extract called");

        new SchedulerLogic().deleteExtract(id);

        return Response
                .ok()
                .build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Timed(absolute = true, name="Scheduler.SchedulerEndpoint.saveUser")
    @Path("/extract/save")
    @RequiresAdmin
    @ApiOperation(value = "Saves an extract or updates an existing extract")
    public Response saveExtract(@Context SecurityContext sc, JsonExtract jsonExtract,
                             @ApiParam(value = "edit mode") @QueryParam("editMode") String editMode) throws Exception {

        LOG.debug("Save Extract called");

        boolean isEdit = editMode.equals("1");
        JSONObject definition = new JSONObject(jsonExtract.getDefinition());

        ExtractEntity extract = new ExtractEntity();
        extract.setExtractId(jsonExtract.getExtractId());
        extract.setExtractName(jsonExtract.getExtractName());
        extract.setCohortId(jsonExtract.getCohortId());
        extract.setCodeSetId(jsonExtract.getCodeSetId());
        extract.setDatasetId(jsonExtract.getDatasetId());
        extract.setDefinition(definition.toString());
        extract.setTransactionId(jsonExtract.getTransactionId());

        extract = new SchedulerLogic().saveExtract(extract, isEdit);
        jsonExtract.setExtractId(extract.getExtractId());

        return Response
                .ok()
                .entity(jsonExtract)
                .build();
    }
}
