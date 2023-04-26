import Image from 'next/image';
import React, { forwardRef, useState } from 'react';
import { CSS } from '../../stitches.config';
import { Box } from '@styles';

interface IProfileIcon extends React.ComponentProps<typeof Image> {
  src: string;
  css?: CSS;
}

export const ProfileIcon = forwardRef<HTMLImageElement, IProfileIcon>(
  ({ src, css, ...props }: IProfileIcon, forwardedRef) => {
    const [error, setError] = useState(false);

    return (
      <Box
        css={{
          size: '$7',
          br: '$round',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          ...css,
        }}
      >
        <Image
          ref={forwardedRef}
          src={!error ? src : 'https://cdn.discordapp.com/embed/avatars/0.png'}
          {...props}
          fill
          alt=""
          onError={() => setError(true)}
        />
      </Box>
    );
  }
);

ProfileIcon.displayName = 'ProfileIcon';
