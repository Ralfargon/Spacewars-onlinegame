import { Stack } from "@chakra-ui/react"
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri"
import { NavLink } from "./NavLink"
import { NavSection } from "./NavSection";

export function SidebarNav() {
    return (
        <Stack spacing="12" align="flex-start">
            <NavSection title="Overview">
                <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
                <NavLink icon={RiContactsLine} href="/users">Profile</NavLink>
            </NavSection>
            <NavSection title="Technology">
                <NavLink icon={RiInputMethodLine} href="/research">Research</NavLink>
                <NavLink icon={RiGitMergeLine} href="/spaceships">Spaceships</NavLink>
            </NavSection>
        </Stack>
    );
}


