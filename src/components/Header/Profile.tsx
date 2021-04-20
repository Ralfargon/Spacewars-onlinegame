import { Flex, Box, Avatar, Text } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import apiGetPlanetStatus from "../../pages/api/apiGetPlanetStatus";

interface ProfileProps {
    showProfileData?: boolean,
}


export function Profile({ showProfileData = true }: ProfileProps) {
    const [commander, setCommander] = useState(null);
    const [name, setName] = useState(null);
    const [breed, setBreed] = useState(null);

    useEffect(() => {
        apiGetPlanetStatus()
            .then((planets) => {
                setCommander(planets.commander)
                setName(planets.name)
                setBreed(planets.breed_name)
            })
            .catch((e) => {
                console.log("Get planet status error.", e)
            })
    }, [])

    return (
        <Flex align="center" >
            { showProfileData && (
                <>
                    <Box mr="4" textAlign="right">
                        <Text>{commander}</Text>
                        <Text color="gray.300" fontSize="small">
                            {name}
                    </Text>
                    </Box>

                    { 
                    breed==="Coruscare" ? <Avatar size="md" name="planet" src="/images/et1.png"/> : 
                    breed==="Amnis" ? <Avatar size="md" name="planet" src="/images/et2.png"/> : 
                    breed==="Motus" ? <Avatar size="md" name="planet" src="/images/et3.png"/> : ""
                    }
                    
                </>
            )}
        </Flex>
    );
}