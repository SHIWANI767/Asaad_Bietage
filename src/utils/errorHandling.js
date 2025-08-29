import { errorMessages } from "./errorMessages";

export const handleErrors = (err, contractInstance) => {
  let message = err.details ?? err.reason ?? err.message ?? err;

  if (err?.error?.data) {
    const revertData = err.error.data;

    try {
      const decodedError = contractInstance.interface.parseError(revertData);
      if (decodedError && decodedError.name !== "Error") {
        message = decodedError.name;
      }
    } catch (decodeError) {
      console.error("Error while decoding blockchain error:", decodeError);
    }
  }

  const userFriendlyMessage = errorMessages[message];
  if (userFriendlyMessage) {
    message = userFriendlyMessage;
  }

  return message;
};
