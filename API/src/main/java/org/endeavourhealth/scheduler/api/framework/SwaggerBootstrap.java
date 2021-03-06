package org.endeavourhealth.scheduler.api.framework;

import com.codahale.metrics.jvm.*;
import io.swagger.jaxrs.config.SwaggerContextService;
import io.swagger.models.Info;
import io.swagger.models.Swagger;
import io.swagger.models.auth.OAuth2Definition;
import org.endeavourhealth.coreui.framework.config.ConfigService;
import org.endeavourhealth.scheduler.api.metrics.SchedulerInstrumentedFilterContextListener;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import java.lang.management.ManagementFactory;

public class SwaggerBootstrap extends HttpServlet {
    @Override
    public void init(ServletConfig config) throws ServletException {
        Info info = new Info()
                .title("Scheduler API")
                .description("Documentation for the scheduler api ");

        System.out.println("API is running!!!");

        String baseAuthUrl = ConfigService.instance().getAuthConfig().getAuthServerUrl() +
                "/realms/" + ConfigService.instance().getAuthConfig().getRealm() + "/protocol/openid-connect";

        Swagger swagger = new Swagger().info(info);
        swagger.basePath("/api");
        swagger.securityDefinition("oauth",
                new OAuth2Definition()
                        .accessCode(baseAuthUrl + "/auth", baseAuthUrl + "/token")
                );
        new SwaggerContextService().withServletConfig(config).updateSwagger(swagger);

        SchedulerInstrumentedFilterContextListener.REGISTRY.register("Garbage Collection", new GarbageCollectorMetricSet());
        SchedulerInstrumentedFilterContextListener.REGISTRY.register("Buffers", new BufferPoolMetricSet(ManagementFactory.getPlatformMBeanServer()));
        SchedulerInstrumentedFilterContextListener.REGISTRY.register("Memory", new MemoryUsageGaugeSet());
        SchedulerInstrumentedFilterContextListener.REGISTRY.register("Threads", new ThreadStatesGaugeSet());
        SchedulerInstrumentedFilterContextListener.REGISTRY.register("File Descriptor", new FileDescriptorRatioGauge());
    }
}
