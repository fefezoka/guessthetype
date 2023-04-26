import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';
import { FaDiscord } from 'react-icons/fa';
import { Ranking, ProfileIcon } from '@components';
import { Box, Flex, Menu, MenuContent, MenuItem, MenuTrigger, Text } from '@styles';

export const Header = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <Flex as={'header'} justify={'center'} css={{ mt: '$2' }}>
      <Box as={'nav'}>
        <Flex as={'ul'} gap={'5'} align={'center'}>
          <Box as={'li'}>
            <Ranking />
          </Box>
          <Box as={'li'}>
            {session ? (
              <Menu open={menuOpen} onOpenChange={(o) => setMenuOpen(o)}>
                <MenuTrigger asChild>
                  <Flex
                    align={'center'}
                    gap={'2'}
                    as={'button'}
                    css={{
                      p: '$1',
                      transition: 'all 200ms ease-in',
                      br: '$7',
                      '&:hover': { bc: '$bg-2' },
                    }}
                  >
                    <ProfileIcon src={session.user.image} alt="" />
                    <Text weight={600}>{session.user.name}</Text>
                    {menuOpen ? <IoCaretUp /> : <IoCaretDown />}
                  </Flex>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem theme={'alert'} onSelect={() => signOut()}>
                    Sign out
                  </MenuItem>
                </MenuContent>
              </Menu>
            ) : (
              <Flex
                as={'button'}
                onClick={() => signIn('discord')}
                css={{
                  p: '$2 $3',
                  transition: 'all 200ms ease-in',
                  br: '$7',
                  '&:hover': { bc: '$bg-2' },
                }}
                align={'center'}
                gap={'2'}
              >
                <Flex
                  css={{ size: 24, bc: '$discord', br: '$round', overflow: 'hidden' }}
                  align={'center'}
                  justify={'center'}
                >
                  <FaDiscord size={16} />
                </Flex>
                <Text weight={600}>Login with Discord</Text>
              </Flex>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
