import { Box, Button, HStack, Flex, Heading, Divider, VStack, SimpleGrid, Text, Image, Select, useControllableState } from "@chakra-ui/react";
import { Input } from "../../components/Form/Input"
import Link from "next/link";
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Head from 'next/head';
import { useRouter } from 'next/router'
import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import apiGetCurrentRound from "../api/apiGetRound";
import apiCreatePlanet from "../api/apiCreatePlanet";

type CreateUserFormData = {
    commandername: string;
    planetname: string;
    breed: string;
};

const createUserFormSchema = yup.object().shape({
    commandername: yup.string().required('Commander name is required').max(32, 'Maximum 32 characters').min(4, 'Minimun 4 characters'),
    planetname: yup.string().required('Planet is required').max(32, 'Maximum 32 characters').min(4, 'Minimun 4 characters'),
    breed: yup.string().required('Breed is required'),
})



export default function SignUp() {
    const [alert, setAlert] = useState(false);
    const [currentRound, setCurrentRound] = useState(null);

    const { register, handleSubmit, formState, setValue } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })

    const router = useRouter()

    const handleCreatePlanet: SubmitHandler<CreateUserFormData> = async (values) => {
        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            await apiCreatePlanet(currentRound, values)
            router.push("/dashboard")
        }
        catch (e) {setAlert(true)}
    }

    const { errors } = formState

    setValue("breed", "et1")

    useEffect(() => {
        apiGetCurrentRound()
            .then((round) => {
                setCurrentRound(round.id)
            })
            .catch((e) => {
                console.log("Get current round error.", e)
            })
    }, [])


    return (
        <Box align="center">
            { alert && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={2} color="black">Creation error!</AlertTitle>
                    <AlertDescription color="black">Please, use another commandar or planet name.</AlertDescription>
                    <CloseButton position="absolute" right="8px" top="8px" />
                </Alert>
            )}

            <Head>
                <title>Spacewars | Creation</title>
            </Head>

            <Text fontSize={["2xl", "3xl"]} fontWeight="bold" letterSpacing="tight" w="64" mt="12" >
                SpaceWars
            </Text>

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">

                <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]} onSubmit={handleSubmit(handleCreatePlanet)}>
                    <Heading size="lg" fontWeight="normal">
                        Create your planet!
                </Heading>
                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input name="commandername" type="name" label="Commander" error={errors.commandername} {...register('commandername')} onChange={() => setAlert(false)}/>
                            <Input name="planetname" type="name" label="Planet" error={errors.planetname} {...register('planetname')} onChange={() => setAlert(false)}/>
                        </SimpleGrid>



                        <SimpleGrid display="block" align="center" justifyContent="center" justifyItems="center" minChildWidth="240px" spacing={["6", "8"]} w="100%" textColor="white" >
                            <Text fontWeight="bold" >
                                Choose your breed!
                            </Text>
                            <RadioGroup defaultValue="Coruscare" onChange={(value) => { setValue("breed", value) }}  >
                                <HStack display="block" align="center" direction="row" mt="1">
                                    <Radio value="Coruscare">Coruscare</Radio>
                                    <Radio value="Amnis">Amnis</Radio>
                                    <Radio value="Motus">Motus</Radio>
                                </HStack>
                            </RadioGroup>
                        </SimpleGrid>

                        <Divider my="6" borderColor="gray.700" />

                        <SimpleGrid display="inline-flex" align="left" justifyItems="left" justifyContent="left" minChildWidth="240px" spacing={["6", "8"]} w="100%" >
                            <Image mb="5" mt="2" borderRadius="full" boxSize="100px" src="/images/et1.png" alt="et1" />
                            <Text mt="inherit">
                                <strong>Coruscare: </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat in fermentum posuere urna nec tincidunt praesent. Adipiscing elit pellentesque habitant morbi tristique senectus.
                            </Text>
                        </SimpleGrid>

                        <SimpleGrid display="inline-flex" align="left" justifyItems="left" justifyContent="left" minChildWidth="240px" spacing={["6", "8"]} w="100%" >
                            <Image mb="5" bg="white" mt="2" borderRadius="full" boxSize="100px" src="/images/et2.png" alt="et2" />
                            <Text mt="inherit">
                                <strong>Amnis: </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu non diam phasellus vestibulum lorem sed risus. Tortor at auctor urna nunc id cursus metus aliquam.
                            </Text>
                        </SimpleGrid>

                        <SimpleGrid display="inline-flex" align="left" justifyItems="left" justifyContent="left" minChildWidth="240px" spacing={["6", "8"]} w="100%" >
                            <Image mb="3" mt="2" borderRadius="full" boxSize="100px" src="/images/et3.png" alt="et3" />
                            <Text mt="inherit">
                                <strong>Motus: </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu non diam phasellus vestibulum lorem sed risus. Tortor at auctor urna nunc id cursus metus aliquam.
                            </Text>
                        </SimpleGrid>



                    </VStack>
                    <Flex mt="8" justify="center">
                        <HStack spacing="4" align="center">
                            <Link href="/" passHref >
                                <Button as="a" colorScheme="purple"
                                    onClick={() => { localStorage.removeItem('@wspacewars/token') }}
                                >Cancel</Button>
                            </Link>
                            <Button type="submit" colorScheme="purple" isLoading={formState.isSubmitting}>Create</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box >
    );
}