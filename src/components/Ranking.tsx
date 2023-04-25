import { trpc } from 'src/utils/trpc';
import {
  Box,
  Flex,
  Grid,
  Modal,
  ModalContent,
  ModalTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@styles';
import { Button, ProfileIcon } from '@components';
import { useState } from 'react';
import { FaCrown } from 'react-icons/fa';

interface Ranking {
  wins: User[];
  winrate: User[];
  streak: User[];
}

const orderBy = ['wins', 'winrate', 'streak'] as const;
type OrderBy = (typeof orderBy)[number];

export const Ranking = () => {
  const [activeRankingOrder, setActiveRankingOrder] = useState<OrderBy>('wins');
  const [open, setOpen] = useState<boolean>(false);
  const { data, refetch } = trpc.ranking.useQuery(undefined, {
    enabled: !!open,
  });

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Flex as={'button'}>
          <Text weight={600}>Ranking</Text>
        </Flex>
      </ModalTrigger>
      <ModalContent css={{ p: 0 }}>
        <Tabs
          defaultValue={'wins'}
          onValueChange={(v) => setActiveRankingOrder(v as OrderBy)}
        >
          <TabsList asChild>
            <Flex
              align={'center'}
              justify={'center'}
              gap={'3'}
              css={{ borderBottom: '2px solid $bg-2', py: '$3' }}
            >
              {orderBy.map((order, index) => (
                <TabsTrigger value={order} asChild key={index}>
                  <Button
                    active={activeRankingOrder === order}
                    css={{ width: 92, lh: '2rem' }}
                  >
                    {order.charAt(0).toUpperCase() + order.slice(1)}
                  </Button>
                </TabsTrigger>
              ))}
            </Flex>
          </TabsList>

          {orderBy.map((order, index) => (
            <TabsContent value={order} key={index}>
              {data && (
                <Box as={'ul'}>
                  {data[order].map((user, index) => (
                    <Grid
                      columns={'2'}
                      as={'li'}
                      css={{ p: '$2 $3', ...(index % 2 === 0 && { bc: '$bg-2' }) }}
                      justify={'between'}
                      align={'center'}
                      key={user.id}
                    >
                      <Flex align={'center'} gap={'2'}>
                        <Text as={'p'}>{index + 1}º</Text>
                        <Box css={{ position: 'relative' }}>
                          <ProfileIcon src={user.image} alt="" css={{ size: 52 }} />
                          {index === 0 && (
                            <Box
                              as={FaCrown}
                              css={{
                                position: 'absolute',
                                top: -10,
                                left: 15,
                                size: 20,
                                color: 'Yellow',
                              }}
                            />
                          )}
                        </Box>
                        <Box className="text-left">
                          <Text weight={500}>{user.name}</Text>
                        </Box>
                      </Flex>
                      <Box css={{ ta: 'right', fontSize: '$3' }}>
                        <Box>
                          <Text size={'3'} weight={600}>
                            {user.wins}{' '}
                          </Text>
                          wins in{' '}
                          <Text size={'3'} weight={600}>
                            {user.rounds}{' '}
                          </Text>
                          rounds
                        </Box>
                        <Box>
                          Winrate:{' '}
                          <Text size={'3'} weight={600}>
                            {user.winrate.toFixed(1)}%
                          </Text>
                        </Box>
                        <Box>
                          Max streak:{' '}
                          <Text size={'3'} weight={600}>
                            {user.maxStreak}
                          </Text>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Box>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </ModalContent>
    </Modal>
  );
};
