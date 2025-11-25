package hospital.staffClasses;

public class Nurse extends Employee {

    private String dutyArea;

    // Empty constructor for JSON 
    public Nurse() {
        super();
    }

    // Constructor required by Main.java 
    public Nurse(int id, String name, String department, String role) {
        super(id, name, department, role);
    }

    // Specific constructor 
    public Nurse(int id, String name, String department, String role, String dutyArea) {
        super(id, name, department, role);
        this.dutyArea = dutyArea;
    }

    public String getDutyArea() { return dutyArea; }
    public void setDutyArea(String dutyArea) { this.dutyArea = dutyArea; }

    @Override
    public String getDetails() {
        return "Nurse: " + getName()
                + ", Department: " + getDepartment()
                + (dutyArea != null ? ", Duty Area: " + dutyArea : "");
    }

    @Override
    public String getWorkingDays() {
        return "Nurses work 6 days per week with Sunday off.";
    }
}