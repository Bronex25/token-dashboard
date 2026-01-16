import React from 'react';
import type { TokenById } from '@/types/TokenById';
import { Card } from '@/components/Card';

type CoinDescriptionProps = {
  token: TokenById;
};

export const CoinDescription: React.FC<CoinDescriptionProps> = ({ token }) => {
  if (!token.description?.en) {
    return null;
  }

  return (
    <Card
      title="About"
      contentClassName="px-6"
      titleClassName="text-2xl font-semibold"
    >
      <div
        className="prose prose-sm md:prose-base dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: token.description.en }}
      />
    </Card>
  );
};
