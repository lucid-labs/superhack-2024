"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWallet } from "./ThirdwebContext";
import axios from "axios";
import { TokenBalance } from "@/types/token.types";
import { getReadableValue } from "@/utils/convert";

// Create a context to manage user details
const UserContext = createContext<{
  userBalances: TokenBalance[];
  setUserBalances: (balances: TokenBalance[]) => void;
  fetchEoaBalancesFlag: boolean;
  setFetchEoaBalancesFlag: (flag: boolean) => void;
}>({
  userBalances: [],
  setUserBalances: () => {},
  fetchEoaBalancesFlag: false,
  setFetchEoaBalancesFlag: () => {},
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { address, chainId } = useWallet();
  const [userBalances, setUserBalancesState] = useState<TokenBalance[]>([]);
  const [fetchEoaBalancesFlag, setFetchEoaBalancesFlagState] =
    useState<boolean>(false);

  const setUserBalances = useCallback((balances: TokenBalance[]) => {
    setUserBalancesState(balances);
  }, []);

  const setFetchEoaBalancesFlag = useCallback((flag: boolean) => {
    setFetchEoaBalancesFlagState(flag);
  }, []);

  const getEoaBalances = useCallback(() => {
    const FORCE_REFRESH = false;
    const getBalances = async () => {
      try {
        const res = await axios.get<{
          address: string;
          tokenBalances: TokenBalance[];
        }>(
          process.env.NEXT_PUBLIC_API_URL +
            `/balances/${chainId}/${address}?resetCache=${FORCE_REFRESH}`
        );
        if (res.status === 200) {
          const balances = res.data?.tokenBalances.map((x) => {
            x.tokenBalance = getReadableValue(x.tokenBalance, x.decimals);
            // x.tokenBalance = x.tokenBalance;
            return x;
          });
          setUserBalances(balances);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (address !== "" && chainId !== undefined) return getBalances();
  }, [chainId, address, setUserBalances]);

  useEffect(() => {
    getEoaBalances();
  }, [address, chainId, fetchEoaBalancesFlag, getEoaBalances]);

  return (
    <UserContext.Provider
      value={{
        userBalances,
        setUserBalances,
        fetchEoaBalancesFlag,
        setFetchEoaBalancesFlag,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
export const useUser = () => useContext(UserContext);
