import { OrderStore } from "../../models/order";
import { DashBoardQueries } from "../../services/dashboard";

const dashboard = new DashBoardQueries()
const store = new OrderStore()

describe ('Dashboard Methods Quaries', () => {

    it('Should order products by category', async () => {
        const result = await dashboard.productsByCategory("ASUS")
        console.log(result)
        expect(result.length).toEqual(4)
    })

    it("should return top 5 products list", async () => {
        const result = await dashboard.productsTopFivePopular("5")
        console.log(result)
        expect(result.length).toEqual(5)
    })

    it("should return active orders", async () => {
        const result = await dashboard.currentOrderByUser("1")
        console.log(result)
        expect(result).toBeTruthy
    })

    it("should return complete orders", async () => {
    const list = await store.index()
    console.log(list)
    const result = await dashboard.completeOrderByUser("3")
    console.log(result)
    expect(result).toBeTruthy
    })
})