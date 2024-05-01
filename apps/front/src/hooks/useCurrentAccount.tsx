import { useAccount } from 'wagmi';
import { AddressString } from '../types';

/**
 * Return Current Account
 */
export function useCurrentAccount(): ReturnType<typeof useAccount> & { address: AddressString } {
  const { address, ...other } = useAccount();

  if (address === undefined) {
    throw new Error('User is not conntected');
  }

  return { address, ...other } as ReturnType<typeof useAccount> & { address: AddressString };
}
