package hospital.mapper;

import hospital.schedule.LeaveRequest;
import hospital.database.documents.LeaveRequestDocument;
import org.bson.Document;

public class LeaveMapper {

    // MongoDB Document → LeaveRequestDocument
    public static LeaveRequestDocument toDocumentModel(Document doc) {
        LeaveRequestDocument d = new LeaveRequestDocument();
        d.setId(doc.getObjectId("_id").toHexString());
        d.setEmployeeId(doc.getInteger("employeeId"));
        d.setStartDate(doc.getDate("startDate"));
        d.setEndDate(doc.getDate("endDate"));
        d.setStatus(doc.getString("status"));
        d.setReason(doc.getString("reason"));
        return d;
    }

    // Domain → MongoDB Document
    public static Document toDbDocument(LeaveRequest r) {
        return new Document()
                .append("employeeId", r.getEmployeeId())
                .append("startDate", r.getStartDate())
                .append("endDate", r.getEndDate())
                .append("status", r.getStatus())
                .append("reason", r.getReason());
    }
}
