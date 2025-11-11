package hospital.staffClasses;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "employees")

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "role" 
)
@JsonSubTypes({

    @JsonSubTypes.Type(value = Doctor.class, name = "Doctor"),
    @JsonSubTypes.Type(value = Nurse.class, name = "Nurse"),
    @JsonSubTypes.Type(value = MaintenanceStaff.class, name = "MaintenanceStaff")
})


public abstract class Employee {

    @Id
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

    // --- Getters and Setters ---
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
    
    public final void displayEmployeeID() {
        System.out.println("Employee ID: " + id);
    }

    public abstract String getDetails();

    public abstract String getWorkingDays();

    @Override
    public String toString() {
        return "Employee ID: " + id + " | Name: " + name + " | Role: " + role;
    }
}