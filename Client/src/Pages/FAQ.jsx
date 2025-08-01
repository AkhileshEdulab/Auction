import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme, useMediaQuery } from '@mui/material';

// --- Tab Panel ---
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ px: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

// --- FAQ Data ---
const faqData = {
  General: [
    { question: 'What is an Auction?', answer: 'Auctions allow items to be sold to the highest bidder. Participants bid on the item until the highest bid is reached within a set timeframe. The highest bidder wins and pays the bid amount.' },
    { question: 'How do auctions work?', answer: 'An auction is a process where buyers place bids on an item, and the highest bidder wins. The seller lists the item, bidders compete by offering higher prices, and when the auction ends, the highest bid gets the item. Payment is then made, and the item is delivered to the winner.' },
    { question: 'What types of auctions are there?', answer: 'English, Dutch, Sealed-bid, Reverse, Vickrey – each differs in bidding and winner selection methods.' },
    { question: 'How can participate in auctions?', answer: 'To participate in an auction, register on the platform, review the items and rules, place your bids during the auction, monitor competing bids, and if you win, complete the payment and receive the item.' },
    { question: 'Can I sell items at auctions?', answer: 'Yes, you can sell items at auctions. Register with the auction house or platform, provide item details, and agree to the terms, including fees and commissions. This process can help you reach a wide audience and achieve competitive prices.' },
    { question: 'What happens if I win auctions?', answer: 'If you win an auction, you must pay the winning bid amount and arrange to receive or collect the item you bought' },
    { question: 'Are there risks associated with buying at auction?', answer: 'Yes, risks include overpaying, buying faulty or misrepresented items, and sometimes limited return or refund options. Always research before bidding!' },
  ],
  Payment: [
    { question: 'What payment methods are accepted?', answer: 'Most auction platforms accept multiple payment methods including credit and debit cards, PayPal, bank transfers, and sometimes digital wallets. Check the platform’s payment policy before bidding to avoid any issues after winning.' },
    { question: 'Are payments refundable?', answer: 'Most auction sales are final unless stated otherwise in the policy.' },
    { question: 'How do I pay after winning an auction?', answer: 'Payment methods vary but usually include credit/debit cards, bank transfers, or digital wallets. Pay within the auction’s deadline.' },
    { question: 'When is payment due after winning an auction?', answer: 'Payment is typically due within a few days after the auction ends, as specified by the auction rules.' },
    { question: 'Can I pay in installments for an auction purchase?', answer: 'Most auctions require full payment upfront, but some platforms may offer installment options.' },
    { question: 'What happens if I don’t pay after winning?', answer: 'You may lose your winning status, be banned from the platform, and could face legal or financial penalties.' },
    { question: 'Are there any extra fees during payment?', answer: 'Yes, some auctions charge buyer’s premiums, taxes, or payment processing fees on top of the final bid.' },
    { question: 'How do I know my payment was successful?', answer: 'The auction platform typically sends a confirmation email or receipt after payment is processed.' },
    { question: 'Can I pay in cash for an auction item?', answer: 'Cash payments may be accepted for in-person auctions but are rarely accepted online.' },
    { question: 'What should I do if I have trouble making a payment?', answer: 'Contact the auctioneer’s customer service immediately to discuss payment options or issues.' },
  ],
  Bidding: [
    { question: 'How can I participate in auctions?', answer: 'To participate in auctions, create an account on the auction platform, verify your details, browse available items, and follow the bidding rules to place your bids.' },
    { question: 'What happens if I win an auction?', answer: 'You’ll receive payment instructions and item delivery details.' },
    { question: 'Can I sell items at auctions?', answer: 'Yes, register as a seller and list your items.' },
    { question: 'Are there risks associated with buying at auction?', answer: 'Yes, items are usually sold as-is with no returns.' },
    { question: 'How do I place a bid?', answer: 'Click the “Bid” button and enter your amount during the auction.' },
    { question: 'Can I cancel my bid?', answer: 'Most platforms don’t allow bid cancellation, so bid carefully.' },
    { question: 'Is there a minimum bid amount?', answer: 'Yes, each auction sets a starting or minimum bid.' },
    { question: 'What is a reserve price?', answer: 'A reserve price is the minimum amount the seller is willing to accept.' },
    { question: 'How will I know if I’m the highest bidder?', answer: 'The platform will notify you in real-time or via email.' },
    { question: 'What is a proxy bid?', answer: 'A proxy bid lets the system automatically bid for you up to your maximum.' },
    { question: 'What happens if there’s a tie bid?', answer: 'The first person who placed the highest bid usually wins in case of a tie.' },
  ],
};

