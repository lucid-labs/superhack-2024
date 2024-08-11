"use client";
import { TokenBalance } from "@/types/token.types";
import { getReadableValue } from "@/utils/convert";
import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWallet } from "./ThirdwebContext";

interface UserSettings {
  isLuciditySimulationAuthorized: boolean;
  isLuciditySimulationMode: boolean;
}

const initUserSettings = {
  isLuciditySimulationAuthorized: false,
  isLuciditySimulationMode: false,
};

// Create a context to manage user details
const UserContext = createContext<{
  userBalances: TokenBalance[];
  setUserBalances: (balances: TokenBalance[]) => void;
  userBalanceFetching: boolean;
  fetchEoaBalancesFlag: boolean;
  setFetchEoaBalancesFlag: (flag: boolean) => void;
  userSettings: UserSettings;
  setUserSettings: (settings: {
    key: keyof UserSettings;
    value: UserSettings[keyof UserSettings];
  }) => void;
}>({
  userBalances: [],
  setUserBalances: () => {},
  userBalanceFetching: false,
  fetchEoaBalancesFlag: false,
  setFetchEoaBalancesFlag: () => {},
  userSettings: {
    isLuciditySimulationAuthorized: false,
    isLuciditySimulationMode: false,
  },
  setUserSettings: () => {},
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { address, chain } = useWallet();
  const [userBalances, setUserBalancesState] = useState<TokenBalance[]>([]);
  const [fetchEoaBalancesFlag, setFetchEoaBalancesFlagState] =
    useState<boolean>(false);
  const [userSettings, setUserSettingsState] =
    useState<UserSettings>(initUserSettings);
  const [userBalanceFetching, setUserBalanceFetchingState] =
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
        setUserBalanceFetchingState(true);
        const res = await axios.get<{
          address: string;
          tokenBalances: TokenBalance[];
        }>(
          process.env.NEXT_PUBLIC_API_URL +
            `/balances/${chain?.chainId}/${address}?resetCache=${FORCE_REFRESH}`
        );
        if (res.status === 200) {
          const balances = res.data?.tokenBalances.map((x) => {
            x.tokenBalance = getReadableValue(x.tokenBalance, x.decimals);
            // x.tokenBalance = x.tokenBalance;
            return x;
          });
          setUserBalances(balances);
          setUserBalanceFetchingState(false);
        }
      } catch (error) {
        console.log(error);
        setUserBalanceFetchingState(false);
      }
    };
    if (address !== "" && chain?.chainId !== undefined) return getBalances();
  }, [chain?.chainId, address, setUserBalances]);

  const setUserSettings = useCallback(
    (payload: {
      key: keyof UserSettings;
      value: UserSettings[keyof UserSettings];
    }) => {
      // const userSettings = initUserSettings;
      const userSettings = {
        ...initUserSettings,
        [payload.key]: payload.value,
      };
      userSettings[payload.key] = payload.value as boolean;
      window.localStorage.setItem("userSettings", JSON.stringify(userSettings));
      setUserSettingsState(userSettings);
    },
    []
  );

  useEffect(() => {
    getEoaBalances();
  }, [address, chain?.chainId, fetchEoaBalancesFlag, getEoaBalances]);

  return (
    <UserContext.Provider
      value={{
        userBalances,
        setUserBalances,
        userBalanceFetching,
        fetchEoaBalancesFlag,
        setFetchEoaBalancesFlag,
        userSettings,
        setUserSettings,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
export const useUser = () => useContext(UserContext);
