import { Box, Flex, Text, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Checkbox, Tbody, useBreakpointValue } from "@chakra-ui/react";
import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"
import Head from 'next/head';

export default function Spaceships() {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    return (
        <Box>
            <Header />
            <Head>
                <title>Spacewars | Spaceships</title>
            </Head>
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal" >Spaceships</Heading>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}