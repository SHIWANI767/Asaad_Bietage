import { api_configs } from "@/api-services";
import AppContext from "@/context/AppContext";
import axios from "axios";
import * as XLSX from "xlsx";
import CryptoJS from "crypto-js";
const base64url = require("base64url");

const SECRET_KEY = "12345678901234567890123456789012";
export const maxCapitalsLimit = 10000000000000;
export const NetworkContextName = "Fieres Mainnet";
export const ACTIVE_NETWORK = 1001;

export const RPC_URL = "https://rpc2.fieroscan.com/"; //mainNet
export const explorerURL = "https://fieroscan.com";

let letestContract = "0x1A989F96771263767c314fA0Bf2a3372c93c8D3d"; // mainnet contract fiero and usdt.
export const depositUSDTContract = letestContract; //USDT mainnet contract
export const depositFIEROContract = letestContract; // fiero mainnet contract

// export const depositUSDTContract = "0x152D21A3f6583921F1B7E1d4fCDE07672451dd78"; //USDT test contract
// // fiero mainnet fuel wallet
// export const depositFIEROContract =
//   "0x470F10637DF1124596b916357542e0D4AfE34423"; // fiero mainnet contract

export function validUrl(value) {
  const re =
    /((http|https):\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return re.test(value);
}
// import { useContext } from "react";
export function replacetext(text, replaceTo, replaceWith) {
  // Replace '-' with ' ' and split the string into words
  const words = text
    ?.split(replaceTo)
    ?.map(
      (word) => word?.charAt(0).toUpperCase() + word?.slice(1).toLowerCase()
    );

  // Join the words with space
  return words?.join(replaceWith);
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 7 + ITEM_PADDING_TOP,
      // width: isMobile ? "100%" : 250,
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: undefined,
};
export function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, function (match, p1) {
    return p1.toUpperCase();
  });
}
//function to get the time left duration from a particular timestamp
export const calculateTimeLeft = (endDate) => {
  if (endDate) {
    let difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  } else {
    return false;
  }
};
export const arbitrageNameFilter = {
  QuantumFlow: "Direct Arbitrage",
  QuantumLoop: "Triangular Arbitrage",
  QuantumBridge: "intra Arbitrage Single Exchange",
};

export const arbitrageNameFilterReverse = {
  "Direct Arbitrage": " QuantumFlow",
  "Triangular Arbitrage": " QuantumLoop",
  "intra Arbitrage Single Exchange": " QuantumBridge ",
};

