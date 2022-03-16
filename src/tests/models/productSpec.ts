import { ProductStore } from "../../models/product";
import supertest from "supertest";
import app from "../../server";

const request = supertest(app)
const store = new ProductStore

