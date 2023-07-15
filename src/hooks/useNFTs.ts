import { abi } from '@/utils/abis/ditem';
import { useEffect, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { readContract } from 'wagmi/actions';

const contract = {
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
  abi,
} as const;

type TokenMetadata = {
  name: string;
  description: string;
  imageURL: string;
  animationURL: string;
};

export type Token = TokenMetadata & {
  id: bigint;
};

export const useNFTs = () => {
  const { address } = useAccount();
  const [tokens, setTokens] = useState<Token[]>([]);
  const { data: tokenIds } = useContractRead({
    enabled: !!address,
    ...contract,
    functionName: 'tokensOfOwner',
    args: address ? [address] : undefined,
    watch: true,
  });

  useEffect(() => {
    if (!tokenIds) return;

    const fetchData = async () => {
      try {
        const tokens = await fetchTokens(tokenIds);
        setTokens(tokens);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTokens = async (tokenIds: readonly bigint[]) => {
      const tokenPromises = tokenIds.map(fetchToken);
      const tokens = await Promise.all(tokenPromises);
      return tokens;
    };

    const fetchToken = async (tokenId: bigint) => {
      const tokenURI = await fetchTokenURI(tokenId);
      const ipfsGatewayURL = parseIPFSURL(tokenURI);
      const res = await fetch(ipfsGatewayURL);
      const tokenMetadata = (await res.json()) as Omit<
        TokenMetadata,
        'animationURL' | 'imageURL'
      > & {
        animation_url: string;
        image: string;
      };
      const token: Token = {
        id: tokenId,
        name: tokenMetadata.name,
        description: tokenMetadata.description,
        imageURL: parseIPFSURL(tokenMetadata.image),
        animationURL: parseIPFSURL(tokenMetadata.animation_url),
      };
      return token;
    };

    const fetchTokenURI = async (tokenId: bigint) => {
      const tokenURI = await readContract({
        ...contract,
        functionName: 'tokenURI',
        args: [tokenId],
      });
      return tokenURI;
    };

    const parseIPFSURL = (ipfsURL: string) => {
      const ipfsCID = ipfsURL.replace('ipfs://', '');
      return `${process.env.NEXT_PUBLIC_INFURA_IPFS_GATEWAY_BASE_URL}/${ipfsCID}`;
    };

    fetchData();
  }, [tokenIds]);

  useEffect(() => {
    // When a user disconnects the state should be cleared
    if (!address && tokens.length > 0) {
      setTokens([]);
    }
  }, [address, tokens]);

  return {
    tokens,
  };
};
