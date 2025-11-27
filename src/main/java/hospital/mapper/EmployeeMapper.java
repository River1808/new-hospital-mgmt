package hospital.mapper;

import hospital.database.documents.EmployeeDocument;
import hospital.staffClasses.*;

public class EmployeeMapper {

    // Convert DB document → Domain object
    public static Employee toDomain(EmployeeDocument doc) {
        Employee e;

        switch (doc.getRole()) {
            case "Nurse":
                e = new Nurse(doc.getId(), doc.getName(), doc.getDepartment(), doc.getRole());
                break;
            case "Maintenance Staff":
                e = new MaintenanceStaff(doc.getId(), doc.getName(), doc.getDepartment(),doc.getRole());
                break;
            default:
                e = new Doctor(doc.getId(), doc.getName(), doc.getDepartment(),doc.getRole());
        }

        return e;
    }

    // Convert Domain object → DB document
    public static EmployeeDocument toDocument(Employee e) {
        EmployeeDocument doc = new EmployeeDocument();
        doc.setId(e.getId());
        doc.setName(e.getName());
        doc.setDepartment(e.getDepartment());
        doc.setRole(e.getRole());
        return doc;
    }
}
