"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../../services/dashboard");
const dashboard = new dashboard_1.DashBoardQueries();
describe('Dashboard Methods Quaries', () => {
    it('Should order products by category', async () => {
        const result = await dashboard.productsByCategory("ASUS");
        console.log(result);
        expect(result).toBeTruthy();
    });
});
