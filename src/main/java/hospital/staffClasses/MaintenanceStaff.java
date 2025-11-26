package hospital.staffClasses;

public class MaintenanceStaff extends Employee {


    public MaintenanceStaff() {
        super();
    }

    public MaintenanceStaff(int id, String name, String department, String role) {
        super(id, name, department, role);
    }


    @Override
    public String getDetails() {
        return "Maintenance Staff: " + getName()
                + " , Department: " + getDepartment();
    }

    @Override
    public String getWorkingDays() {
        return "Maintenance staff work 6 days per week with Sunday off.";
    }

}