package hospital.mapper;

import hospital.schedule.Shift;
import hospital.database.documents.ShiftDocument;
import org.bson.Document;

public class ShiftMapper {

    // MongoDB Document → ShiftDocument
    public static ShiftDocument toDocumentModel(Document doc) {
        ShiftDocument d = new ShiftDocument();
        d.setId(doc.getObjectId("_id").toHexString());
        d.setEmployeeId(doc.getInteger("employeeId"));
        d.setDate(doc.getDate("date"));
        d.setStartTime(doc.getString("startTime"));
        d.setEndTime(doc.getString("endTime"));
        d.setRole(doc.getString("role"));
        return d;
    }

    // Domain → MongoDB Document
    public static Document toDbDocument(Shift s) {
        return new Document()
                .append("employeeId", s.getEmployeeId())
                .append("date", s.getDate())
                .append("startTime", s.getStartTime())
                .append("endTime", s.getEndTime())
                .append("role", s.getRole());
    }
}
