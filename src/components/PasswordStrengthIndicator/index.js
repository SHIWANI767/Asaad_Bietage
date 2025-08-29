import { Box, FormHelperText } from "@mui/material";

/**
 * Component to display strength of a password.
 * @param {Object} props - The props object.
 * @param {string} props.password - The password.
 * @returns {JSX.Element} - The JSX element representing the component.
 */
export const SecurePassword = ({ password }) => {
  /**
   * Returns the password strength color based on the password strength.
   * @returns {Object} - The password strength color object.
   */
  const getPasswordStrengthColor = () => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]/.test(
      password
    );
    const length = password.length;

    if (
      length >= 12 &&
      hasLowerCase &&
      hasUpperCase &&
      hasNumber &&
      hasSpecialCharacter
    ) {
      return { color: "#3BC117", text: "Secure", strength: 3 };
    } else if (
      length >= 8 &&
      (hasLowerCase || hasUpperCase) &&
      (hasNumber || hasSpecialCharacter)
    ) {
      return { color: "#FBBC36", text: "Average", strength: 2 };
    } else {
      return { color: "#FF372B", text: "Weak", strength: 1 };
    }
  };

  const strength = getPasswordStrengthColor();
  // console.log(" -------------- strength ", strength);
  return (
    <Box
      sx={{
        display: "flex",
        gap: "5px",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          background: strength.color,
          height: "4px",
          width: "100%",
          borderRadius: "5px",
        }}
      ></Box>
      <Box
        sx={{
          background: strength.strength !== 1 ? strength.color : "#535b55",
          height: "4px",
          width: "100%",
          borderRadius: "5px",
        }}
      ></Box>
      <Box
        sx={{
          background: strength.color === "#3BC117" ? "#3BC117" : "#535b55",
          height: "4px",
          width: "100%",
          borderRadius: "5px",
        }}
      ></Box>
      <FormHelperText
        sx={{
          color: strength.color,
          fontSize: "12px",
          whiteSpace: "nowrap",
        }}
      >
        {strength.text}
      </FormHelperText>
    </Box>
  );
};
