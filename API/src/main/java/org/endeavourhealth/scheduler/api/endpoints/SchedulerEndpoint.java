package org.endeavourhealth.scheduler.api.endpoints;
import com.codahale.metrics.annotation.Timed;
import io.astefanutti.metrics.aspectj.Metrics;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.endeavourhealth.scheduler.api.logic.SchedulerLogic;
import org.endeavourhealth.scheduler.models.database.ExtractEntity;

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

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Timed(absolute = true, name="Scheduler.SchedulerEndpoint.Message.Get") // metrics name <application>.<endpoint>.<path>.<method>
    @Path("/message")
    @ApiOperation(value = "Returns a list of all concepts") // operation description
    public Response get(@Context SecurityContext sc,
                        @ApiParam(value = "Mandatory name") @QueryParam("name") String name
    ) {
        System.out.println("Get Called");

        String result = new SchedulerLogic().getMessage(name);

        return Response
            .ok(result)
            .build();
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Timed(absolute = true, name="Scheduler.SchedulerEndpoint.List.Get") // metrics name <application>.<endpoint>.<path>.<method>
    @Path("/list")
    @ApiOperation(value = "Returns a list of all extracts") // operation description
    public Response list(@Context SecurityContext sc) {

        System.out.println("List Called");

        List<ExtractEntity> result = new SchedulerLogic().getAllExtracts();

        return Response
                .ok(result)
                .build();
    }
}
