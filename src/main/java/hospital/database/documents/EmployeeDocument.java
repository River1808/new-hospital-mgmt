package hospital.database.documents;

import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;

public class EmployeeDocument {

    @BsonId
    private String databaseId;  

    @BsonProperty("id")
    private int id;

    @BsonProperty("name")
    private String name;

    @BsonProperty("department")
    private String department;

    @BsonProperty("role")
    private String role;

    // ----- Constructors -----

    public EmployeeDocument() {
    }

    public EmployeeDocument(String databaseId, int id, String name, String department, String role) {
        this.databaseId = databaseId;
        this.id = id;
        this.name = name;
        this.department = department;
        this.role = role;
    }

    // ----- Getters & Setters -----

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
}

