import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import SidebarNav from "./SidebarNav";

function Sidebar() {
  const { disclosureMenu} = useGlobalContext();
  return (
    <Drawer isOpen={disclosureMenu.isOpen} placement="left" onClose={() => disclosureMenu.onClose()}>
      <DrawerOverlay>
        <DrawerContent p="2" onClick={() => disclosureMenu.onClose()}>
          <DrawerCloseButton />
          <DrawerHeader />
          <DrawerBody>
            <SidebarNav />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default Sidebar;
