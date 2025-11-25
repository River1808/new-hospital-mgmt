package hospital.staffClasses;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "_class"
)
@JsonSubTypes({
    @JsonSubTypes.Type(value = Doctor.class, name = "Doctor"),
    @JsonSubTypes.Type(value = GP.class, name = "GP"),
    @JsonSubTypes.Type(value = Cardiologist.class, name = "Cardiologist"),
    @JsonSubTypes.Type(value = Psychiatrist.class, name = "Psychiatrist"),
    @JsonSubTypes.Type(value = Radiologist.class, name = "Radiologist"),
    @JsonSubTypes.Type(value = Neurologist.class, name = "Neurologist"),
    @JsonSubTypes.Type(value = Anesthesiologist.class, name = "Anesthesiologist"),
    @JsonSubTypes.Type(value = Surgeon.class, name = "Surgeon"),
    @JsonSubTypes.Type(value = Nurse.class, name = "Nurse"),
    @JsonSubTypes.Type(value = MaintenanceStaff.class, name = "Maintenance Staff")
})
public abstract class Employee implements WorkSchedule {

    private String databaseId;

    private int id;

    private String name;
    private String department;
    private String role;

    public Employee(int id, String name, String department, String role) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.role = role;
    }

    public Employee() {
    }

    // Getters and Setters
    public String getDatabaseId() { return databaseId; }
    public void setDatabaseId(String databaseId) { this.databaseId = databaseId; }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public final String getCompanyEmail() {
        if (name == null) return "unknown@hospital.com";
        String cleanName = name.trim().toLowerCase().replaceAll("\\s+", ".");
        return cleanName + "." + id + "@hospital.com";
    }

    @Override
    public abstract String getDetails();

    @Override
    public abstract String getWorkingDays();
}