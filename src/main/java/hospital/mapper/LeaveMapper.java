package hospital.mapper;

import hospital.schedule.LeaveRequest;
import org.bson.Document;

public class LeaveMapper {

    public static LeaveRequest fromDoc(Document doc) {
        return new LeaveRequest(
                doc.getObjectId("_id").toString(),
                doc.getInteger("employeeId"),
                doc.getDate("startDate"),
                doc.getDate("endDate"),
                doc.getString("status"),
                doc.getString("reason")
        );
    }

    public static Document toDoc(LeaveRequest r) {
        return new Document()
                .append("employeeId", r.getEmployeeId())
                .append("startDate", r.getStartDate())
                .append("endDate", r.getEndDate())
                .append("status", r.getStatus())
                .append("reason", r.getReason());
    }
}
