export type NFT = {
  id: bigint;
  collectionName: string;
  uri: string;
  image?: string;
};

export type AddressString = `0x${string}`;
