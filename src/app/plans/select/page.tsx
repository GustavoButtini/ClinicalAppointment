'use client';
import { loadStripe } from '@stripe/stripe-js';
import { useAction } from 'next-safe-action/hooks';
import React from 'react';

import { StripeCheckout } from '@/actions/stripeCheckout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageHeaderNavigation,
  PageHeaderSubTitle,
  PageHeaderTextualContent,
  PageHeaderTextualDescription,
  PageHeaderTitle,
} from '@/components/ui/defaultpage';

const plans = [
  {
    name: 'Stater Plan',
    price: 50,
    currency: 'USD',
    features: ['2 Clinics', '10 Doctors', '50 Patients', '200 Appointments'],
    type: 'starter',
  },
];

const PlansSelectPage = () => {
  const stripeCheckout = useAction(StripeCheckout, {
    onSuccess: async ({ data }) => {
      console.log(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!);
      if (!process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!) {
        throw new Error('Stripe publishable key not found');
      }
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!);
      if (!stripe) {
        throw new Error('Stripe not found');
      }
      if (!data?.sessionId) {
        throw new Error('Session ID not found');
      }
      await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
    },
    onError: (error) => {
      alert(error || 'An error occurred while processing your payment.');
    },
  });

  const handleCheckout = (plan: string) => {
    stripeCheckout.execute({ plan: plan });
  };

  return (
    <PageContainer>
      <div className="flex h-full flex-col gap-y-10 p-8">
        <PageHeader>
          <PageHeaderTextualContent>
            <PageHeaderNavigation>Plans</PageHeaderNavigation>
            <PageHeaderTextualDescription>
              <PageHeaderTitle>Select Your Plan</PageHeaderTitle>
              <PageHeaderSubTitle>
                Choose the best plan for your clinic and unlock all features.
              </PageHeaderSubTitle>
            </PageHeaderTextualDescription>
          </PageHeaderTextualContent>
        </PageHeader>
        <PageContent>
          <div className="flex min-h-[60vh] flex-col items-start justify-start">
            <div className="grid h-full w-full max-w-4xl grid-cols-1 grid-rows-1 gap-8 md:grid-cols-3">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className="mx-auto flex h-3/4 w-full max-w-sm flex-col justify-center gap-y-4 p-5"
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                      {plan.name}
                    </CardTitle>
                    <CardDescription>
                      <span className="text-primary text-3xl font-semibold">
                        ${plan.price}
                      </span>
                      <span className="ml-1 text-base text-gray-500">
                        /month
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="mb-6 space-y-2">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <span className="bg-primary inline-block h-2 w-2 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      onClick={() => {
                        handleCheckout(plan.type);
                      }}
                      disabled={stripeCheckout.status === 'executing'}
                    >
                      {stripeCheckout.status === 'executing'
                        ? 'Processing...'
                        : 'Subscribe'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </PageContent>
      </div>
    </PageContainer>
  );
};

export default PlansSelectPage;
