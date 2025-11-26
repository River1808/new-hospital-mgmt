package hospital.controller;

import hospital.schedule.Shift;
import hospital.service.ShiftService;
import io.javalin.http.Context;

public class ShiftController {

    private final ShiftService service;

    public ShiftController(ShiftService service) {
        this.service = service;
    }

    public void getAll(Context ctx) {
        ctx.json(service.getAll());
    }

    public void create(Context ctx) {
        Shift s = ctx.bodyAsClass(Shift.class);
        ctx.status(201).json(service.create(s));
    }

    public void delete(Context ctx) {
        service.delete(ctx.pathParam("id"));
        ctx.result("Deleted");
    }
}