const FAQ = () => {
  const categories = Object.keys(faqData);
  const [value, setValue] = useState(0);
  const [expandedPanel, setExpandedPanel] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="px-4 md:px-20 py-12 w-full">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Frequently Asked <em className="italic text-gray-500">Questions</em>
        </h2>

        <Box
          sx={{
            flexGrow: 1,
            bgcolor: 'background.paper',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            minHeight: 400,
            gap:4
          }}
        >
          <Tabs
            orientation={isMobile ? 'horizontal' : 'vertical'}
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons={isMobile ? 'auto' : false}
            allowScrollButtonsMobile
            value={value}
            onChange={handleTabChange}
            aria-label="FAQ categories"
            TabIndicatorProps={{
              style: {
                backgroundColor: '#ef4444',
              },
            }}
            sx={{
              borderRadius: 2,
              p: 2,
              borderRight: isMobile ? 0 : 1,
              borderBottom: isMobile ? 1 : 0,
              borderColor: 'divider',
              height: isMobile ? '100%' : 420,
              backgroundColor: '#fef3c7',
              overflowY: 'auto',
              overflowX: 'hidden',
              minWidth: isMobile ? '100%' : '300px',
              mb: isMobile ? 2 : 0,
              
            }}
          >
            {categories.map((cat, index) => (
              <Tab
                label={cat}
                key={cat}
                {...a11yProps(index)}
                sx={{
                  mb: isMobile ? 0 : 3,
                  fontSize: isMobile ? '0.95rem' : '1.1rem',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  '&.Mui-selected': {
                    color: '#ef4444',
                  },
                }}
              />
            ))}

            <div className="hidden sm:block bg-purple-100 p-4 text-center mt-6">
              <p className="font-semibold mb-2">Ask the help community<br />write now!</p>
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-full border border-teal-400 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0l-4 4m4-4l-4-4m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-500">To Send Mail</p>
              <a href="mailto:info@example.com" className="text-sm font-bold text-gray-800">info@example.com</a>
            </div>
          </Tabs>

          <Box sx={{ flexGrow: 1 }}>
            {categories.map((cat, index) => (
              <TabPanel value={value} index={index} key={cat}>
                {faqData[cat].map((faq, idx) => {
                  const panelId = `${cat}-panel-${idx}`;
                  return (
                    <Accordion
                      key={idx}
                      expanded={expandedPanel === panelId}
                      onChange={() =>
                        setExpandedPanel(expandedPanel === panelId ? false : panelId)
                      }
                      sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${panelId}-content`}
                        id={`${panelId}-header`}
                      >
                        <Typography variant="subtitle1" fontWeight="bold">
                          {faq.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2" color="text.secondary">
                          {faq.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </TabPanel>
            ))}
          </Box>
        </Box>
      </div>

      <div className="flex flex-col md:flex-row w-full justify-between px-4 py-4 md:px-20 gap-5">
        {/* Card 1 */}
        <div className="relative w-full md:w-[900px] h-36 rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
            src="https://media.istockphoto.com/id/1088251226/photo/senior-couple-bidding-on-an-online-auction.jpg?s=2048x2048&w=is&k=20&c=W3EakVNBDzPZMKdOydA55FbxeyFc4ers5cPE8cdJGZw="
            alt="How to sell"
          />
          <p className="absolute top-2 left-4 text-white font-bold text-lg drop-shadow-md">
            How to sell your items?
          </p>
        </div>

        {/* Card 2 */}
        <div className="relative w-full md:w-[900px] h-36 rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
            src="https://media.istockphoto.com/id/1088251226/photo/senior-couple-bidding-on-an-online-auction.jpg?s=2048x2048&w=is&k=20&c=W3EakVNBDzPZMKdOydA55FbxeyFc4ers5cPE8cdJGZw="
            alt="How to bid"
          />
          <p className="absolute top-2 left-4 text-white font-bold text-lg drop-shadow-md">
            How to bid?
          </p>
        </div>
      </div>
    </>
  );
};

export default FAQ;
