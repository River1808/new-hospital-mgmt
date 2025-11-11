package hospital.staffClasses;

public class Doctor extends Employee {
    private String specialtyArea;
    private boolean onDuty;
    private boolean emergencyCall;
    public Doctor() {
        super();
    }
    public Doctor(int id, String name, String department, String specialtyArea, boolean emergencyCall) {
        super(id, name, department, "Doctor");
        this.specialtyArea = specialtyArea;
        this.onDuty = false;
        this.emergencyCall = emergencyCall;
    }

    // Getters and setters
    public String getSpecialtyArea() {
        return specialtyArea;
    }

    public void setSpecialtyArea(String specialtyArea) {
        this.specialtyArea = specialtyArea;
    }

    public boolean isOnDuty() {
        return onDuty;
    }

    public void setOnDuty(boolean onDuty) {
        this.onDuty = onDuty;
    }

    public boolean isEmergencyCall() {
        return emergencyCall;
    }

    public void setEmergencyCall(boolean emergencyCall) {
        this.emergencyCall = emergencyCall;
    }

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

class GP extends Doctor {
    public GP(int id, String name, String department) {
        super(id, name, department, "General Practitioner", false);
    }
}

class Cardiologist extends Doctor {
    public Cardiologist(int id, String name, String department) {
        super(id, name, department, "Cardiologist", false);
    }
}

class Psychiatrist extends Doctor {
    public Psychiatrist(int id, String name, String department) {
        super(id, name, department, "Psychiatrist", true);
    }
}

class Radiologist extends Doctor {
    public Radiologist(int id, String name, String department) {
        super(id, name, department, "Radiologist", false);
    }
}

class Neurologist extends Doctor {
    public Neurologist(int id, String name, String department) {
        super(id, name, department, "Neurologist", true);
    }
}

class Anesthesiologist extends Doctor {
    public Anesthesiologist(int id, String name, String department) {
        super(id, name, department, "Anesthesiologist", true);
    }
}

class Surgeon extends Doctor {
    public Surgeon(int id, String name, String department) {
        super(id, name, department, "Surgeon", true);
    }
}
