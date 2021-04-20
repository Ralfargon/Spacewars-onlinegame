import { Flex, useBreakpointValue, Icon, IconButton } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri';
import { useSidebarDrawer } from '../Sidebar/contexts/SidebarDrawerContext';
import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile'
import { Box, Button, HStack, Heading, Divider, VStack, SimpleGrid, Text } from "@chakra-ui/react";
import Link from "next/link";
import { GameInfo } from './gameinfo';

export function Header() {

    const { onOpen } = useSidebarDrawer()

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    return (
        <Flex as="header" w="100%" maxWidth={1480} h="20" mx="auto" mt="4" px="6" align="center">
            { !isWideVersion && (<IconButton aria-label="Open navigation" icon={<Icon as={RiMenuLine} />} fontSize="24" variant="unstyled" onClick={onOpen} mr="2"> </IconButton>)}
            <Logo />

            <Flex align="center" ml="auto" >

                <GameInfo showGameInfo={isWideVersion} />

                <NotificationsNav showNotificationsNav={isWideVersion}/>
                <Profile showProfileData={isWideVersion} />
            </Flex>

            <Link href="/" passHref >
                <Button size="xs" as="a" colorScheme="gray.450" bg="gray.700" ml="3" onClick={() => { localStorage.removeItem('@wspacewars/token') }} >
                    Logout
                        </Button>
            </Link>
        </Flex>
    );
}
