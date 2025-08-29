import React, { useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Autocomplete,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/system";
import AppContext from "@/context/AppContext";
import { Form, Formik } from "formik";
import * as yup from "yup";
import ButtonCircularProgress from "./ButtonCircularProgress";

const FormContainer = styled(Box)(({ theme }) => ({
  maxWidth: "450px",
  backgroundColor: "transparent",
}));

export const PaymentButton = styled(Button)(({ disabled }) => ({
  padding: "12px",
  fontSize: "14px",
  fontWeight: "500",
  pointerEvents: disabled ? "none" : "auto",
  background: disabled
    ? "rgba(255, 255, 255, 0.12)"
    : "linear-gradient(90.73deg, #5CFF80 2.09%, #BEF856 34.92%)",
}));

const TrustPaymentForm = ({
  PaymentButton,
  handleRedirectPayment,
  isLoading,
}) => {
  const { trustPaymentCoin } = useContext(AppContext);

  const validationSchema = yup.object().shape({
    postcode: yup
      .string()
      .required("Postcode is required.")
      .matches(/^[a-zA-Z0-9\s-]{1,10}$/, "Invalid postcode format."),
    billingTown: yup
      .string()
      .required("Billing town is required.")
      .max(100, "Billing town should not exceed 100 characters."),
    billingStreet: yup
      .string()
      .required("Billing street is required.")
      .max(200, "Billing street should not exceed 200 characters."),
    currency: yup.mixed().required("Currency is required."),
  });

  return (
    <FormContainer>
      <Formik
        initialValues={{
          postcode: "",
          billingTown: "",
          billingStreet: "",
          currency: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleRedirectPayment(values)}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          touched,
          values,
          setFieldValue,
        }) => (
          <Form>
            <Typography variant="body2" color="primary" mt={2} mb={1}>
              Select Country
            </Typography>
            <Autocomplete
              freeSolo
              options={trustPaymentCoin ? [...trustPaymentCoin].sort() : []}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.name
              }
              onChange={(event, newValue) => {
                setFieldValue("currency", newValue ? newValue : "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Select country"
                  color="secondary"
                  onBlur={handleBlur}
                  error={touched.currency && !!errors.currency}
                />
              )}
              noOptionsText="No matching coin found"
            />
            <FormHelperText error>
              {touched.currency && errors.currency}
            </FormHelperText>

            <Typography variant="body2" color="primary" mt={1} mb={1}>
              Postcode
            </Typography>
            <TextField
              fullWidth
              name="postcode"
              variant="outlined"
              placeholder="Enter postcode"
              color="secondary"
              value={values.postcode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.postcode && !!errors.postcode}
            />
            <FormHelperText error>
              {touched.postcode && errors.postcode}
            </FormHelperText>

            <Typography variant="body2" color="primary" mt={1} mb={1}>
              Billing Town
            </Typography>
            <TextField
              fullWidth
              name="billingTown"
              variant="outlined"
              placeholder="Enter billing town"
              color="secondary"
              value={values.billingTown}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.billingTown && !!errors.billingTown}
            />
            <FormHelperText error>
              {touched.billingTown && errors.billingTown}
            </FormHelperText>

            <Typography variant="body2" color="primary" mt={1} mb={1}>
              Billing Street
            </Typography>
            <TextField
              fullWidth
              name="billingStreet"
              variant="outlined"
              placeholder="Enter billing street"
              color="secondary"
              value={values.billingStreet}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.billingStreet && !!errors.billingStreet}
            />
            <FormHelperText error>
              {touched.billingStreet && errors.billingStreet}
            </FormHelperText>

            <PaymentButton
              variant="contained"
              color="primary"
              type="submit"
              sx={{ minWidth: "150px", marginTop: "20px" }}
              disabled={isLoading}
            >
              Proceed {isLoading && <ButtonCircularProgress />}
            </PaymentButton>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default TrustPaymentForm;
