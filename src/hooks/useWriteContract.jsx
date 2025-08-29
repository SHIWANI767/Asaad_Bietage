import { formatEther, getContract, parseEther } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import {
  depositUSDTContract,
  depositFIEROContract,
  sortAddress,
} from "@/utils";
import { DEPOSIT_ABI, ERC20_ABI, DEPOSIT_FIERO_ABI } from "@/data/abis";
import { handleErrors } from "@/utils/errorHandling";

export const useWriteContract = () => {
  const { address, isConnected, chain } = useAccount();
  const chainId = chain !== undefined ? chain.id : 1;

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const deposit_usdt = async (amount, walletUsdAddress) => {
    if (!amount) {
      return {
        success: false,
        data: null,
        error: "Please enter deposit amount.",
      };
    }
    const amountInWei = parseEther(amount.toString());

    if (!walletClient || !publicClient)
      throw new Error("Client not initialized");

    const contractObj = getContract({
      abi: DEPOSIT_ABI,
      address: depositUSDTContract,
      client: walletClient,
    });

    const usdtToken = await contractObj.read.usdtToken([]);
    console.log(
      usdtToken,
      " usdtToken ------------- contractObj ",
      contractObj
    );

    const tokenObj = getContract({
      abi: ERC20_ABI,
      address: usdtToken,
      client: walletClient,
    });
    try {
      let balanceOf = await tokenObj.read.balanceOf([address]);
      if (Number(formatEther(balanceOf)) < Number(amount)) {
        return {
          success: false,
          data: null,
          error:
            "Transaction failed: Insufficient funds. Please check your balance.",
        };
      }
      if (!walletUsdAddress) {
        return {
          success: false,
          data: null,
          error:
            "Your usdt wallet address does not created at! please contact us.",
        };
      }

      const allowance = await tokenObj.read.allowance([
        address,
        depositUSDTContract,
      ]);

      if (Number(allowance) < amountInWei) {
        const approve = await tokenObj.write.approve([
          depositUSDTContract,
          amountInWei,
        ]);
        await publicClient.waitForTransactionReceipt({
          confirmations: 3,
          hash: approve,
        });
        console.log(" ------- approve ", approve);
      }
      const hash = await contractObj.write.deposit([
        walletUsdAddress,
        amountInWei.toString(),
      ]);
      await publicClient.waitForTransactionReceipt({
        confirmations: 3,
        hash: hash,
      });
      return { success: true, data: hash, error: null };
    } catch (error) {
      // console.log("----- error", error);
      const message = handleErrors(error, DEPOSIT_ABI);
      //   notifyError(message);
      //   console.log(" =----- message ", message);
      return { success: false, data: null, error: message };
    }
  };

  const deposit_fiero = async (amount, walletFieroAddress) => {
    if (!amount) {
      return {
        success: false,
        data: null,
        error: "Please enter deposit amount.",
      };
    }
    const amountInWei = parseEther(amount.toString());

    if (!walletClient || !publicClient)
      throw new Error("Client not initialized");

    const contractObj = getContract({
      abi: DEPOSIT_FIERO_ABI,
      address: depositFIEROContract,
      client: walletClient,
    });
    console.log(" usdtToken ------------- contractObj ", contractObj);

    try {
      const balanceOf = await publicClient.getBalance({
        address: address,
      });
      if (Number(formatEther(balanceOf)) < Number(amount)) {
        return {
          success: false,
          data: null,
          error:
            "Transaction failed: Insufficient funds. Please check your balance.",
        };
      }
      if (!walletFieroAddress) {
        return {
          success: false,
          data: null,
          error:
            "Your fiero wallet address does not created at! please contact us.",
        };
      }

      const hash = await contractObj.write.deposit([walletFieroAddress], {
        value: amountInWei.toString(),
      });
      await publicClient.waitForTransactionReceipt({
        confirmations: 3,
        hash: hash,
      });
      return { success: true, data: hash, error: null };
    } catch (error) {
      const message = handleErrors(error, DEPOSIT_ABI);
      return { success: false, data: null, error: message };
    }
  };
  const withdraw_fiero = async (amount, walletFieroAddress) => {
    // if (!amount) {
    //   return {
    //     success: false,
    //     data: null,
    //     error: "Please enter deposit amount.",
    //   };
    // }
    // const amountInWei = parseEther(amount.toString());

    if (!walletClient || !publicClient)
      throw new Error("Client not initialized");

    const contractObj = getContract({
      abi: DEPOSIT_FIERO_ABI,
      address: depositFIEROContract,
      client: walletClient,
    });
    // console.log(" usdtToken ------------- contractObj ", contractObj);

    try {
      let admin = await contractObj.read.admin([]);
      if (admin.toLocaleLowerCase() !== address.toLocaleLowerCase()) {
        return {
          success: false,
          data: null,
          error: `The connected address is not authorized to withdraw. Please connect your wallet using the authorized address ${sortAddress(
            admin
          )}.`,
        };
      }
      // const balanceOf = await publicClient.getBalance({
      //   address: address,
      // });
      const balanceOf = await publicClient.getBalance({
        address: depositFIEROContract,
      });

      if (Number(formatEther(balanceOf)) == 0) {
        return {
          success: false,
          data: null,
          error:
            "The transaction failed due to insufficient funds. No funds are available for withdrawal.",
        };
      }

      const hash = await contractObj.write["emergencyDrain"]([]);
      await publicClient.waitForTransactionReceipt({
        confirmations: 3,
        hash: hash,
      });
      return { success: true, data: hash, error: null };
    } catch (error) {
      const message = handleErrors(error, DEPOSIT_ABI);
      return { success: false, data: null, error: message };
    }
  };
  const withdraw_usdt = async () => {
    if (!walletClient || !publicClient)
      throw new Error("Client not initialized");

    const contractObj = getContract({
      abi: DEPOSIT_ABI,
      address: depositUSDTContract,
      client: walletClient,
    });

    try {
      const usdtToken = await contractObj.read.usdtToken([]);

      let admin = await contractObj.read.admin([]);
      if (admin.toLocaleLowerCase() !== address.toLocaleLowerCase()) {
        return {
          success: false,
          data: null,
          error: `The connected address is not authorized to withdraw. Please connect your wallet using the authorized address ${sortAddress(
            admin
          )}.`,
        };
      }
      const tokenObj = getContract({
        abi: ERC20_ABI,
        address: usdtToken,
        client: walletClient,
      });
      let balanceOf = await tokenObj.read.balanceOf([depositUSDTContract]);

      if (Number(formatEther(balanceOf)) == 0) {
        return {
          success: false,
          data: null,
          error:
            "The transaction failed due to insufficient funds. No funds are available for withdrawal.",
        };
      }

      const hash = await contractObj.write["withdrawAll"]([]);
      await publicClient.waitForTransactionReceipt({
        confirmations: 3,
        hash: hash,
      });
      return { success: true, data: hash, error: null };
    } catch (error) {
      // console.log("----- error", error);
      const message = handleErrors(error, DEPOSIT_ABI);
      //   notifyError(message);
      //   console.log(" =----- message ", message);
      return { success: false, data: null, error: message };
    }
  };
  return {
    deposit_usdt,
    deposit_fiero,
    withdraw_fiero,
    withdraw_usdt,
  };
};
