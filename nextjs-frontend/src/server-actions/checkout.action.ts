'use server'

import { Order } from "@/models";
import { CartServiceFactory } from "@/services/cart.service";
import { OrderServiceFactory } from "@/services/order.service";
import { redirect } from "next/navigation";

export async function checkoutAction(formData: FormData) {

  const cartService = CartServiceFactory.create();

  const orderService = OrderServiceFactory.create();

  const cart = cartService.getCart();

  let order: Order;

  try {
    order = await orderService.createOrder({
      card_hash: formData.get('card_hash') as string,
      items: cart.items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity
      }))
    })

    cartService.clearCart();
  } catch(e) {
    console.log(e);
    return {
      error: { message: 'Pagamento não foi aprovado.' }
    }
  }

  redirect(`/checkout/${order.id}/success`)
}