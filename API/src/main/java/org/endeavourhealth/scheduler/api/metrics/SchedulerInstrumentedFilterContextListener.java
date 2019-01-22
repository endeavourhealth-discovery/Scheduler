package org.endeavourhealth.scheduler.api.metrics;


import com.codahale.metrics.MetricRegistry;
import com.codahale.metrics.SharedMetricRegistries;
import com.codahale.metrics.servlet.InstrumentedFilterContextListener;

public class SchedulerInstrumentedFilterContextListener extends InstrumentedFilterContextListener {

    public static final MetricRegistry REGISTRY = SharedMetricRegistries.getOrCreate("schedulerMetricRegistry");

    @Override
    protected MetricRegistry getMetricRegistry() {
        return REGISTRY;
    }
}
