import * as React from 'react';
import {
  Root as TooltipRoot,
  Trigger as TooltipTriggerPrimitive,
  Content as TooltipContentPrimitive,
  Portal,
  Provider as TooltipProviderPrimitive,
} from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

type TooltipWrapperProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  delayDuration?: number;
  className?: string;
};

export function TooltipWrapper({
  content,
  children,
  side = 'top',
  sideOffset = 4,
  delayDuration = 0,
  className,
}: TooltipWrapperProps) {
  return (
    <TooltipProviderPrimitive delayDuration={delayDuration}>
      <TooltipRoot>
        <TooltipTriggerPrimitive asChild>{children}</TooltipTriggerPrimitive>
        <Portal>
          <TooltipContentPrimitive
            side={side}
            sideOffset={sideOffset}
            className={cn(
              'bg-primary text-primary-foreground z-50 w-fit rounded-md px-3 py-1.5 text-xs shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
              className,
            )}
          >
            {content}
          </TooltipContentPrimitive>
        </Portal>
      </TooltipRoot>
    </TooltipProviderPrimitive>
  );
}
