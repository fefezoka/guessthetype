import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';
import { Ranking, ProfileIcon } from '@components';
import { Box, Flex, Menu, MenuContent, MenuItem, MenuTrigger, Text } from '@styles';

export const Header = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <Flex as={'header'} justify={'center'} css={{ mt: '$4' }}>
      <Box as={'nav'}>
        <Flex as={'ul'} gap={'8'} align={'center'}>
          <Box as={'li'}>
            <Ranking />
          </Box>
          <Box as={'li'}>
            {session ? (
              <Menu open={menuOpen} onOpenChange={(o) => setMenuOpen(o)}>
                <MenuTrigger asChild>
                  <Flex align={'center'} gap={'2'} as={'button'}>
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
              <Box>
                <Text weight={600}>Login with </Text>
                <Box as={'button'} onClick={() => signIn('discord')}>
                  <Text weight={600}>Discord</Text>
                </Box>
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
