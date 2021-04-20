import { Box, Input, Stack, Flex, VStack, Text, Button, Heading, SimpleGrid, Avatar, useBreakpointValue, HStack } from "@chakra-ui/react";
import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"
import Head from 'next/head';

export default function Research() {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    return (
        <Box >
            <Header />
            <Head>
                <title>Spacewars | Research</title>
            </Head>
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal" >Researches</Heading>
                    </Flex>


                    <Box borderColor="gray.700" borderWidth={1} borderRadius="md" flex="1">
                        <Stack mt="4" mb="4" align="left" direction={["column", "row"]}>
                            <VStack spacing="1">
                                <SimpleGrid pl="3" >
                                    <Avatar size="md" name="planet" src="/images/ship1.jpg" />
                                </SimpleGrid>
                            </VStack>
                            <VStack spacing="1">
                                <SimpleGrid pl="3" minChildWidth="240px" spacing={["6", "8"]} w="100%">
                                    <Text>BreedSpaceship</Text>
                        </SimpleGrid>
                                <SimpleGrid pl="3" minChildWidth="240px" spacing={["6", "8"]} w="100%">
                                    <Text>Cost: 100</Text>
                        </SimpleGrid>
                            </VStack>

                            <VStack spacing="1">
                                <SimpleGrid pl="3" minChildWidth="240px" spacing={["6", "8"]} w="100%" >
                                    <Text>Description</Text>
                        </SimpleGrid>
                                <SimpleGrid pl="3" minChildWidth="240px" spacing={["6", "8"]} w="100%">
                                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suscipit tellus mauris a diam maecenas sed enim ut sem.</Text>
                        </SimpleGrid>
                            </VStack>

                            <VStack spacing="1">
                                <SimpleGrid pr="3" pl="3" pt="5" minChildWidth="240px" spacing={["6", "8"]} w="100%">
                                    <Input size="xs" />
                                </SimpleGrid>
                                <SimpleGrid pr="5" minChildWidth="240px" spacing={["6", "8"]} w="100%">
                                    <Button size="xs" as="a" colorScheme="gray.450" bg="gray.700" ml="3" onClick={() => { localStorage.removeItem('@wspacewars/token') }} >
                                        Build
                                    </Button>
                                </SimpleGrid>
                            </VStack>


                        </Stack>
                    </Box>

                </Box>
            </Flex>
        </Box>
    );
}