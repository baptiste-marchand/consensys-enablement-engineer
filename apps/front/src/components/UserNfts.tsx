import { Flex, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { erc721EnumerableAbi as erc721Abi } from '../abis/erc721Enumarable.abi';
import { supportedCollections } from '../constants';
import { useCurrentAccount } from '../hooks/useCurrentAccount';
import { publicClient } from '../rpc/client';
import { NFT } from '../types';
import NFTsGrid from './NftsGrid';

export const UserNfts = () => {
  const { address: userAddress } = useCurrentAccount();
  const [userNfts, setUserNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true);

      try {
        let nfts = [];
        for (const collection of supportedCollections) {
          const balance = await publicClient.readContract({
            abi: erc721Abi,
            address: collection.address,
            functionName: 'balanceOf',
            args: [userAddress],
          });

          for (let i = 0; i < Number(balance); i++) {
            const tokenId = await publicClient.readContract({
              abi: erc721Abi,
              address: collection.address,
              functionName: 'tokenOfOwnerByIndex',
              args: [userAddress, BigInt(i)],
            });
            const nftData = await publicClient.readContract({
              abi: erc721Abi,
              address: collection.address,
              functionName: 'tokenURI',
              args: [tokenId],
            });
            nfts.push({
              id: tokenId,
              uri: nftData,
              collectionName: collection.name,
            });
          }
        }

        setUserNfts(nfts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [userAddress]);

  return (
    <Flex alignItems={"center"} flexDir={'column'}>
      <Heading mt={10} textAlign="center" mx={"auto"}>Your NFTs</Heading>
      <NFTsGrid nfts={userNfts} loading={loading} />
    </Flex>
  );
};
