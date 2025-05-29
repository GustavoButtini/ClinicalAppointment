import React from 'react';

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y6 h-1/6 w-full p-6">{children}</div>;
};

export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-row content-between justify-between">
      {children}
    </div>
  );
};
export const PageHeaderTextualContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-full flex-col content-between justify-between">
      {children}
    </div>
  );
};
export const PageHeaderTextualDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col content-between justify-between">
      {children}
    </div>
  );
};
export const PageHeaderButtons = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-full flex-row-reverse flex-wrap content-end justify-start">
      {children}
    </div>
  );
};
