import { Button } from '@/components/shadcn_ui/button';
import React from 'react';

type Props = {
  error: unknown;
};

const ErrorPage: React.FC<Props> = ({ error }) => {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'Something went wrong';
  return (
    <div className="flex justify-center items-center gap-5 mt-20">
      <h1>Error occurred: {message}</h1>
      <Button
        size={'lg'}
        variant={'outline'}
        onClick={() => window.location.reload()}
      >
        Reload Page
      </Button>
    </div>
  );
};

export default ErrorPage;
