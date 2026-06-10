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
    name: "TxVeto",
    description:
      "An in-process safety guard for AI agents that enforces budget ceilings, breaks runaway tool-call loops, and applies MCP policy checks before expensive steps execute.",
    stack: [
      "Python",
      "Solidity",
      "JavaScript",
      "TypeScript",
      "MCP",
      "JSON-RPC",
      "Pytest",
    ],
    status: "In Development",
    githubUrl: "https://github.com/hedigardi/TxVeto",
    demoUrl: "https://txveto.hedigardi.com",
  },
  {
    name: "Decentratix",
    description:
      "A production-minded Web3 ticketing platform concept that combines capped secondary pricing, automated organizer royalties, and cryptographically signed dynamic QR verification to enhance fairness, transparency, and event-entry security.",
    stack: ["React", "Next.js", "TypeScript", "Solidity", "Wagmi", "Hardhat"],
    status: "Live",
    githubUrl: "https://github.com/hedigardi/decentratix",
    demoUrl: "https://decentratix.hedigardi.com/",
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
