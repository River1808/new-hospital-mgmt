package hospital.schedule;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "leaveRequests") 
public class LeaveRequest {

    @Id
    private int employeeId;
    private LocalDate startDate; 
    private LocalDate endDate;
    private String status;
    private String reason;


    public LeaveRequest() {
    }
    
    // Constructor
    public LeaveRequest(int employeeId, LocalDate startDate, LocalDate endDate, String status, String reason)
    {
        this.employeeId = employeeId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.reason = reason;
    }

    // --- Getters and Setters ---
    public int getEmployeeId()
    {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public LocalDate getStartDate()
    {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate()
    {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getStatus()
    {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReason()
    {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}