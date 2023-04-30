import { useState } from 'react';
import { FaCrown } from 'react-icons/fa';
import { IoRefresh, IoClose } from 'react-icons/io5';
import { trpc } from 'src/utils/trpc';
import {
  Box,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Button,
  ProfileIcon,
} from '@styles';

const orderBy = ['winrate', 'wins', 'streak'] as const;
type OrderBy = (typeof orderBy)[number];

export const Ranking = () => {
  const [activeRankingOrder, setActiveRankingOrder] = useState<OrderBy>('winrate');
  const [open, setOpen] = useState<boolean>(false);
  const { data, refetch } = trpc.ranking.useQuery(undefined, {
    enabled: !!open,
  });

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Flex
          as={'button'}
          css={{
            p: '$3',
            transition: 'all 200ms ease-in',
            br: '$7',
            '&:hover': { bc: '$bg-2' },
          }}
        >
          <Text weight={600}>Ranking</Text>
        </Flex>
      </ModalTrigger>
      <ModalContent css={{ p: 0 }}>
        <Flex align={'center'} css={{ m: '$2 $3', ta: 'center' }} justify={'between'}>
          <Flex as={'button'} onClick={() => refetch()}>
            <IoRefresh size={24} />
          </Flex>
          <Heading size="2">Ranking</Heading>
          <Flex as={'button'} onClick={() => setOpen(false)}>
            <IoClose size={24} />
          </Flex>
        </Flex>
        <Tabs
          defaultValue={'wins'}
          onValueChange={(v) => setActiveRankingOrder(v as OrderBy)}
        >
          <TabsList asChild>
            <Flex align={'center'} justify={'center'} gap={'3'} css={{ pb: '$3' }}>
              {orderBy.map((order, index) => (
                <TabsTrigger value={order} asChild key={index}>
                  <Button
                    active={activeRankingOrder === order}
                    css={{ width: 84, lh: '2rem', fontSize: '$2' }}
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
                    <Flex
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
                          {index < 3 && (
                            <Box
                              as={FaCrown}
                              css={{
                                position: 'absolute',
                                top: -10,
                                left: 15,
                                size: 20,
                                color:
                                  index === 0
                                    ? '$gold'
                                    : index === 1
                                    ? '$silver'
                                    : '$bronze',
                              }}
                            />
                          )}
                        </Box>
                        <Box className="text-left">
                          <Text weight={500} size={'4'}>
                            {user.name}
                          </Text>
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
                    </Flex>
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