export function checkNumber(value) {
  // const re = /^(?!0+$)[0-9]{1,10}$/gm;
  // return re.test(value);
  const re = /^[1-9][0-9]{9}$/;
  return re.test(value);
}
export const getCoinImageDatahandler = async (token) => {
  try {
    const res = await axios({
      method: "GET",
      url: api_configs.get_wallet_coinImageData,
    });
    if (res.data.responseCode === 200) {
      return res?.data?.result;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
export function fixDecimal(number) {
  const zeroCount = countZerosAfterDecimal(number);

  if (zeroCount === 0 && number === Math.floor(number)) {
    return number.toString();
  } else if (zeroCount === 0 || number >= 1) {
    return parseFloat(number).toFixed(4);
  } else if (number < 1) {
    return parseFloat(number)
      .toFixed(zeroCount + 4)
      .toString();
  }
}
export function formatDecimal(number) {
  const decimalPlaces = countDecimalPlaces1(number);
  if (Number(number) === 0) {
    return 0;
  }
  if (decimalPlaces === 0 && number === Math.floor(number)) {
    return number.toString();
  }
  return parseFloat(number)
    .toFixed(decimalPlaces + 4)
    .toString();
}

function countDecimalPlaces1(number) {
  const numString = number.toString();
  const decimalIndex = numString.indexOf(".");
  if (decimalIndex === -1) {
    return 0;
  }

  return numString.length - decimalIndex - 1;
}
export const convertArrayToXLSX = async (data, fileName) => {
  try {
    const wb = XLSX.utils.book_new();
    const sheetData = [];
    // Flatten the data if it's an array of objects
    if (Array.isArray(data[0])) {
      data.forEach((array) => {
        const flattenedArray = array.map((obj) => flattenObject(obj, null, []));
        sheetData.push(...flattenedArray);
      });
    } else {
      sheetData.push(...data.map((obj) => flattenObject(obj, null, [])));
    }
    const ws = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    };

    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    const downloadURL = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
    const timestampedFileName = `${fileName}_${timestamp}.xlsx`;
    await downloadFileAsync(downloadURL, timestampedFileName);
  } catch (error) {
    console.error("Error:", error);
  }
};
const toReadableFormat = (key) => {
  if (/^[A-Z]+$/.test(key)) {
    return key;
  }
  return key
    .replace(/([A-Z])/g, " $1") // Add a space before capital letters
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
};

// Utility function to flatten an object with dynamic key mapping
const flattenObject = (obj, parent = "", res = {}) => {
  for (let key in obj) {
    let propName = parent ? parent + " " + key : key;
    if (Array.isArray(obj[key])) {
      obj[key].forEach((item, index) => {
        if (typeof item !== "string") {
          const itemKey = `${toReadableFormat(propName)} ${
            item?.action ? item?.action.toUpperCase() : index
          }`;
          Object.entries(item).forEach(([subKey, value]) => {
            const subPropName = `${toReadableFormat(subKey)}(${itemKey})`;
            res[subPropName] =
              typeof value === "boolean" ? value?.toString() : value;
          });
        } else {
          const itemKey = `${toReadableFormat(propName)} ${
            item?.action ? item?.action.toUpperCase() : index
          }`;
          res[itemKey] = item;
        }
      });
    } else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      flattenObject(obj[key], propName, res);
    } else {
      let readableKey = parent ? toReadableFormat(key) : toReadableFormat(key);
      res[readableKey] =
        typeof obj[key] === "boolean" ? obj[key]?.toString() : obj[key];
    }
  }
  return res;
};
async function downloadFileAsync(url, fileName) {
  try {
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.style.display = "none";
    document.body.appendChild(a);

    return new Promise((resolve, reject) => {
      a.click();
      resolve();
    }).then(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Clean up
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
export function countZerosAfterDecimal(number) {
  const numString = number.toString();
  const decimalIndex = numString.indexOf(".");
  if (decimalIndex === -1) {
    return 0;
  }

  let zeroCount = 0;
  for (let i = decimalIndex + 1; i < numString.length; i++) {
    if (numString[i] === "0") {
      zeroCount++;
    } else {
      break;
    }
  }
  return zeroCount;
}

export const handleNegativeValue = (event) => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
  }
};
// export function funConEx(value) {
//   // function coinImageEx(value) {
//   let newArray = [];
//   for (let i = 0; i < value?.length; i++) {
//     for (let j = 0; j < ExchangeArray?.length; j++) {
//       if (
//         value[i]?.exchangeName.toLowerCase() ==
//         ExchangeArray[j]?.coinName.toLowerCase()
//       ) {
//         newArray.push({ ...value[i], img: ExchangeArray[j]?.img });
//       }
//     }
//   }
//   return newArray;
// }
export function funConEx(exchanges) {
  const filteredExchanges = [];
  for (const exchange of exchanges) {
    const matchingExchange = ExchangeArray.find(
      (exchangeOption) =>
        exchange.exchangeName.toLowerCase() ===
        exchangeOption.coinName.toLowerCase()
    );
    filteredExchanges.push({
      ...exchange,
      img: matchingExchange
        ? matchingExchange?.img
        : exchange.exchangeName.toLowerCase(), // Fallback if no match is found
    });
  }
  return filteredExchanges;
}

export function sortAddress(add1) {
  let add = add1.toString();
  const sortAdd = `${add?.slice(0, 4)}...${add?.slice(add.length - 4)}`;
  return sortAdd;
}
export function handleTrim(value) {
  const sortValue = `${value?.slice(0, 16)}${value?.length > 16 ? "..." : ""}`;
  return sortValue;
}
export function sortAddressStart(add1) {
  let add = add1.toString();
  const sortAdd = `${add?.slice(0, 8)}${add.length > 8 ? "..." : ""}`;
  return sortAdd;
}
export function sortAddressWalletDeposite(add1) {
  let add = add1.toString();
  const sortAdd = `${add?.slice(0, 40)}...${add?.slice(add?.length - 4)}`;
  return sortAdd;
}
export function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string?.slice(1);
}
export function ReplaceDash(value, w) {
  return value.replace(/-/g, w);
}

export function replaceValue(input, regex, replacement) {
  return input.replace(regex, replacement);
}

export const setCryptoDecimals = (amt) => {
  amt = exponentialToDecimal(amt || 0);

  amt = amt?.replace(",", "");
  let [number, decimal] = amt?.toString().split(".");
  console.log(amt, "decimal", decimal);
  if (decimal) {
    let arr = amt?.toString().split(".");

    if (arr.length > 1) {
      if (arr[1].length > 4) {
        return numberWithCommas(
          exponentialToDecimal(parseFloat(amt).toFixed(4)).toString()
        ).toString();
      } else {
        return numberWithCommas(parseFloat(amt).toFixed(4)).toString();
      }
    } else {
      if (amt) {
        return numberWithCommas(parseFloat(amt).toFixed(2)).toString();
      }
      return "0";
    }
  } else {
    return amt;
  }
};
export const encrypt = (jsionText) => {
  try {
    const iv = CryptoJS.lib.WordArray.random(16); // Random Initialization Vector
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(jsionText),
      CryptoJS.enc.Base64.parse(SECRET_KEY),
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    // Concatenate IV and ciphertext, then encode as base64url
    const ivAndCipherText = iv.concat(encrypted.ciphertext);
    return base64url.fromBase64(ivAndCipherText.toString(CryptoJS.enc.Base64));
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

export const decrypt = (cipherText) => {
  try {
    const cipherTextBytes = base64url.toBuffer(cipherText);
    const iv = CryptoJS.lib.WordArray.create(cipherTextBytes.slice(0, 16));
    const encrypted = CryptoJS.lib.WordArray.create(cipherTextBytes.slice(16));

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encrypted },
      CryptoJS.enc.Base64.parse(SECRET_KEY),
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    console.log("error", err);
    return false;
  }
};

export const setCryptoDecimalsBTC = (amt) => {
  amt = exponentialToDecimalBTC(amt || 0);

  amt = amt.replace(",", "");
  let [number, decimal] = amt.toString().split(".");

  if (decimal) {
    if (decimal.length > 8) {
      return numberWithCommasBTC(parseFloat(amt).toFixed(8).toString());
    } else {
      return numberWithCommasBTC(
        parseFloat(amt).toFixed(decimal.length)
      ).toString();
    }
  } else {
    return numberWithCommasBTC(parseFloat(amt).toFixed(2)).toString();
  }
};

export const exponentialToDecimalBTC = (exponential) => {
  let decimal = exponential?.toString()?.toLowerCase();
  if (decimal?.includes("e+")) {
    const exponentialSplitted = decimal?.split("e+");
    let postfix = "";
    const decimalLength = exponentialSplitted[0].includes(".")
      ? exponentialSplitted[0].split(".")[1].length
      : 0;
    for (let i = 0; i < +exponentialSplitted[1] - decimalLength; i++) {
      postfix += "0";
    }
    decimal = exponentialSplitted[0].replace(".", "") + postfix;
  } else if (decimal?.includes("e-")) {
    const exponentialSplitted = decimal?.split("e-");
    let prefix = "0.";
    for (let i = 0; i < +exponentialSplitted[1] - 1; i++) {
      prefix += "0";
    }
    decimal = prefix + exponentialSplitted[0].replace(".", "");
  }
  return decimal;
};

const numberWithCommas = (x) => {
  let str = toFixedFunction(x, 8);

  let arr = str.split(".");

  let numbers = arr[0];
  let decimalNum = "";
  if (arr.length > 1) {
    decimalNum = arr[1];
    return `${numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${decimalNum}`;
  } else {
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};
const numberWithCommasBTC = (x) => {
  let str = toFixedFunctionBTC(x, 8);

  let [numbers, decimalNum] = str.split(".");

  if (decimalNum) {
    return `${numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${decimalNum}`;
  } else {
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

const toFixedFunctionBTC = (num, fixed) => {
  const re = new RegExp("^-?\\d+(?:\\.\\d{0," + (fixed || -1) + "})?");
  const matched = num.toString().match(re);
  return matched ? matched[0] : num.toString();
};

export const toFixedFunction = (amt, decimals) => {
  let str = amt?.toString();
  if (str?.includes(".")) {
    str = str?.slice(0, str.indexOf(".") + (decimals + 1));
  }
  return str;
};
export const exponentialToDecimal = (exponential) => {
  let decimal = exponential?.toString()?.toLowerCase();
  if (decimal?.includes("e+")) {
    const exponentialSplitted = decimal?.split("e+");
    let postfix = "";
    for (
      let i = 0;
      i <
      +exponentialSplitted[1] -
        (exponentialSplitted[0].includes(".")
          ? exponentialSplitted[0].split(".")[1].length
          : 0);
      i++
    ) {
      postfix += "0";
    }
    const addCommas = (text) => {
      let j = 3;
      let textLength = text.length;
      while (j < textLength) {
        text = `${text?.slice(0, textLength - j)},${text?.slice(
          textLength - j,
          textLength
        )}`;
        textLength++;
        j += 3 + 1;
      }
      return text;
    };
    decimal = addCommas(exponentialSplitted[0].replace(".", "") + postfix);
  }
  if (decimal?.toLowerCase().includes("e-")) {
    const exponentialSplitted = decimal?.split("e-");
    let prefix = "0.";
    for (let i = 0; i < +exponentialSplitted[1] - 1; i++) {
      prefix += "0";
    }
    decimal = prefix + exponentialSplitted[0].replace(".", "");
  }
  return decimal;
};
//function to generate unique avatar of the registered user
export function generateUniqueAvatar(value) {
  return `https://avatars.dicebear.com/api/identicon/${value}.svg`;
}
export function isValidFacebookUrl(value) {
  const re = /^(https?:\/\/)?(www\.)?facebook\.com(?:\/[a-zA-Z0-9_\-\.]+)?$/;
  return re.test(value);
}
export function isValidTwitterUrl(value) {
  const re = /^(https?:\/\/)?(www\.)?twitter\.com(?:\/[a-zA-Z0-9_]+)?$/;
  return re.test(value);
}
export function isValidInstagramUrl(value) {
  const re = /^(https?:\/\/)?(www\.)?instagram\.com(?:\/[a-zA-Z0-9_]+)?$/;
  return re.test(value);
}
export function isValidDiscordUrl(value) {
  const re = /^(https?:\/\/)?(www\.)?discord\.gg(?:\/[a-zA-Z0-9_]+)?$/;
  return re.test(value);
}
export const currencyFormatter = (value) => {
  let formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(value);
};

export const ExchangeArray = [
  { img: "/images/ExchangeLogo/kraken.png", coinName: "Kraken" },
  { img: "/images/ExchangeLogo/binance.jpg", coinName: "Binance" },
  { img: "/images/ExchangeLogo/Mexc.png", coinName: "Mexc" },
  { img: "/images/ExchangeLogo/Bitmart.jpg", coinName: "Bitmart" },
  { img: "/images/ExchangeLogo/gemini.png", coinName: "Gemini" },
  { img: "/images/ExchangeLogo/coinbase.png", coinName: "Coinbasepro" },
  { img: "/images/ExchangeLogo/coinbase.png", coinName: "coinbase" },
];
export const ExchangeLogo = [
  {
    img: "/images/ExchangeLogo/binance.jpg",
    title: "binance",
  },
  {
    img: "/images/ExchangeLogo/bitstamp.png",
    title: "bitstamp",
  },
  {
    img: "/images/ExchangeLogo/coinbase.png",
    title: "coinbase",
  },
  {
    img: "/images/ExchangeLogo/coinbase.png",
    title: "coinbasepro",
  },
  {
    img: "/images/ExchangeLogo/Mexc.png",
    title: "Mexc",
  },
  {
    img: "/images/ExchangeLogo/Bitmart.jpg",
    title: "Bitmart",
  },
  {
    img: "/images/ExchangeLogo/cryptocom.png",
    title: "cryptocom",
  },
  {
    img: "/images/ExchangeLogo/ftxus.png",
    title: "ftxus",
  },
  {
    img: "/images/ExchangeLogo/gemini.png",
    title: "gemini",
  },
  {
    img: "/images/ExchangeLogo/cexio.png",
    title: "cexio",
  },
  {
    img: "/images/ExchangeLogo/huobi.png",
    title: "huobi",
  },
  {
    img: "/images/ExchangeLogo/kraken.png",
    title: "kraken",
  },
  {
    img: "/images/ExchangeLogo/kucoin.png",
    title: "kucoin",
  },
  {
    img: "/images/ExchangeLogo/coinbasepro.png",
    title: "Coinbase",
  },
];
export function countDecimalPlaces(number) {
  const decimalString = number.toString().split(".")[1];
  return decimalString ? decimalString.length : 0;
}
export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export const getISODate = (offsetInHours) => {
  const date = new Date();
  date.setHours(date.getHours() - offsetInHours);
  return date.toISOString();
};

export const formatNumberInteger = (num, lenVal) =>
  Number.isInteger(num)
    ? num.toLocaleString()
    : +parseFloat(num).toFixed(lenVal).toLocaleString();
