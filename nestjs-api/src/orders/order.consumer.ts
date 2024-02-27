import { Injectable } from "@nestjs/common";
import { OrderStatus } from "./entities/order.entity";
import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";

@Injectable()
export class OrderConsumer {
  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'PaymentDone',
    queue: 'micro-orders',
  })
  consume( msg: { order_id: string, status: OrderStatus } ) {

  }
}