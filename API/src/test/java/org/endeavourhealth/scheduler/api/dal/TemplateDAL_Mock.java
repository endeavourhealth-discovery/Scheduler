package org.endeavourhealth.scheduler.api.dal;

public class TemplateDAL_Mock implements SchedulerDAL {
    public boolean getGreetingCalled = false;
    @Override
    public String getGreeting() {
        this.getGreetingCalled = true;
        return "Hello mock";
    }
}
