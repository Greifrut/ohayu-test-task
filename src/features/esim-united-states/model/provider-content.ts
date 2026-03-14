import type { PlanDetailItem, StoreResponse } from "./types";

export const mockUnitedStatesStore: StoreResponse = {
  store: [
    {
      bundleCodeAndPriceId: "16a73757ca_430514",
      dataAmountGb: 3,
      durationDays: 14,
      totalAmountCents: 949,
      operators: [
        {
          id: 557,
          provider: "telco_vision",
          country: "US",
          name: "AT&T",
          speed: "5G",
        },
        {
          id: 558,
          provider: "telco_vision",
          country: "US",
          name: "Verizon",
          speed: "5G",
        },
        {
          id: 560,
          provider: "telco_vision",
          country: "US",
          name: "T-Mobile USA",
          speed: null,
        },
      ],
      staticPrices: [
        {
          id: 9796,
          currency: "EUR",
          amountCents: 849,
        },
        {
          id: 9795,
          currency: "USD",
          amountCents: 949,
        },
      ],
      isAllowedToAutoTopUp: true,
    },
    {
      bundleCodeAndPriceId: "ccd97c22fc_430515",
      dataAmountGb: 5,
      durationDays: 30,
      totalAmountCents: 1549,
      operators: [
        {
          id: 557,
          provider: "telco_vision",
          country: "US",
          name: "AT&T",
          speed: "5G",
        },
        {
          id: 558,
          provider: "telco_vision",
          country: "US",
          name: "Verizon",
          speed: "5G",
        },
        {
          id: 560,
          provider: "telco_vision",
          country: "US",
          name: "T-Mobile USA",
          speed: null,
        },
      ],
      staticPrices: [
        {
          id: 9798,
          currency: "EUR",
          amountCents: 1349,
        },
        {
          id: 9797,
          currency: "USD",
          amountCents: 1549,
        },
      ],
      isAllowedToAutoTopUp: true,
    },
    {
      bundleCodeAndPriceId: "7aae8630b8_430516",
      dataAmountGb: 10,
      durationDays: 30,
      totalAmountCents: 2449,
      operators: [
        {
          id: 557,
          provider: "telco_vision",
          country: "US",
          name: "AT&T",
          speed: "5G",
        },
        {
          id: 558,
          provider: "telco_vision",
          country: "US",
          name: "Verizon",
          speed: "5G",
        },
        {
          id: 560,
          provider: "telco_vision",
          country: "US",
          name: "T-Mobile USA",
          speed: null,
        },
      ],
      staticPrices: [
        {
          id: 9800,
          currency: "EUR",
          amountCents: 2099,
        },
        {
          id: 9799,
          currency: "USD",
          amountCents: 2449,
        },
      ],
      isAllowedToAutoTopUp: true,
    },
    {
      bundleCodeAndPriceId: "e5c8a836fd_430719",
      dataAmountGb: 15,
      durationDays: 60,
      totalAmountCents: 3199,
      operators: [
        {
          id: 557,
          provider: "telco_vision",
          country: "US",
          name: "AT&T",
          speed: "5G",
        },
        {
          id: 558,
          provider: "telco_vision",
          country: "US",
          name: "Verizon",
          speed: "5G",
        },
        {
          id: 560,
          provider: "telco_vision",
          country: "US",
          name: "T-Mobile USA",
          speed: null,
        },
      ],
      staticPrices: [
        {
          id: 9802,
          currency: "EUR",
          amountCents: 2779,
        },
        {
          id: 9801,
          currency: "USD",
          amountCents: 3199,
        },
      ],
      isAllowedToAutoTopUp: true,
    },
    {
      bundleCodeAndPriceId: "481640dbad_430517",
      dataAmountGb: 20,
      durationDays: 90,
      totalAmountCents: 3979,
      operators: [
        {
          id: 557,
          provider: "telco_vision",
          country: "US",
          name: "AT&T",
          speed: "5G",
        },
        {
          id: 558,
          provider: "telco_vision",
          country: "US",
          name: "Verizon",
          speed: "5G",
        },
        {
          id: 560,
          provider: "telco_vision",
          country: "US",
          name: "T-Mobile USA",
          speed: null,
        },
      ],
      staticPrices: [
        {
          id: 9804,
          currency: "EUR",
          amountCents: 3449,
        },
        {
          id: 9803,
          currency: "USD",
          amountCents: 3979,
        },
      ],
      isAllowedToAutoTopUp: true,
    },
    {
      bundleCodeAndPriceId: "ed466c686a_430518",
      dataAmountGb: 50,
      durationDays: 90,
      totalAmountCents: 8449,
      operators: [
        {
          id: 557,
          provider: "telco_vision",
          country: "US",
          name: "AT&T",
          speed: "5G",
        },
        {
          id: 558,
          provider: "telco_vision",
          country: "US",
          name: "Verizon",
          speed: "5G",
        },
        {
          id: 560,
          provider: "telco_vision",
          country: "US",
          name: "T-Mobile USA",
          speed: null,
        },
      ],
      staticPrices: [
        {
          id: 9806,
          currency: "EUR",
          amountCents: 7349,
        },
        {
          id: 9805,
          currency: "USD",
          amountCents: 8449,
        },
      ],
      isAllowedToAutoTopUp: true,
    },
  ],
};

export const providerPlanDetailItems: PlanDetailItem[] = [
  {
    id: "operators",
    type: "operators",
    icon: "operators",
    title: "Operators",
    operators: [
      { operator: "AT&T", network: "5G" },
      { operator: "Verizon", network: "5G" },
      { operator: "T-Mobile USA" },
    ],
  },
  {
    id: "sms",
    type: "text",
    icon: "sms",
    title: "Phone number / SMS",
    text: "No, eSIM is data only",
  },
  {
    id: "activation",
    type: "text",
    icon: "activation",
    title: "Activation",
    text: "Activate anytime within 30 days of purchase",
  },
  {
    id: "reinstall",
    type: "text",
    icon: "reinstall",
    title: "Re-installation",
    text: "You can re-install your eSIM up to 5 times on the same device",
  },
  {
    id: "topup",
    type: "text",
    icon: "topup",
    title: "Data top-up",
    text: "Yes, available",
  },
  {
    id: "hotspot",
    type: "text",
    icon: "hotspot",
    title: "Hotspot",
    text: "Yes, you can connect other devices",
  },
];
