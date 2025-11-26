package hospital.mapper;

import hospital.staffClasses.*;
import org.bson.Document;

public class EmployeeMapper {

    public static Employee fromDoc(Document doc) {
        try {
            int id = doc.getInteger("id");
            String name = doc.getString("name");
            String dept = doc.getString("department");
            String role = doc.getString("role");

            Employee e;
            switch (role) {
                case "Nurse": e = new Nurse(id, name, dept, role); break;
                case "Maintenance Staff": e = new MaintenanceStaff(id, name, dept, role); break;
                default: e = new Doctor(id, name, dept, role);
            }

            e.setDatabaseId(doc.getObjectId("_id").toString());
            return e;

        } catch (Exception ex) {
            return null;
        }
    }

    public static Document toDoc(Employee e) {
        return new Document()
                .append("id", e.getId())
                .append("name", e.getName())
                .append("department", e.getDepartment())
                .append("role", e.getRole());
    }
}
