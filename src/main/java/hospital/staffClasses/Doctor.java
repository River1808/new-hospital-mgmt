package hospital.staffClasses;

public class Doctor extends Employee {
    private String specialtyArea;
    private boolean onDuty;
    private boolean emergencyCall;

    public Doctor() {
        super();
    }

    // MODIFIED: This constructor now accepts a 'role'
    // This fixes the logic bug where all subclasses had the role "Doctor"
    public Doctor(int id, String name, String department, String role, String specialtyArea, boolean emergencyCall) {
        // This 'role' variable is passed up to Employee
        super(id, name, department, role); 
        this.specialtyArea = specialtyArea;
        this.onDuty = false;
        this.emergencyCall = emergencyCall;
    }
    
    // This is a new constructor for creating a "generic" Doctor
    public Doctor(int id, String name, String department, String specialtyArea, boolean emergencyCall) {
        // This constructor hard-codes the role as "Doctor"
        super(id, name, department, "Doctor"); 
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
    // ADDED: No-arg constructor
    public GP() {
        super();
    }

    // MODIFIED: This now passes the correct role ("General Practitioner") to the new constructor
    public GP(int id, String name, String department) {
        super(id, name, department, "GP", "GP", false);
    }
}

class Cardiologist extends Doctor {
    // ADDED: No-arg constructor
    public Cardiologist() {
        super();
    }
    
    // MODIFIED: This now passes the correct role
    public Cardiologist(int id, String name, String department) {
        super(id, name, department, "Cardiologist", "Cardiologist", false);
    }
}

class Psychiatrist extends Doctor {
    // ADDED: No-arg constructor
    public Psychiatrist() {
        super();
    }
    
    // MODIFIED: This now passes the correct role
    public Psychiatrist(int id, String name, String department) {
        super(id, name, department, "Psychiatrist", "Psychiatrist", true);
    }
}

class Radiologist extends Doctor {
    // ADDED: No-arg constructor
    public Radiologist() {
        super();
    }
    
    // MODIFIED: This now passes the correct role
    public Radiologist(int id, String name, String department) {
        super(id, name, department, "Radiologist", "Radiologist", false);
    }
}

class Neurologist extends Doctor {
    // ADDED: No-arg constructor
    public Neurologist() {
        super();
    }
    
    // MODIFIED: This now passes the correct role
    public Neurologist(int id, String name, String department) {
        super(id, name, department, "Neurologist", "Neurologist", true);
    }
}

class Anesthesiologist extends Doctor {
    // ADDED: No-arg constructor
    public Anesthesiologist() {
        super();
    }
    
    // MODIFIED: This now passes the correct role
    public Anesthesiologist(int id, String name, String department) {
        super(id, name, department, "Anesthesiologist", "Anesthesiologist", true);
    }
}

class Surgeon extends Doctor {
    // ADDED: No-arg constructor
    public Surgeon() {
        super();
    }
    
    // MODIFIED: This now passes the correct role
    public Surgeon(int id, String name, String department) {
        super(id, name, department, "Surgeon", "Surgeon", true);
    }
}