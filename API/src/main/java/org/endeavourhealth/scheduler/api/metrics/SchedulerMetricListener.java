package org.endeavourhealth.scheduler.api.metrics;

import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.servlets.MetricsServlet;

public class SchedulerMetricListener extends MetricsServlet.ContextListener {
    public static final MetricRegistry schedulerMetricRegistry = SchedulerInstrumentedFilterContextListener.REGISTRY;

    @Override
    protected MetricRegistry getMetricRegistry() {
        return schedulerMetricRegistry;
    }
}
