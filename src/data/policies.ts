export interface PolicyItem {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  tag: string;
  iconName: string;
}

export const POLICIES: PolicyItem[] = [
  {
    id: 1,
    title: 'Ordering Notice',
    shortDesc: 'No order will be accepted without prior 1-2 days notice.',
    fullDesc: 'To ensure each bespoke hamper and floral arrangement is curated with meticulous attention to detail, we do not accept last-minute rush orders without at least 24 to 48 hours advance notice.',
    tag: 'Notice & Lead Time',
    iconName: 'CalendarClock'
  },
  {
    id: 2,
    title: 'Delivery Timings',
    shortDesc: 'Standard delivery timings are from 1:00 PM to 10:00 PM.',
    fullDesc: 'Our dedicated surprise dispatch riders execute delivery rounds carefully between 1:00 PM and 10:00 PM. Specific slot preferences within this window are prioritized based on route availability.',
    tag: 'Schedule',
    iconName: 'Clock'
  },
  {
    id: 3,
    title: 'Special Deliveries',
    shortDesc: 'For special deliveries (e.g., 12 AM birthday surprises), extra charges will be applied.',
    fullDesc: 'Want to strike right at the stroke of midnight? We love pulling off 12:00 AM midnight birthday and anniversary door surprises! An additional special night rider surcharge applies (+PKR 500 - 750 depending on area).',
    tag: 'Surprise Midnight',
    iconName: 'Sparkles'
  },
  {
    id: 4,
    title: 'Delivery Cost',
    shortDesc: 'There will be no discount on the delivery cost.',
    fullDesc: 'Delivery fees are direct disbursements to dedicated courier and fuel riders who safely transport delicate glass flacons, fresh florals, and luxury boxes upright and intact. Hence delivery charges are non-negotiable.',
    tag: 'Transparent Fees',
    iconName: 'Scale'
  },
  {
    id: 5,
    title: 'Order Details',
    shortDesc: 'Orders must be clearly mentioned before sending payment.',
    fullDesc: 'Kindly provide exact recipient details, address landmarks, recipient phone numbers, customized note text, and preferred delivery date. In case of any confusion, please verify the summary invoice before sending payment.',
    tag: 'Precision',
    iconName: 'FileText'
  },
  {
    id: 6,
    title: 'Payment Policy',
    shortDesc: 'Full payment is required in advance. No refunds after dispatch.',
    fullDesc: 'Because our gift boxes are handcrafted, personalized, and contain perishable chocolates/florals, 100% advance payment via Bank Transfer, JazzCash, or EasyPaisa is mandatory before procurement starts. Once dispatched, cancellations cannot be refunded.',
    tag: 'Advance Payment',
    iconName: 'Wallet'
  },
  {
    id: 7,
    title: 'Service Value',
    shortDesc: 'We invest time, energy, effort, and fuel costs to arrange your surprise.',
    fullDesc: 'We lovingly invest immense creative time, artistic effort, hand-tying ribbons, sourcing fresh florals, and fuel expenses to make your loved one smile. We politely request clients to respect our craftsmanship pricing without bargaining.',
    tag: 'Craft & Care',
    iconName: 'HeartHandshake'
  },
  {
    id: 8,
    title: 'New Customer Discount',
    shortDesc: 'A sufficient discount is available for new customers.',
    fullDesc: 'Ordering with The Gifts Gallery for the very first time? Use code NEWTGG at checkout or mention it in your WhatsApp chat to unlock an exclusive welcome discount on your first bespoke hamper!',
    tag: 'Welcome Privilege',
    iconName: 'Key'
  },
  {
    id: 9,
    title: 'Communication',
    shortDesc: 'Please wait at least 3-4 hours after delivering as a message.',
    fullDesc: 'While our studio team is actively wrapping hampers, assembling ribbons, or on route with midnight deliveries, our WhatsApp response time may take 3 to 4 hours. Rest assured, every inquiry is answered in sequence.',
    tag: 'Studio Hours',
    iconName: 'MessageSquare'
  }
];

export const PAYMENT_METHODS = {
  bank: {
    name: 'Meezan Bank / Bank Alfalah Transfer',
    accountTitle: 'The Gifts Gallery PK',
    accountNumber: '0201-0105829101',
    iban: 'PK12MEZN0002010105829101',
    instructions: 'Please take a screenshot of the transfer receipt and attach it to your WhatsApp or DM confirmation.'
  },
  jazzcash: {
    name: 'JazzCash Mobile Account',
    accountTitle: 'The Gifts Gallery',
    number: '0300-1234567',
    instructions: 'Send via JazzCash App or retailer and share the TID / screenshot.'
  },
  easypaisa: {
    name: 'EasyPaisa Wallet',
    accountTitle: 'The Gifts Gallery',
    number: '0345-9876543',
    instructions: 'Send via EasyPaisa and share transaction ID.'
  }
};
