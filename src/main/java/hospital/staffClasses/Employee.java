package hospital.staffClasses;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "employee") 
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

    // 1. The MongoDB ID (internal, hidden)
    @Id
    private String databaseId;

    // 2. Your Employee ID (visible, number)
    private int id;

    private String name;
    private String department;
    private String role;

    // Constructor takes 'int id'
    public Employee(int id, String name, String department, String role) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.role = role;
    }

    public Employee() {
    }

    // --- Getters and Setters ---

    public String getDatabaseId() {
        return databaseId;
    }

    public void setDatabaseId(String databaseId) {
        this.databaseId = databaseId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public final void displayEmployeeID() {
        System.out.println("Employee ID: " + id);
    }

    @Override
    public abstract String getDetails();

    @Override
    public abstract String getWorkingDays();

    @Override
    public String toString() {
        return "Employee ID: " + id + " | Name: " + name + " | Role: " + role;
    }
}