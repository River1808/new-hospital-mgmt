package hospital;

import com.mongodb.client.MongoDatabase;
import hospital.config.Database;

import hospital.controller.EmployeeController;
import hospital.controller.ShiftController;
import hospital.controller.LeaveController;

import hospital.service.EmployeeService;
import hospital.service.ShiftService;
import hospital.service.LeaveService;

import hospital.repository.EmployeeRepo;
import hospital.repository.ShiftRepo;
import hospital.repository.LeaveRepo;

import io.javalin.Javalin;

public class Main {

    public static void main(String[] args) {

        MongoDatabase db = Database.get();

        EmployeeRepo empRepo = new EmployeeRepo(db.getCollection("employee"));
        ShiftRepo shiftRepo = new ShiftRepo(db.getCollection("shift"));
        LeaveRepo leaveRepo = new LeaveRepo(db.getCollection("leaveRequest"));

        EmployeeController empController =
                new EmployeeController(new EmployeeService(empRepo));

        ShiftController shiftController =
                new ShiftController(new ShiftService(shiftRepo));

        LeaveController leaveController =
                new LeaveController(new LeaveService(leaveRepo));

        Javalin app = Javalin.create(cfg -> {
            cfg.bundledPlugins.enableCors(cors -> cors.addRule(rule -> {
                rule.allowHost("http://localhost:5173");
                rule.allowHost("http://localhost:5174");
            }));
        }).start(8080);


        // Employee
        app.get("/api/employees", empController::getAll);
        app.post("/api/employees", empController::create);
        app.delete("/api/employees/{id}", empController::delete);

        // Shifts
        app.get("/api/shifts", shiftController::getAll);
        app.post("/api/shifts", shiftController::create);
        app.delete("/api/shifts/{id}", shiftController::delete);

        // Leave Requests
        app.get("/api/leaverequests", leaveController::getAll);
        app.post("/api/leaverequests", leaveController::create);
        app.put("/api/leaverequests/{id}/approve", leaveController::approve);
        app.put("/api/leaverequests/{id}/reject", leaveController::reject);

        System.out.println("Server running on http://localhost:8080");
    }
}
