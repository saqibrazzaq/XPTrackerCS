import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import TopNavbar from "./TopNavbar";

const Header = () => {
  return (
    <div>
      <VStack>
        <TopNavbar />
      </VStack>
    </div>
  );
};

export default Header;
