import { Button, Flex } from '@chakra-ui/react';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { erc721EnumerableAbi } from '../abis/erc721Enumarable.abi';

const collectionToMint = '0x130682a97EDF54784F21af094761825c71fb6Fa9';

export const MintButton = () => {
  const { data: hash, writeContract, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  return (
    <Flex direction="column" align="center" justify="center" h="100%" mt={50}>
      <Button
        mx="auto"
        onClick={() => writeContract({
            abi: erc721EnumerableAbi,
            address: collectionToMint,
            functionName: 'mintOne',
          })
        }
        isDisabled={isConfirming}
        colorScheme={isConfirmed ? 'green' : 'blue'}
        isLoading={isPending}
        m={5}
        size={'lg'}
        fontSize={'2xl'}
      >
        {isConfirming ? 'Mining...' : isConfirmed ? 'Minted!' : 'Mint a NFT'}
      </Button>
    </Flex>
  );
}
