package hospital.staffClasses;

public class Nurse extends Employee{
    private String dutyArea;
    private boolean onDuty;

    // This is REQUIRED by Spring for fetching data from the database.
    public Nurse() {
        super();
    }
    
    public Nurse(String id, String name, String department, String dutyArea) {
        super(id, name, department, "Nurse"); // This "Nurses" role is correct
        this.dutyArea = dutyArea;
        this.onDuty = false; //default
    }

    // Encapsulation
    public String getDutyArea() {
        return dutyArea;
    }

    public void setDutyArea(String dutyArea) {
        this.dutyArea = dutyArea;
    }

    public boolean isOnDuty() {
        return onDuty;
    }

    public void setOnDuty(boolean onDuty) {
        this.onDuty = onDuty;
    }

    @Override
    public String getDetails() {
        return "Nurse: " + getName()
                + " Department: " + getDepartment()
                + " Duty Area: " + dutyArea
                + " On Duty: " + (onDuty ? "Yes" : "No");
    }
    @Override
    public String getWorkingDays() {
        return "Nurses work 6 days per week with Sunday off.";
    }
    public void markOnDuty(boolean duty) {
        this.onDuty = duty;
        System.out.println(getName() + " duty status: " + (duty ? "On Duty" : "Off Duty"));
    }
}