package hospital.database.documents;

import java.util.Date;

public class LeaveRequestDocument {

    private String id;   
    private int employeeId;
    private Date startDate;
    private Date endDate;
    private String status;
    private String reason;

    public LeaveRequestDocument() {}

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
