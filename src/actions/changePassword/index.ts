'use server';
import { and, eq, isNotNull } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import z from 'zod';

import { db } from '@/db';
import { accounts } from '@/db/schema';
import { auth } from '@/lib/auth';
import { actionClient } from '@/lib/safe-action';
const changePasswordSchema = z.object({
  oldPassword: z.string().min(8, 'The password has to be 6 characters long'),
  newPassword: z.string().min(8, 'The password has to be 6 characters long'),
  confirmPassword: z
    .string()
    .min(8, 'The password has to be 6 characters long'),
});
export const updatePasswordAction = actionClient
  .schema(changePasswordSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({ headers: await headers() });
    // Busca o usuário
    if (!session?.user) {
      throw new Error('Current password is incorrect or isn´t registered.');
    }
    // Verifica a senha antiga
    const lastPass = await db.query.accounts.findFirst({
      where: and(
        eq(accounts.userId, session.user.id),
        isNotNull(accounts.password),
      ),
    });
    if (lastPass === null || lastPass === undefined) {
      throw new Error('Canno´t fetch the older password');
    }
    const ctx = await auth.$context;
    const isValid = await ctx.password.verify({
      password: parsedInput.oldPassword,
      hash: lastPass.password ?? '',
    });
    if (!isValid) {
      throw new Error('Current password is incorrect or isn´t registered.');
    }

    // Atualiza a senha
    const hashed = await ctx.password.hash(parsedInput.newPassword);
    await ctx.internalAdapter.updatePassword(session.user.id, hashed);
    revalidatePath('/user/update');
    redirect('/logout');
  });
