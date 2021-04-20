import { HStack, Icon } from '@chakra-ui/react'
import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri';

interface NotificationsNavProps {
    showNotificationsNav?: boolean,
}

export function NotificationsNav({ showNotificationsNav = true }: NotificationsNavProps) {
    return (
        <>
            {showNotificationsNav && (
                <HStack
                    spacing={["6", "8"]}
                    mx={["6", "8"]}
                    pr={["6", "8"]}
                    pl={["6", "8"]}
                    py="1"
                    color="gray.300"
                    borderRightWidth={1}
                    borderLeftWidth={1}
                    borderColor="gray.700"
                >
                    <>
                        <Icon as={RiNotificationLine} fontSize="20" />
                        <Icon as={RiUserAddLine} fontSize="20" />
                    </>

                </HStack>
            )}

        </>
    );
}