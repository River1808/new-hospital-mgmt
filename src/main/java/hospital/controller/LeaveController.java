package hospital.controller;

import hospital.service.LeaveService;
import hospital.schedule.LeaveRequest;
import io.javalin.http.Context;

public class LeaveController {

    private final LeaveService service;

    public LeaveController(LeaveService service) {
        this.service = service;
    }

    public void getAll(Context ctx) {
        ctx.json(service.getAll());
    }

    public void create(Context ctx) {
        LeaveRequest req = ctx.bodyAsClass(LeaveRequest.class);
        ctx.status(201).json(service.create(req));
    }

    public void approve(Context ctx) {
        service.approve(ctx.pathParam("id"));
        ctx.result("Approved");
    }

    public void reject(Context ctx) {
        service.reject(ctx.pathParam("id"));
        ctx.result("Rejected");
    }
}
