import { formatEther, getContract, parseEther } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { depositUSDTContract, depositFIEROContract } from "@/utils";
import { DEPOSIT_ABI, ERC20_ABI, DEPOSIT_FIERO_ABI } from "@/data/abis";
import { handleErrors } from "@/utils/errorHandling";

export const useReadContract = () => {
  const publicClient = usePublicClient();

  const { data: walletClient } = useWalletClient();
  const { address, isConnected, chain } = useAccount();

  const handleFIEROBalance = async () => {
    try {
      const balance = await publicClient.getBalance({
        address: address,
      });
      return {
        success: true,
        data: {
          fieroBalance: balance,
        },
      };
    } catch (error) {
      console.error(error.reason ?? error.message ?? error);
      return {
        success: false,
        data: null,
      };
    }
  };

  const handleUSDTBalance = async () => {
    const contractObj = getContract({
      abi: DEPOSIT_ABI,
      address: depositUSDTContract,
      client: publicClient,
    });

    let balanceOf = 0;
    try {
      const usdtToken = await contractObj.read.usdtToken([]);

      const tokenObj = getContract({
        abi: ERC20_ABI,
        address: usdtToken,
        client: walletClient,
      });

      // const whitelist = await contractObj.read.whitelist([address]);
      if (address) {
        balanceOf = await tokenObj.read.balanceOf([address]);
        balanceOf = await formatEther(balanceOf);
      }

      return {
        success: true,
        data: {
          usdtBalance: balanceOf,
        },
      };
    } catch (error) {
      console.error(error.reason ?? error.message ?? error);
      return false;
    }
  };
  const total_balance_usdt = async (isUsdt) => {
    if (!walletClient || !publicClient)
      throw new Error("Client not initialized");

    const contractObj = getContract({
      abi: DEPOSIT_ABI,
      address: depositUSDTContract,
      client: walletClient,
    });

    const usdtToken = await contractObj.read.usdtToken([]);
    const tokenObj = getContract({
      abi: ERC20_ABI,
      address: usdtToken,
      client: walletClient,
    });
    try {
      let balanceOf = await tokenObj.read.balanceOf([depositUSDTContract]);

      return {
        success: true,
        data: {
          balance: formatEther(balanceOf),
        },
      };
    } catch (error) {
      // console.log("----- error", error);
      const message = handleErrors(error, DEPOSIT_ABI);
      //   notifyError(message);
      //   console.log(" =----- message ", message);
      return { success: false, data: null, error: message };
    }
  };

  const user_balance_usdt = async (isUsdt) => {
    if (!publicClient) throw new Error("Client not initialized");
    let userBalanceOf = 0;
    try {
      const contractObj = getContract({
        abi: DEPOSIT_ABI,
        address: depositUSDTContract,
        client: publicClient,
      });

      const usdtToken = await contractObj.read.usdtToken([]);
      const tokenObj = getContract({
        abi: ERC20_ABI,
        address: usdtToken,
        client: publicClient,
      });
      if (walletClient) {
        userBalanceOf = await tokenObj.read.balanceOf([address]);
      }
      return {
        success: true,
        data: {
          user_balance: formatEther(userBalanceOf),
          usdtTokenAddress: usdtToken,
        },
      };
    } catch (error) {
      // console.log("----- error", error);
      const message = handleErrors(error, DEPOSIT_ABI);
      return { success: false, data: null, error: message };
    }
  };

  const total_balance_fiero = async () => {
    try {
      const balance = await publicClient.getBalance({
        address: depositFIEROContract,
      });
      return {
        success: true,
        data: {
          balance: formatEther(balance),
        },
      };
    } catch (error) {
      console.error(error.reason ?? error.message ?? error);
      return {
        success: false,
        data: null,
      };
    }
  };
  return {
    handleFIEROBalance,
    handleUSDTBalance,
    total_balance_usdt,
    total_balance_fiero,
    user_balance_usdt,
  };
};
