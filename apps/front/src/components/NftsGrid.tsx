import { Box, Image, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { NFT } from '../types';

type NFTsGridProps = {
  nfts: NFT[];
  loading: boolean;
};

const NFTsGrid: React.FC<NFTsGridProps> = ({ nfts, loading }) => {
  const ipfsGateway = "https://ipfs.io/ipfs/";

  const [nftsWithImage, setNftsWithImage] = useState<NFT[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const promises = nfts.map(async (nft) => {
        const uri = nft.uri.replace('ipfs://', '');
        const response = await fetch(`${ipfsGateway}${uri}`);
        const parsedResponse = await response.json();

        return { ...nft, image: parsedResponse.image.replace('ipfs://', 'https://ipfs.io/ipfs/') };
      });

      const nftsWithImage = await Promise.all(promises);
      setNftsWithImage(nftsWithImage);
    };

    fetchImages();
  }, [nfts]);

  if (loading) {
    return (
      <Spinner />
    );
  }

  if (nfts.length === 0) {
    return (
      <Box mt="10" fontSize="xl">
        No NFTs found.
      </Box>
    );
  }


  return (
    <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={10}>
      {nftsWithImage.map((nft) => (
        <Box key={nft.id.toString()} boxShadow="md" p="5" rounded="md" bg="white">
          <Image src={nft.image?.replace('ipfs://', 'https://ipfs.io/ipfs/')} alt={nft.collectionName} borderRadius="md" />
          <Text mt="2" fontSize="lg" fontWeight="semibold" align="center">
            {nft.collectionName} #{nft.id.toString()}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default NFTsGrid;
