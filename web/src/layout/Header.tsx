import { Text, VStack } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

const Header = () => {
  return (
    <div>
      <VStack>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Text fontSize={"xl"}>Track progress for learning C#</Text>
      </VStack>
    </div>
  );
};

export default Header;
