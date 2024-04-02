import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
<>
<Navbar fluid rounded className="fixed w-full top-0 left-0 z-10">
      <Navbar.Brand href="/">
        <img src="https://flowbite-react.com/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-2xl font-bold dark:text-white">Mentor Hub</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Link to="/mentee/dashboard">
          <Dropdown.Item>Dashboard</Dropdown.Item>
          </Link>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#" className="lg:text-xl">About</Navbar.Link>
        <Navbar.Link href="#" className="lg:text-xl">Services</Navbar.Link>
        <Navbar.Link href="#" className="lg:text-xl">Pricing</Navbar.Link>
        <Navbar.Link href="#" className="lg:text-xl">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
</>

  )
}
