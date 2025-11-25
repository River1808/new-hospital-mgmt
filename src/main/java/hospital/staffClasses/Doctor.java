package hospital.staffClasses;

// Partial generic class
public class Doctor<S> extends Employee {

    private S specialtyArea;   // Generic
    private boolean emergencyCall;

    public Doctor() {
        super();
    }

    // Constructor matching the super(id, name, department, role) requirement
    public Doctor(int id, String name, String department, String role) {
        super(id, name, department, role);
    }

    public Doctor(int id, String name, String department, String role,
                  S specialtyArea, boolean emergencyCall) {
        super(id, name, department, role);
        this.specialtyArea = specialtyArea;
        this.emergencyCall = emergencyCall;
    }

    // Generic getter/setter
    public S getSpecialtyArea() { return specialtyArea; }
    public void setSpecialtyArea(S specialtyArea) { this.specialtyArea = specialtyArea; }


    public boolean isEmergencyCall() { return emergencyCall; }
    public void setEmergencyCall(boolean emergencyCall) { this.emergencyCall = emergencyCall; }

    @Override
    public String getDetails() {
        return "Doctor: " + getName() +
                " , Department: " + getDepartment() +
                " , Emergency Call: " + (emergencyCall ? "Available" : "Not Available");
    }

    @Override
    public String getWorkingDays() {
        return "Doctors typically work 5 days per week with rotating on-call duties.";
    }
}

// --- Subclasses (Package-Private) ---

class GP extends Doctor<String> {

    public GP() {
        super();
    }

    // Matches the 4-arg constructor called by Main.java logic if needed, 
    // or strictly uses the specific one below.
    public GP(int id, String name, String department, String role) {
        super(id, name, department, role, "General Practice", false);
    }
}

class Cardiologist extends Doctor<String> {

    public Cardiologist() {
        super();
    }

    public Cardiologist(int id, String name, String department, String role) {
        super(id, name, department, role, "Cardiology", false);
    }
}

class Psychiatrist extends Doctor<String> {

    public Psychiatrist() {
        super();
    }

    public Psychiatrist(int id, String name, String department, String role) {
        super(id, name, department, role, "Psychiatry", true);
    }
}

class Radiologist extends Doctor<String> {

    public Radiologist() {
        super();
    }

    public Radiologist(int id, String name, String department, String role) {
        super(id, name, department, role, "Radiology", false);
    }
}

class Neurologist extends Doctor<String> {

    public Neurologist() {
        super();
    }

    public Neurologist(int id, String name, String department, String role) {
        super(id, name, department, role, "Neurology", true);
    }
}

class Anesthesiologist extends Doctor<String> {

    public Anesthesiologist() {
        super();
    }

    public Anesthesiologist(int id, String name, String department, String role) {
        super(id, name, department, role, "Anesthesiology", true);
    }
}

class Surgeon extends Doctor<String> {

    public Surgeon() {
        super();
    }

    public Surgeon(int id, String name, String department, String role) {
        super(id, name, department, role, "Surgery", true);
    }
}