package hospital.schedule;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;

public class Shift {

    // Changed from String to int to match your new ID logic
    private String id;

    private int employeeId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    
    private String startTime;
    private String endTime;
    private String role;

    public Shift() {
    }

    public Shift(String id, int employeeId, Date date, String startTime, String endTime, String role) {
        this.id = id;
        this.employeeId = employeeId;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.role = role;
    }

    // Constructor without ID (for creating new shifts before saving)
    public Shift(int employeeId, Date date, String startTime, String endTime, String role) {
        this.employeeId = employeeId;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.role = role;
    }

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