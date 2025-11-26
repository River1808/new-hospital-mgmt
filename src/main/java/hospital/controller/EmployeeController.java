package hospital.controller;

import hospital.staffClasses.Employee;
import hospital.service.EmployeeService;
import io.javalin.http.Context;

public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    public void getAll(Context ctx) {
        ctx.json(service.getAll());
    }

    public void create(Context ctx) {
        Employee e = ctx.bodyAsClass(Employee.class);
        ctx.status(201).json(service.create(e));
    }

    public void delete(Context ctx) {
        int id = Integer.parseInt(ctx.pathParam("id"));
        service.delete(id);
        ctx.result("Deleted");
    }
}
