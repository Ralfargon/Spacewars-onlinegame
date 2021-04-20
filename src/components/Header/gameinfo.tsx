import { Text, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import apiGetCurrentRound from "../../pages/api/apiGetRound";

interface GameInfoProps {
    showGameInfo?: boolean,
}

export function GameInfo({ showGameInfo = true }: GameInfoProps) {
    const [currentRound, setCurrentRound] = useState(null);
    const [currentTick, setCurrentTick] = useState(null);


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

    return (
        <Flex align="center" >
            {showGameInfo && (
                <>
                    <Text color="gray.300" fontSize="small">
                        Round: {currentRound}
                    </Text>
                    <Text color="gray.300" fontSize="small" ml="2">
                        Tick: {currentTick}
                    </Text>
                </>
            )}
        </Flex>
    );
}
