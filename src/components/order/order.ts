import { User } from "../../models/User";
import { Warehouse } from "../warehouse/Warehouse";

export class Order {
  constructor(
    public id: number,
    public totalPrice: number,
    public orderDate: string,
    public wareHouse: Warehouse,
    public user: User
  ) {}
}
