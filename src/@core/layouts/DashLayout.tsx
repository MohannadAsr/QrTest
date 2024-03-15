import React, { ReactNode } from 'react';
import MainLayout from './MainLayout';

function DashLayout({
  children,
  type = 'standard',
}: {
  children: ReactNode;
  type?: 'blank' | 'standard';
}) {
  if (type == 'blank') return <>{children}</>;

  return (
    <>
      <MainLayout>{children}</MainLayout>
    </>
  );
}

export default DashLayout;
