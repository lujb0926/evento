'use client'
import { Navbar, NavbarBrand, NavbarContent, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, Button, DropdownSection } from "@heroui/react"
import { Link } from "@heroui/link";
import { signOut, useSession } from "next-auth/react";
export default function NavComponent() {
  const { data: session } = useSession()
  console.log('data=== ', session);
  const signOutUser = () => {
    signOut({
      callbackUrl: '/'
    })
  }
  return (
    <Navbar
      shouldHideOnScroll
      isBordered
      className="bg-gray-900 border-b-4 border-slate-400"
    >
      <NavbarBrand as={Link} href={'/'} className="text-inherit text-2xl text-white antonFont">
        EventO
      </NavbarBrand>

      <NavbarContent as={"div"} justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button variant="bordered" className="text-white">
              Menu
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Menu action" variant="flat">
            <DropdownSection>
              {
                session ?
                  <DropdownItem
                    key="logout"
                    className="text-black"
                    onPress={signOutUser}
                  >
                    Logout
                  </DropdownItem>
                  :
                  <DropdownItem
                    key="register"
                    as={Link}
                    href="/register"
                    className="text-black"
                  >
                    Register/Login
                  </DropdownItem>
              }
            </DropdownSection>
            {
              session &&
              <DropdownSection title="Admin actions">
                <DropdownItem
                  key="dashboard"
                  as={Link}
                  href="dashboard"
                  className="text-black"
                >
                  Dashboard
                </DropdownItem>
                <DropdownItem
                  key="addevent"
                  as={Link}
                  href="/dashboard/add_event"
                  className="text-black"
                >
                  Add Event
                </DropdownItem>
                <DropdownItem
                  key="addvenue"
                  as={Link}
                  href="/dashboard/add_venue"
                  className="text-black"
                >
                  Add Venue
                </DropdownItem>
              </DropdownSection>
            }
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

    </Navbar>
  )
}