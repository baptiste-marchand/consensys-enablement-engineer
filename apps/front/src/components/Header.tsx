import { Box, Flex, Text } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  return (
    <Box as="header" width="100%" padding="4" boxShadow="sm">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="xl" fontWeight="bold">My App</Text>
        <ConnectButton />
      </Flex>
    </Box>
  );
}
