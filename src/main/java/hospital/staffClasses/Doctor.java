package hospital.staffClasses;

// Partial generic class
public class Doctor<S> extends Employee {

    private S specialtyArea;   // Generic
    private boolean onDuty;
    private boolean emergencyCall;

    public Doctor() {
        super();
    }

    public Doctor(int id, String name, String department, String role,
                  S specialtyArea, boolean emergencyCall) {

        super(id, name, department, role);
        this.specialtyArea = specialtyArea;
        this.onDuty = false;
        this.emergencyCall = emergencyCall;
    }

    // Generic getter/setter
    public S getSpecialtyArea() { return specialtyArea; }
    public void setSpecialtyArea(S specialtyArea) { this.specialtyArea = specialtyArea; }

    public boolean isOnDuty() { return onDuty; }
    public void setOnDuty(boolean onDuty) { this.onDuty = onDuty; }

    public boolean isEmergencyCall() { return emergencyCall; }
    public void setEmergencyCall(boolean emergencyCall) { this.emergencyCall = emergencyCall; }

    @Override
    public String getDetails() {
        return "Doctor: " + getName() +
                " Department: " + getDepartment() +
                " Specialty: " + specialtyArea +
                " On Duty: " + (onDuty ? "Yes" : "No") +
                " Emergency Call: " + (emergencyCall ? "Available" : "Not Available");
    }

    @Override
    public String getWorkingDays() {
        return "Doctors typically work 5 days per week with rotating on-call duties.";
    }

    public void markOnDuty(boolean duty) {
        this.onDuty = duty;
        System.out.println(getName() + (duty ? " is on duty." : " is off duty."));
    }
}

class GP extends Doctor<String> {

    public GP() {
        super();
    }

    public GP(int id, String name, String department) {
        super(id, name, department, "GP", "General Practice", false);
    }
}

class Cardiologist extends Doctor<String> {

    public Cardiologist() {
        super();
    }

    public Cardiologist(int id, String name, String department) {
        super(id, name, department, "Cardiologist", "Cardiology", false);
    }
}

class Psychiatrist extends Doctor<String> {

    public Psychiatrist() {
        super();
    }

    public Psychiatrist(int id, String name, String department) {
        super(id, name, department, "Psychiatrist", "Psychiatry", true);
    }
}

class Radiologist extends Doctor<String> {

    public Radiologist() {
        super();
    }

    public Radiologist(int id, String name, String department) {
        super(id, name, department, "Radiologist", "Radiology", false);
    }
}

class Neurologist extends Doctor<String> {

    public Neurologist() {
        super();
    }

    public Neurologist(int id, String name, String department) {
        super(id, name, department, "Neurologist", "Neurology", true);
    }
}

class Anesthesiologist extends Doctor<String> {

    public Anesthesiologist() {
        super();
    }

    public Anesthesiologist(int id, String name, String department) {
        super(id, name, department, "Anesthesiologist", "Anesthesiology", true);
    }
}

class Surgeon extends Doctor<String> {

    public Surgeon() {
        super();
    }

    public Surgeon(int id, String name, String department) {
        super(id, name, department, "Surgeon", "Surgery", true);
    }
}