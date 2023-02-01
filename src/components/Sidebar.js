import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay
} from "@chakra-ui/react";
import React from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
import useMedia from "../contexts/useMedia";
import SidebarNav from "./SidebarNav";

const Sidebar = () => {
  const { isOpen, onClose } = useSidebarContext();
  const isDrawerSidebar = useMedia("(max-width: 480px)");

  if (isDrawerSidebar) {
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

  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  );
};

export default Sidebar;
