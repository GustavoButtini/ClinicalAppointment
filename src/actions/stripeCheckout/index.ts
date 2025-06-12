'use server';

import { headers } from 'next/headers';
import Stripe from 'stripe';
import { z } from 'zod';

import { auth } from '@/lib/auth';
import { actionClient } from '@/lib/safe-action';

export const StripeCheckout = actionClient
  .schema(
    z.object({
      plan: z.string().trim().min(1, { message: 'Needs to have an plan id' }),
    }),
  )
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new Error('Unauthorized');
    }
    if (!process.env.NEXT_PUBLIC_STRIPE_PRV_KEY!) {
      throw new Error('Stripe secret key not found');
    }
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PRV_KEY!, {
      apiVersion: '2025-05-28.basil',
    });
    const { id: sessionId } = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      success_url: `http://localhost:3000/dashboard`,
      cancel_url: `http://localhost:3000/plan/select`,
      metadata: {
        userId: session.user.id,
        planType: parsedInput.plan,
      },
      subscription_data: {
        metadata: {
          userId: session.user.id,
          planType: parsedInput.plan,
        },
      },
      line_items: [
        {
          price: process.env.STRIPE_STARTER_PLAN_KEY,
          quantity: 1,
        },
      ],
    });
    return {
      sessionId,
    };
  });

export default StripeCheckout;
