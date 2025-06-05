import { SquareArrowUpRightIcon } from 'lucide-react';
import { useState } from 'react';

import { Dialog, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { appoitments } from '@/db/schema';

import UpsertAppointmentForm from './upsertAppoitmentsForm';

interface AppoitmentModifyMenuProps {
  appoitment: typeof appoitments.$inferSelect;
}
const AppoitmentModifyMenu = ({ appoitment }: AppoitmentModifyMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogHeader>
        <DialogTrigger
          asChild
          className="flex w-full flex-col content-center justify-center text-center"
        >
          <SquareArrowUpRightIcon />
        </DialogTrigger>
      </DialogHeader>
      <UpsertAppointmentForm
        isUpdate={true}
        isOpen={isOpen}
        appoitment={appoitment}
        onSucess={() => {
          setIsOpen(true);
        }}
        clinicId={appoitment.clinicId}
      />
    </Dialog>
  );
};

export default AppoitmentModifyMenu;
