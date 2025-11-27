package hospital.database.documents;

import java.util.Date;

public class ShiftDocument {

    private String id;       
    private int employeeId;
    private Date date;
    private String startTime;
    private String endTime;
    private String role;

    public ShiftDocument() {}

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public int getEmployeeId() { return employeeId; }
    public void setEmployeeId(int employeeId) { this.employeeId = employeeId; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }

    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
