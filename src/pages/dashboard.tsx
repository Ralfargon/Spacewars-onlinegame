import { Flex, SimpleGrid, Box, Text } from "@chakra-ui/layout";
import Head from 'next/head';
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";


export default function Dashboard() {
    return (
        <Flex direction="column" h="100vh" >
            <Header />

            <Head>
                <title>Spacewars | Dashboard</title>
            </Head>

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" >
                <Sidebar />
                <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
                    <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4" >
                        <Text fontSize="lg" mb="4" >
                            Spaceships
                        </Text>
                    </Box>

                    <Box p={["6", "8"]} bg="gray.800" borderRadius={8} >
                        <Text fontSize="lg" mb="4" >
                            Researches
                        </Text>
                    </Box>
                </SimpleGrid>
            </Flex>
        </Flex>
    );
}