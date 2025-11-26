package hospital.mapper;

import hospital.schedule.Shift;
import org.bson.Document;
import org.bson.types.ObjectId;

public class ShiftMapper {

    public static Shift fromDoc(Document doc) {
        return new Shift(
                doc.getObjectId("_id").toString(),
                doc.getInteger("employeeId"),
                doc.getDate("date"),
                doc.getString("startTime"),
                doc.getString("endTime"),
                doc.getString("role")
        );
    }

    public static Document toDoc(Shift s) {
        return new Document()
                .append("employeeId", s.getEmployeeId())
                .append("date", s.getDate())
                .append("startTime", s.getStartTime())
                .append("endTime", s.getEndTime())
                .append("role", s.getRole());
    }
}
