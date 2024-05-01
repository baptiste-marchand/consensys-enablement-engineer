import { Flex } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export const UserConnected = ({ children }: { children: React.ReactNode }) => {
  const { address } = useAccount();

  if (!address) {
    return (
      <Flex mt="30vh">
        <ConnectButton />
      </Flex>
    )
  }

  return <>{children}</>;
};

