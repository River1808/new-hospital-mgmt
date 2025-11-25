package hospital.schedule;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;

public class LeaveRequest {

    // Changed from String to int to match your new ID logic
    private String id;

    private int employeeId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;

    private String status;
    private String reason;

    public LeaveRequest() {
    }

    public LeaveRequest(String id, int employeeId, Date startDate, Date endDate, String status, String reason) {
        this.id = id;
        this.employeeId = employeeId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.reason = reason;
    }

    // Constructor without ID (for creating new requests before saving)
    public LeaveRequest(int employeeId, Date startDate, Date endDate, String status, String reason) {
        this.employeeId = employeeId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.reason = reason;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public int getEmployeeId() { return employeeId; }
    public void setEmployeeId(int employeeId) { this.employeeId = employeeId; }

    public Date getStartDate() { return startDate; }
    public void setStartDate(Date startDate) { this.startDate = startDate; }

    public Date getEndDate() { return endDate; }
    public void setEndDate(Date endDate) { this.endDate = endDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}