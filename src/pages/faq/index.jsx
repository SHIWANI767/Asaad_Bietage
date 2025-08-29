import React, { useState } from "react";
import Accordions from "./Accordions";

import { Box, Container, Grid, styled, Typography } from "@mui/material";
import HomeLayout from "@/layout/HomeLayout";

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
      <p>For a detailed step-by-step guide, see our GitBook<a style="color: #bef856;" href="https://docs.bitedge.app/" target="_blank">Introduction | Bitedge Guide.</a></p>
    `,
  },

  {
    id: 5,
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time. To avoid being charged for the next billing cycle, you must cancel your subscription at least 4 working days before the monthly renewal date. The cancellation will take effect at the end of the current subscription cycle.",
  },

  {
    id: 6,
    question: "Is Bitedge a guaranteed way to make profits?",
    answer:
      "No, Bitedge is not a guaranteed way to make profits and is not a financial product.",
  },

  {
    id: 7,
    question: "How can I contact Bitedge support?",
    answer:
      "You can contact Bitedge billing support by emailing us at support@Bitedge.app.",
  },

  {
    id: 8,
    question: "Can I use multiple exchange accounts with Bitedge?",
    answer:
      "Yes, you can use multiple exchange accounts with Bitedge. Our platform supports linking and managing multiple accounts, allowing you to diversify your trading strategies and streamline your trading activities across different exchanges. The number of exchanges available depends on your subscription plan.",
  },

  {
    id: 9,
    question: "What is Smart Limit Order?",
    answer:
      "The Smart Limit Order is a unique option that sets Bitedge apart. This feature actively searches for alternative iterations to reduce pending orders, lowering the risk for users. Users retain full control and are responsible for all trading decisions made using Bitedge.",
  },

  {
    id: 10,
    question: "What is Quantum Loop?",
    answer:
      "Quantum Loop is a sophisticated strategy that operates within a single exchange. It involves a sequence of three trades across chosen trading pairs. Bitedge initiates the process by converting the initial currency to a second currency, then to a third currency, and finally back to the initial currency. This strategy aims to profit from the exchange rate discrepancies among different trading pairs. Users retain full control and are responsible for all trading decisions made using Bitedge",
  },
  {
    id: 11,
    question: "What is Quantum Bridge?",
    answer:
      "Quantum Bridge allows Bitedge to identify and capitalise on price discrepancies between different trading pairs within the same exchange. For example, Bitedge might identify an opportunity to buy Bitcoin with Ethereum and then sell Bitcoin for USDT. By doing so, users can profit from the price difference between these pairs, optimising the trading process for maximum gain. Users retain full control and are responsible for all trading decisions made using Bitedge.",
  },

  {
    id: 12,
    question: "What is Quantum Flow?",
    answer:
      "Quantum Flow enables Bitedge to identify and exploit price discrepancies for the same asset across different exchanges. For instance, if Bitcoin is trading at a higher price on Exchange A compared to Exchange B, Bitedge will buy Bitcoin on Exchange B and sell it on Exchange A. This strategy allows users to profit from the difference in price between the two exchanges. Users retain full control and are responsible for all trading decisions made using Bitedge.",
  },

  {
    id: 13,
    question: "Do I need to pay before I can see profit paths?",
    answer:
      "No, you do not need to pay before you can see profit paths. Bitedge provides access to profit path insights without requiring a paid account, allowing you to explore potential trading opportunities before committing to a subscription.",
  },

  {
    id: 14,
    question: "What is a profit path?",
    answer:
      "A profit path is a visual representation or forecast of potential trading outcomes based on your current strategy and market conditions. It helps you understand different scenarios and possible profit trajectories, enabling you to make more informed trading decisions.",
  },

  {
    id: 15,
    question:
      "What should I consider before using a crypto trading tool like Bitedge?",
    answer:
      "Before using Bitedge, consider that cryptocurrency trading is inherently volatile, with frequent market swings and changes. Therefore, it’s important to assess your market knowledge and risk tolerance to ensure that the platform’s strategies align with your trading goals. Automated trading, while powerful, is not flawless and can encounter issues that may result in losses. Additionally, understand the associated costs, and regularly review your performance to stay aligned with your objectives.",
  },

  {
    id: 16,
    question: "How do I make sure that my API keys are safe?",
    answer: `
    <ol style="margin-left: -22px;">
     <p>To ensure your API keys are safe, follow these steps:</p>
      <li>Whitelist IP Addresses: Restrict the use of your API keys by whitelisting specific IP addresses. This
limits access to your API keys to only the approved IPs, enhancing security.</li>
      <li>Keep Keys Confidential: Do not share your API keys with anyone and avoid exposing them in public
or unsecured environments.</li>
    
      <li>Monitor Access: Keep an eye on access logs for any unusual activity or unauthorised access
attempts.</li>
      <li>Enable 2FA: Enable 2FA on your bitedge account.</li>
     
    </ol>
   
  `,
  },

  {
    id: 17,
    question: "Can I cancel open trade?",
    answer:
      "Bitedge is an execution software, and the trades are executed in your exchange. You can cancel any trade at any time using bitedge or by logging in to your exchange.",
  },

  {
    id: 18,
    question: "Will I be notified if the trades are being closed?",
    answer:
      "Yes, you will be notified if trades are being closed on Bitedge. We will send you notifications to keep you informed about the status of your trades.",
  },

  {
    id: 19,
    question: "What is Sniper mode?",
    answer:
      "Sniper Auto Trade is an advanced feature which capitalises on maximum available trade opportunities simultaneously, leveraging your wallet balance across multiple exchanges for optimal performance. Users retain full control and are responsible for all trading decisions made using Bitedge.",
  },

  {
    id: 20,
    question: "What is Simple Auto Mode?",
    answer:
      "Simple Auto Mode handles one trade at a time, ensuring straightforward and efficient transactions across multiple exchanges. Users retain full control and are responsible for all trading decisions made using Bitedge.",
  },

  {
    id: 21,
    question: "Can I take trades manually?",
    answer:
      "Yes, you can take trades manually on Bitedge. The platform allows you to execute trades manually in addition to using user configured automated strategies.",
  },

  {
    id: 22,
    question:
      "22. What will happen to auto or sniper mode if I run out of available balance?",
    answer:
      "If your account runs out of available balance, both auto and sniper modes will stop working immediately. You will need to add funds to your account and manually restart the Auto/Sniper mode. Users may receive an email notification when their balance is low.",
  },
  // Add more FAQs as needed
];

const AccordionContainer = () => {
  // State to track the currently expanded accordion index
  const [expandedIndex, setExpandedIndex] = useState(0); // Default to the first accordion being open

  const toggleAccordion = (index) => {
    // If the clicked accordion is already open, close it. Otherwise, open it.
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <StyledFaqSection>
      <Container className="rotaeBox main-sectionGap1" maxWidth="md">
        <Box mb={3} align="center">
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
      </Container>
    </StyledFaqSection>
  );
};

AccordionContainer.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default AccordionContainer;
