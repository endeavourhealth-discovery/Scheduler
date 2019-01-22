package org.endeavourhealth.scheduler.api.endpoints;
import com.codahale.metrics.annotation.Timed;
import io.astefanutti.metrics.aspectj.Metrics;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.endeavourhealth.scheduler.api.logic.TemplateLogic;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

@Path("/scheduler")
@Metrics(registry = "schedulerMetricRegistry")
@Api(description = "Api for all calls relating to the Scheduler")
public class SchedulerEndpoint {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Timed(absolute = true, name="Scheduler.SchedulerEndpoint.List.Get") // metrics name <application>.<endpoint>.<path>.<method>
    @Path("/list")
    @ApiOperation(value = "Returns a list of all extracts") // operation description
    public Response get(@Context SecurityContext sc,
                        @ApiParam(value = "Mandatory name") @QueryParam("name") String name
    ) {
        System.out.println("Get Called");

        String result = new TemplateLogic().getMessage(name);

        return Response
            .ok(result)
            .build();
    }
}
