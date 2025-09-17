import { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "../models/subscription";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-08-14" });

export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"]!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    await prisma.subscription.update({
      where: { stripeSessionId: session.id },
      data: { status: "active", startDate: new Date(), endDate: new Date(Date.now() + 30 * 24 * 3600 * 1000) },
    });
    console.log("Subscription activated for user:", session.customer_email);
  }

  res.json({ received: true });
};
