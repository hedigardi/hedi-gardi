export type Project = {
  name: string;
  description: string;
  stack: string[];
  status: "Live" | "In Development" | "Archived";
  githubUrl?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    name: "FjordSync",
    description:
      "A Next.js SaaS that converts Stripe balance transaction CSV exports into ERP-ready accounting files for Norwegian workflows, with AAL2 MFA, admin controls, and robust export logic for Fiken and Tripletex.",
    stack: [
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "Docker",
      "Vitest",
      "Playwright",
    ],
    status: "In Development",
    demoUrl: "https://fjordsync.hedigardi.com/",
  },
  {
    name: "Receiptuary",
    description:
      "Digital receipt verification with browser-side hashing and web3-friendly validation flows.",
    stack: ["Next.js", "Viem", "Wagmi", "Account Abstraction"],
    status: "Live",
    githubUrl: "https://github.com/hedigardi/receiptuary",
    demoUrl: "https://receiptuary.hedigardi.com/",
  },
  {
    name: "BitcoinStart Nordics",
    description:
      "A practical education platform helping Nordic users understand and adopt Bitcoin with confidence.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Contentful"],
    status: "Live",
    githubUrl: "https://github.com/hedigardi/bitcoinstart",
    demoUrl: "https://bitcoinstart.no",
  },
  {
    name: "Block & Learn",
    description:
      "Block & Learn delivers clear, honest education in Bitcoin, blockchain, and digital finance to help more people build financial freedom through knowledge.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN UI",
      "Genkit",
      "Lucide React",
    ],
    status: "Live",
    githubUrl: "https://github.com/hedigardi/blockandlearn",
    demoUrl: "https://blockandlearn.com/",
  },
  {
    name: "Voting DApp",
    description:
      "A transparent on-chain voting application with a clean UX and robust smart contract integration.",
    stack: ["Solidity", "Hardhat", "React", "Ethers"],
    status: "Live",
    githubUrl: "https://github.com/hedigardi/voting-dapp",
    demoUrl: "https://votingdapp.hedigardi.com/",
  },
];
