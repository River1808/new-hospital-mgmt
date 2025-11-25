package hospital.staffClasses;

public class Nurse extends Employee {

    private String dutyArea;

    // 1. Empty constructor for JSON (Jackson)
    public Nurse() {
        super();
    }

    // 2. Constructor required by Main.java (matches Employee super constructor)
    public Nurse(int id, String name, String department, String role) {
        super(id, name, department, role);
    }

    // 3. Specific constructor (if you want to use specific fields)
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