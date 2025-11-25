package hospital.staffClasses;

public class MaintenanceStaff extends Employee {

    private String dutyArea;

    public MaintenanceStaff() {
        super();
    }

    public MaintenanceStaff(int id, String name, String department, String role) {
        super(id, name, department, role);
    }

    public MaintenanceStaff(int id, String name, String department, String role, String dutyArea) {
        super(id, name, department, role);
        this.dutyArea = dutyArea;
    }

    public String getDutyArea() { return dutyArea; }
    public void setDutyArea(String dutyArea) { this.dutyArea = dutyArea; }

    @Override
    public String getDetails() {
        return "Maintenance Staff: " + getName()
                + " , Department: " + getDepartment();
    }

    @Override
    public String getWorkingDays() {
        return "Maintenance staff work 6 days per week with Sunday off.";
    }

    public void markOnDuty(boolean duty) {
        System.out.println(getName() + " duty status: " + (duty ? "On Duty" : "Off Duty"));
    }
}