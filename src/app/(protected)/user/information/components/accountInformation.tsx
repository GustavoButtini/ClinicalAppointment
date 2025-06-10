import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AccountInformationProps {
  account: {
    name: string;
    email: string;
    phone: string | undefined;
    image: string | undefined;
  };
}

const AccountInformation: React.FC<AccountInformationProps> = ({ account }) => {
  return (
    <div className="max-w-full rounded-lg bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-semibold">Account Information</h2>
      <div className="grid grid-cols-1 gap-4">
        {/* Informações da tabela users */}
        {Object.entries(account).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 capitalize">
              {key}
            </label>
            <Input
              value={String(value ?? '')}
              readOnly
              className="bg-gray-100"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Link href="/user/update">
          <Button variant="default">Edit Account</Button>
        </Link>
      </div>
    </div>
  );
};

export default AccountInformation;
