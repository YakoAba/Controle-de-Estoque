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
  const { isOpen, onClose } = useGlobalContext();
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={() => onClose()}>
      <DrawerOverlay>
        <DrawerContent p="2" onClick={() => onClose()}>
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
