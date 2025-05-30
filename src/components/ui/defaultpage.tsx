import React from 'react';

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-full w-full space-y-4 p-6">{children}</div>;
};

export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-1/6 w-full flex-row content-between justify-between">
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
export const PageHeaderNavigation = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <span className="inline">{children}</span>;
};
export const PageHeaderTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <h1 className="text-3xl text-black">{children}</h1>;
};
export const PageHeaderSubTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <h6 className="text-sm text-gray-500">{children}</h6>;
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

export const PageContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-8/12 w-full flex-col content-center justify-center">
      {children}
    </div>
  );
};
