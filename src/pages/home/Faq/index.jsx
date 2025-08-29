import React, { useState } from "react";
import Accordions from "./Accordions";
import {
  Box,
  Button,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { CgArrowTopRightO } from "react-icons/cg";
const StyledFaqSection = styled(Box)(({ theme }) => ({
  "& .faqMainBox": {
    "& .heading": {
      fontWeight: 500,
      color: "rgba(255, 255, 255, 0.6)",
    },
    "& .description": {
      fontWeight: 400,
      color: "#FFF",
    },
  },
}));
const accordionData = [
  {
    id: 1, // Add unique id
    question: "What is Bitedge? ",
    answer:
      "Bitedge is a cloud-based cryptocurrency trading platform designed to empower beginners with a seamless start in the world of cryptocurrency. Our intelligent tools and technologies provide you with the insights and support needed to make well-informed trading decisions.",
  },
  {
    id: 2,
    question: "How much does Bitedge cost?",
    answer:
      "Bitedge provides a range of subscription packages, each tailored to meet different needs. Our packages vary in terms of the number of positions, supported currencies, market scanning frequency, and the level of support provided. For detailed information on all available packages, please visit our website.",
  },
  {
    id: 3,
    question: "Does Bitedge have access to my funds?",
    answer: "No, Bitedge does not access to your funds.",
  },
  {
    id: 4,
    question: "How do I connect my exchange accounts to Bitedge?",
    answer: `
      <ol style="margin-left: -22px;">
        <li>To connect your exchange accounts to Bitedge, follow these steps:</li>
        <li>Generate API and Secret Keys in your Exchange: You need to generate API keys in your exchange.</li>
        <li>Whitelist Bitedge IP Addresses: You need to whitelist the IP addresses provided in your Bitedge dashboard.</li>
        <li>Add Your Exchange APIs: Link your exchange to Bitedge by entering your API and Secret keys.</li>
        <li>Whitelist Withdrawal Addresses: Generate and whitelist the withdrawal addresses for the exchange you've linked with Bitedge.</li>
       
      </ol>
      <p>For a detailed step-by-step guide, see our GitBook <a style="color: #bef856;" href="https://docs.bitedge.app/" target="_blank">Introduction | Bitedge Guide.</a></p>
    `,
  },

  {
    id: 5,
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time. To avoid being charged for the next billing cycle, you must cancel your subscription at least 4 working days before the monthly renewal date. The cancellation will take effect at the end of the current subscription cycle.",
  },
  // Add more FAQs as needed
];

const AccordionContainer = () => {
  const router = useRouter();
  // State to track the currently expanded accordion index
  const [expandedIndex, setExpandedIndex] = useState(0); // Default to the first accordion being open

  const toggleAccordion = (index) => {
    // If the clicked accordion is already open, close it. Otherwise, open it.
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <StyledFaqSection>
      <Container className="arbiSection" maxWidth="md">
        <Box mb={3}>
          <Typography variant="h2" color="primary">
            Frequently Asked <br /> Questions
          </Typography>
        </Box>

        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12}>
            {accordionData.map((data, index) => (
              <Accordions
                key={index}
                data={data}
                index={index}
                expandedIndexes={[expandedIndex]} // Pass the currently expanded index as an array
                toggleAccordion={toggleAccordion}
              />
            ))}
          </Grid>
        </Grid>

        <Box align="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<CgArrowTopRightO />}
            onClick={() => {
              router.push("/faq");
            }}
          >
            Learn More{" "}
          </Button>
        </Box>
      </Container>
    </StyledFaqSection>
  );
};

export default AccordionContainer;
