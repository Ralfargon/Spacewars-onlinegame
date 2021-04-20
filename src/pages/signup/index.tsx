import { Box, Button, HStack, Flex, Heading, Divider, VStack, SimpleGrid, Text } from "@chakra-ui/react";
import { Input } from "../../components/Form/Input"
import Link from "next/link";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Head from 'next/head';
import apiCreateUser from '../api/apiCreateUser'
import { redirect } from "next/dist/next-server/server/api-utils";
import { useRouter } from 'next/router'
import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from "@chakra-ui/react"
import { useState } from "react";


type CreateUserFormData = {
    first_name: string;
    surname: string;
    email: string;
    password: string;
    password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    surname: yup.string().required('Surname is required'),
    email: yup.string().required('Email is required').email('Invalid Email'),
    password: yup.string().required('Password is required').min(6, 'Minimun 6 characters'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'The passwords must match')
})


export default function SignUp() {
    const [alert, setAlert] = useState(false);

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })

    const router = useRouter()

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        try{
            const response = await apiCreateUser(values);
            console.log(response);
    
            if (!!response.id) {
                return router.push("/success")
            }
            setAlert(true)
        }
        catch(e){
            setAlert(true)
        }
    }

    const { errors } = formState

    return (
        <Box align="center">

            { alert && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={2} color="black">Email already exist!</AlertTitle>
                    <AlertDescription color="black">Please, use another email.</AlertDescription>
                    <CloseButton position="absolute" right="8px" top="8px" />
                </Alert>
            )}


            <Head>
                <title>Spacewars | Sign Up</title>
            </Head>

            <Text fontSize={["2xl", "3xl"]} fontWeight="bold" letterSpacing="tight" w="64" mt="12" >
                SpaceWars
            </Text>

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">

                <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]} onSubmit={handleSubmit(handleCreateUser)}>
                    <Heading size="lg" fontWeight="normal">
                        Create user
                </Heading>
                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input name="first_name" type="name" label="First Name" error={errors.first_name} {...register('first_name')} />
                            <Input name="surname" type="name" label="Surname" error={errors.surname} {...register('surname')} />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input name="email" type="email" label="Email" error={errors.email} {...register('email')} onChange={() => setAlert(false)} />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input name="password" type="password" label="Password" error={errors.password} {...register('password')} />
                            <Input name="password_confirmation" type="password" label="Confirm password" error={errors.password_confirmation} {...register('password_confirmation')} />
                        </SimpleGrid>

                    </VStack>
                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4" align="center">
                            <Link href="/" passHref >
                                <Button as="a" colorScheme="purple">Cancel</Button>
                            </Link>
                            <Button type="submit" colorScheme="purple" isLoading={formState.isSubmitting}>Save</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}