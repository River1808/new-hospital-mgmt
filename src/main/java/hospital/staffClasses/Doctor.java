package hospital.staffClasses;

public class Doctor extends Employee {
    private String specialtyArea;
    private boolean onDuty;
    private boolean emergencyCall;

    public Doctor() {
        super();
    }

    // MODIFIED: 'employeeId' is now 'id'
    public Doctor(int id, String name, String department, String role, String specialtyArea, boolean emergencyCall) {
        super(id, name, department, role); // <-- FIXED
        this.specialtyArea = specialtyArea;
        this.onDuty = false;
        this.emergencyCall = emergencyCall;
    }
    
    // MODIFIED: 'employeeId' is now 'id'
    public Doctor(int id, String name, String department, String specialtyArea, boolean emergencyCall) {
        super(id, name, department, "Doctor"); // <-- FIXED
        this.specialtyArea = specialtyArea;
        this.onDuty = false;
        this.emergencyCall = emergencyCall;
    }

    // (All getters/setters are fine)
    public String getSpecialtyArea() { return specialtyArea; }
    public void setSpecialtyArea(String specialtyArea) { this.specialtyArea = specialtyArea; }
    public boolean isOnDuty() { return onDuty; }
    public void setOnDuty(boolean onDuty) { this.onDuty = onDuty; }
    public boolean isEmergencyCall() { return emergencyCall; }
    public void setEmergencyCall(boolean emergencyCall) { this.emergencyCall = emergencyCall; }

    @Override
    public String getDetails() { /* (no change) */
        return "Doctor: " + getName() +
                " Department: " + getDepartment() +
                " Specialty: " + specialtyArea +
                " On Duty: " + (onDuty ? "Yes" : "No") +
                " Emergency Call: " + (emergencyCall ? "Available" : "Not Available");
    }
    @Override
    public String getWorkingDays() { /* (no change) */
        return "Doctors typically work 5 days per week with rotating on-call duties.";
    }
    public void markOnDuty(boolean duty) { /* (no change) */
        this.onDuty = duty;
        System.out.println(getName() + (duty ? " is on duty." : " is off duty."));
    }
}

// --- All Subclasses must also be updated ---

class GP extends Doctor {
    public GP() { super(); }
    public GP(int id, String name, String department) { // <-- FIXED
        super(id, name, department, "GP", "General Practitioner", false); // <-- FIXED
    }
}

class Cardiologist extends Doctor {
    public Cardiologist() { super(); }
    public Cardiologist(int id, String name, String department) { // <-- FIXED
        super(id, name, department, "Cardiologist", "Cardiologist", false); // <-- FIXED
    }
}

class Psychiatrist extends Doctor {
    public Psychiatrist() { super(); }
    public Psychiatrist(int id, String name, String department) { // <-- FIXED
        super(id, name, department, "Psychiatrist", "Psychiatrist", true); // <-- FIXED
    }
}

class Radiologist extends Doctor {
    public Radiologist() { super(); }
    public Radiologist(int id, String name, String department) { // <-- FIXED
        super(id, name, department, "Radiologist", "Radiologist", false); // <-- FIXED
    }
}

class Neurologist extends Doctor {
    public Neurologist() { super(); }
    public Neurologist(int id, String name, String department) { // <-- FIXED
        super(id, name, department, "Neurologist", "Neurologist", true); // <-- FIXED
    }
}

class Anesthesiologist extends Doctor {
    public Anesthesiologist() { super(); }
    public Anesthesiologist(int id, String name, String department) { // <-- FIXED
        super(id, name, department, "Anesthesiologist", "Anesthesiologist", true); // <-- FIXED
    }
}

class Surgeon extends Doctor {
    public Surgeon() { super(); }
    public Surgeon(int id, String name, String department) { // <-- FIXED
        super(id, name, department, "Surgeon", "Surgeon", true); // <-- FIXED
    }
}