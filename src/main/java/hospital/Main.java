package hospital;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import hospital.staffClasses.*;
import hospital.schedule.Shift;
import hospital.schedule.LeaveRequest;
import io.javalin.Javalin;
import org.bson.Document;
import org.bson.types.ObjectId;
import io.github.cdimascio.dotenv.Dotenv;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        System.out.println(">>> [BOOT] Server Starting...");
        //database Connection
        String connectionString = "mongodb://localhost:27017";
        try {
            Dotenv env = Dotenv.configure().ignoreIfMissing().load();
            String dbHost = env.get("DB_HOST");
            if (dbHost != null && !dbHost.isEmpty()) {
                connectionString = dbHost.startsWith("mongodb")
                        ? dbHost
                        : "mongodb://" + dbHost + ":27017";
            }
        } catch (Exception ignored) {}

        System.out.println(">>> [BOOT] Connecting to " + connectionString);

        MongoClient client;
        MongoDatabase db;

        try {
            client = MongoClients.create(connectionString);
            db = client.getDatabase("hospital");

            // force connection
            db.listCollectionNames().first();

            System.out.println(">>> [BOOT] Connected to MongoDB!");
        } catch (Exception e) {
            System.err.println(">>> [FATAL] Could not connect to DB.");
            e.printStackTrace();
            return;
        }

        MongoCollection<Document> employeeCol = db.getCollection("employee");
        MongoCollection<Document> shiftCol = db.getCollection("shift");
        MongoCollection<Document> leaveCol = db.getCollection("leaveRequest");

        //server
        Javalin app = Javalin.create(config -> {
            config.bundledPlugins.enableCors(cors -> {
                cors.addRule(rule -> {
                    rule.allowHost("http://localhost:5173");
                    rule.allowHost("http://localhost:5174");
                });
            });
        }).start(8080);

        System.out.println(">>> [BOOT] Server running at http://localhost:8080");

        //employee route

        app.get("/api/employees", ctx -> {
            List<Employee> list = new ArrayList<>();

            for (Document doc : employeeCol.find()) {
                Employee emp = safeMapEmployee(doc);
                if (emp != null) list.add(emp);
            }

            // sort in memory
            list.sort((a, b) -> Integer.compare(a.getId(), b.getId()));

            ctx.json(list);
        });

        app.post("/api/employees", ctx -> {
            try {
                Employee newEmp = ctx.bodyAsClass(Employee.class);
                newEmp.setId(getNextEmployeeId(employeeCol));

                Document doc = mapEmployeeToDocument(newEmp);
                employeeCol.insertOne(doc);

                ctx.status(201).json(newEmp);
            } catch (Exception e) {
                ctx.status(500).result("Failed to create employee");
                e.printStackTrace();
            }
        });

        app.delete("/api/employees/{id}", ctx -> {
            try {
                int id = Integer.parseInt(ctx.pathParam("id"));
                employeeCol.deleteOne(Filters.eq("id", id));
                ctx.status(200).result("Deleted");
            } catch (Exception e) {
                ctx.status(400).result("Invalid ID");
            }
        });
        //shift route

        app.get("/api/shifts", ctx -> {
            List<Shift> list = new ArrayList<>();
            for (Document doc : shiftCol.find()) {
                Shift s = safeMapShift(doc);
                if (s != null) list.add(s);
            }
            ctx.json(list);
        });

        app.post("/api/shifts", ctx -> {
            try {
                Shift shift = ctx.bodyAsClass(Shift.class);

                Document doc = mapShiftToDocument(shift);
                shiftCol.insertOne(doc);

                shift.setId(doc.getObjectId("_id").toString());
                ctx.status(201).json(shift);
            } catch (Exception e) {
                ctx.status(500).result("Failed to create shift");
            }
        });

        app.delete("/api/shifts/{id}", ctx -> {
            try {
                shiftCol.deleteOne(Filters.eq("_id", new ObjectId(ctx.pathParam("id"))));
                ctx.status(200).result("Deleted");
            } catch (Exception e) {
                ctx.status(400).result("Invalid ObjectId");
            }
        });

        //leave request routes

        app.get("/api/leaverequests", ctx -> {
            List<LeaveRequest> list = new ArrayList<>();
            for (Document doc : leaveCol.find()) {
                LeaveRequest r = safeMapLeave(doc);
                if (r != null) list.add(r);
            }
            ctx.json(list);
        });

        app.post("/api/leaverequests", ctx -> {
            try {
                LeaveRequest req = ctx.bodyAsClass(LeaveRequest.class);

                if (req.getStatus() == null)
                    req.setStatus("Pending");

                Document doc = mapLeaveToDocument(req);
                leaveCol.insertOne(doc);

                req.setId(doc.getObjectId("_id").toString());
                ctx.status(201).json(req);
            } catch (Exception e) {
                ctx.status(500).result("Failed to create leave request");
            }
        });

        app.put("/api/leaverequests/{id}/{action}", ctx -> {
            try {
                String id = ctx.pathParam("id");
                String action = ctx.pathParam("action");

                String status = action.equalsIgnoreCase("approve")
                        ? "Approved"
                        : "Rejected";

                leaveCol.updateOne(
                        Filters.eq("_id", new ObjectId(id)),
                        new Document("$set", new Document("status", status))
                );

                ctx.result("Updated");
            } catch (Exception e) {
                ctx.status(400).result("Invalid request");
            }
        });
    }
    //id generation

    private static int getNextEmployeeId(MongoCollection<Document> col) {
        int max = 0;

        for (Document doc : col.find()) {
            Object raw = doc.get("id");
            if (raw instanceof Integer) {
                int v = (int) raw;
                if (v > max) max = v;
            }
        }
        return max + 1;
    }

    //employee mapper

    private static Employee safeMapEmployee(Document doc) {
        try {
            Object rawId = doc.get("id");

            // skip documents with bad type
            if (!(rawId instanceof Integer)) {
                System.err.println("Skipping employee: invalid 'id' type: " + rawId);
                return null;
            }

            int id = (Integer) rawId;
            String name = doc.getString("name");
            String dept = doc.getString("department");
            String role = doc.getString("role");

            if (role == null) role = "Doctor";

            Employee emp;
            switch (role) {
                case "Nurse": emp = new Nurse(id, name, dept, role); break;
                case "Maintenance Staff": emp = new MaintenanceStaff(id, name, dept, role); break;
                default: emp = new Doctor(id, name, dept, role); break;
            }

            // attach Mongo ID
            if (doc.get("_id") != null)
                emp.setDatabaseId(doc.get("_id").toString());

            return emp;

        } catch (Exception e) {
            System.err.println("Error mapping employee: " + e.getMessage());
            return null;
        }
    }

    private static Document mapEmployeeToDocument(Employee emp) {
        return new Document()
                .append("id", emp.getId())
                .append("name", emp.getName())
                .append("department", emp.getDepartment())
                .append("role", emp.getRole());
    }

    // =====================================================
    // SHIFT MAPPERS
    // =====================================================

    private static Shift safeMapShift(Document doc) {
        try {
            return new Shift(
                    doc.getObjectId("_id").toString(),
                    doc.getInteger("employeeId", 0),
                    doc.getDate("date"),
                    doc.getString("startTime"),
                    doc.getString("endTime"),
                    doc.getString("role")
            );
        } catch (Exception e) {
            return null;
        }
    }

    private static Document mapShiftToDocument(Shift s) {
        return new Document()
                .append("employeeId", s.getEmployeeId())
                .append("date", s.getDate())
                .append("startTime", s.getStartTime())
                .append("endTime", s.getEndTime())
                .append("role", s.getRole());
    }

    // =====================================================
    // LEAVE REQUEST MAPPERS
    // =====================================================

    private static LeaveRequest safeMapLeave(Document doc) {
        try {
            return new LeaveRequest(
                    doc.getObjectId("_id").toString(),
                    doc.getInteger("employeeId", 0),
                    doc.getDate("startDate"),
                    doc.getDate("endDate"),
                    doc.getString("status"),
                    doc.getString("reason")
            );
        } catch (Exception e) {
            return null;
        }
    }

    private static Document mapLeaveToDocument(LeaveRequest r) {
        return new Document()
                .append("employeeId", r.getEmployeeId())
                .append("startDate", r.getStartDate())
                .append("endDate", r.getEndDate())
                .append("status", r.getStatus())
                .append("reason", r.getReason());
    }
}
