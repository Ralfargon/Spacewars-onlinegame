import { Box, Flex, Text, Heading, VStack, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"
import Head from 'next/head';
import { useEffect, useState } from "react";
import apiGetCurrentRound from '../api/apiGetRound';
import apiGetPlanetStatus from '../api/apiGetPlanetStatus';
import apiGetMe from '../api/apiGetMe';

export default function UserProfile() {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    const [currentRound, setCurrentRound] = useState(null);
    const [currentTick, setCurrentTick] = useState(null);
    const [commander, setCommander] = useState(null);
    const [planetname, setPlanetname] = useState(null);
    const [breed, setBreed] = useState(null);
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [email, setEmail] = useState(null);




    useEffect(() => {
        apiGetCurrentRound()
            .then((round) => {
                setCurrentRound(round.id)
                setCurrentTick(round.tick)
            })
            .catch((e) => {
                console.log("Get current round error.", e)
            })
    }, [])
    
    useEffect(() => {
        apiGetPlanetStatus()
            .then((planets) => {
                setCommander(planets.commander)
                setPlanetname(planets.name)
                setBreed(planets.breed_name)
            })
            .catch((e) => {
                console.log("Get planet status error.", e)
            })
    }, [])

    useEffect(() => {
        apiGetMe()
            .then((users) => {
                setName(users.first_name)
                setSurname(users.surname)
                setEmail(users.email)
            })
            .catch((e) => {
                console.log("Get planet status error.", e)
            })
    }, [])

    useEffect(() => {
        apiGetPlanetStatus()
            .then((planets) => {
                setCommander(planets.commander)
                setPlanetname(planets.name)
                setBreed(planets.breed_name)
            })
            .catch((e) => {
                console.log("Get planet status error.", e)
            })
    }, [])

    return (
        <Box>
            <Header />
            <Head>
                <title>Spacewars | Profile</title>
            </Head>
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal" >Profile</Heading>
                    </Flex>

                    <VStack spacing="10">
                    <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                        <Text display="flex" color="white">
                            Name:<Text color="gray.300" ml="1"> {name}</Text>
                        </Text>

                        <Text display="flex" color="white">
                            Surname:<Text color="gray.300" ml="1"> {surname}</Text>
                        </Text>
                        
                        <Text display="flex" color="white">
                            Email:<Text color="gray.300" ml="1"> {email}</Text>
                        </Text>
                    </SimpleGrid>

                    <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                        <Text display="flex" color="white">
                            Commander:<Text color="gray.300" ml="1"> {commander}</Text>
                        </Text>
                        <Text display="flex" color="white">
                            Planet:<Text color="gray.300" ml="1"> {planetname}</Text>
                        </Text>
                        <Text display="flex" color="white">
                            Breed:<Text color="gray.300" ml="1"> {breed}</Text>
                        </Text>
                    </SimpleGrid>

                    <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                        <Text display="flex" color="white">
                            Round: <Text color="gray.300" ml="1"> {currentRound}</Text>
                        </Text>
                        <Text display="flex" color="white">
                            Tick: <Text color="gray.300" ml="1"> {currentTick}</Text>
                        </Text>
                        <Text></Text>
                    </SimpleGrid>

                    <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">

                    </SimpleGrid>
                    </VStack>
                </Box>
            </Flex>
        </Box>
    );
}