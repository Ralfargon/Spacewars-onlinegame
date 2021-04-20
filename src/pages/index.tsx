import { Flex, Button, Stack, Text } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../components/Form/Input'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Head from 'next/head';
import postFunction from './api/apiRoutesPost'
import Link from "next/link";
import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from "@chakra-ui/react"
import { useState } from "react";
import { useRouter } from 'next/router'

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid Email'),
  password: yup.string().required('Password is required'),
})

export default function SignIn() {
  const [alertLogin, setAlertLogin] = useState(false);
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
      const response = await postFunction(values);
      localStorage.setItem('@wspacewars/token', response.token);

      if (!!response.token) {
        return router.push("/dashboard")
      }
      setAlertLogin(true)
    }
    catch (e) {
      setAlertLogin(true)
    }
  }

  const { errors } = formState


  return (
    <>
      { alertLogin && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2} color="black">Failed to login!</AlertTitle>
          <AlertDescription color="black">Please, check your email and password.</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}

      <Flex w="100vw" h="100vh" align="center" justify="center" >
        <Head>
          <title>Spacewars | Login</title>
        </Head>

        <Flex as="form" width="100%" maxWidth={360} bg="gray.800" p="8" borderRadius={8} flexDir="column" onSubmit={handleSubmit(handleSignIn)} >

          <Text
            fontSize={["2xl", "3xl"]} fontWeight="bold" letterSpacing="tight" w="64" mb="20" align="center">SpaceWars
        </Text>

          <Stack spacing="4">
            <Input type="email" name="email" label="Email" error={errors.email} {...register('email')} onChange={() => setAlertLogin(false)}/>
            <Input type="password" name="password" label="Password" error={errors.password} {...register('password')} onChange={() => setAlertLogin(false)}/>
          </Stack>

          <Button type="submit" mt="6" colorScheme="purple" size="lg" isLoading={formState.isSubmitting} >
            Entrar
        </Button>

          <Stack mt="12" align="center">
            <Link href="/signup" passHref >
              <Text>Don't have an account? Sign up <Text color="yellow.400" as="u" ml="1" cursor="pointer">here</Text></Text>
            </Link>
          </Stack>

        </Flex>
      </Flex>
    </>
  )
}


