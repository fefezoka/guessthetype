import React from 'react';
import { styled, CSS } from '../../stitches.config';
import * as TabsPrimitive from '@radix-ui/react-tabs';

export const Tabs = TabsPrimitive.Root;
export const TabsTrigger = TabsPrimitive.Trigger;
export const TabsList = TabsPrimitive.List;

export const StyledTabsContent = styled(TabsPrimitive.Content, {
  width: '100%',
  height: '520px',
  overflowY: 'scroll',
  outline: 0,

  '&::-webkit-scrollbar-thumb': {
    br: '$4',
  },
  '&::-webkit-scrollbar': {
    width: '$2',
  },
});

type TabsContentPrimitiveProps = React.ComponentProps<typeof TabsPrimitive.Content>;
type TabsContentProps = TabsContentPrimitiveProps & { css?: CSS };

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof StyledTabsContent>,
  TabsContentProps
>(({ children, ...props }, forwardedRef) => (
  <StyledTabsContent {...props} ref={forwardedRef}>
    {children}
  </StyledTabsContent>
));

TabsContent.displayName = 'Tabs';
