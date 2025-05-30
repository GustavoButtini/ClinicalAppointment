export const DoctorsPageContentGridFourByTwo = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="grid h-full w-full grid-cols-4 gap-6 p-10">{children}</div>
  );
};
