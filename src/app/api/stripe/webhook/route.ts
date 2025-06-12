import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import { db } from '@/db';
import * as schema from '@/db/schema';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PRV_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      req.headers.get('stripe-signature')!,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!,
    );
  } catch (e) {
    return NextResponse.json(
      { error: 'Webhook signature verification failed.' + e },
      { status: 400 },
    );
  }

  if (
    event.type === 'customer.subscription.created' &&
    event.data.object.metadata !== null
  ) {
    const userId = event.data.object.metadata.userId;
    const planType = event.data.object.metadata.planType;
    console.log(event.data.object.metadata);
    if (userId && planType) {
      await db
        .update(schema.users)
        .set({ plan: planType })
        .where(eq(schema.users.id, userId));
    }
  }

  return NextResponse.json({ received: true });
}
