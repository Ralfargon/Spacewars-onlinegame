import { Box, Flex, Text, HStack, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function success() {
    return (

        <Flex w="100vw" h="100vh" justify="center" align="center">
            <Box>
                <Flex width="100%" maxWidth={360} bg="gray.800" p="8" borderRadius={8} flexDir="column">


                    <Box flex="1" borderRadius={8} bg="gray.800" p="8" justify="center" align="center" >
                        <Text
                            fontSize={["2xl", "3xl"]}
                            fontWeight="bold"
                            letterSpacing="normal"
                            w="64"
                        >User created!
                    </Text>


                    <Flex mt="120" justify="center" align="center" >

                            <Link href="/" passHref >
                                <Button as="a" colorScheme="purple">Login here</Button>
                            </Link>

                    </Flex>
                    </Box>

                </Flex>
            </Box>
        </Flex>
    );
}