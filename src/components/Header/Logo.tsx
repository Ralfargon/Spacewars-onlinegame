import { Text, Link } from '@chakra-ui/react';

export function Logo() {

    return (
        <Link href="/dashboard" passHref >
            <Text
                fontSize={["2xl", "3xl"]}
                fontWeight="bold"
                letterSpacing="tight"
                w="64"
            >SpaceWars
        </Text>
        </Link>
    );
}