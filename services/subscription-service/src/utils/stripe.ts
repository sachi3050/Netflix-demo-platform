import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-08-14" });

export const createCheckoutSession = async (userEmail: string, plan: string) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      { price: process.env[`STRIPE_PRICE_${plan}`], quantity: 1 }
    ],
    mode: "subscription",
    customer_email: userEmail,
    success_url: process.env.SUCCESS_URL!,
    cancel_url: process.env.CANCEL_URL!,
  });
  return session;
};
