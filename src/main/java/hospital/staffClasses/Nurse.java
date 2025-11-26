package hospital.staffClasses;

public class Nurse extends Employee {


    // Empty constructor for JSON 
    public Nurse() {
        super();
    }

    // Constructor required by Main.java 
    public Nurse(int id, String name, String department, String role) {
        super(id, name, department, role);
    }


    @Override
    public String getDetails() {
        return "Nurse: " + getName()
                + ", Department: " + getDepartment();
    }

    @Override
    public String getWorkingDays() {
        return "Nurses work 6 days per week with Sunday off.";
    }
}