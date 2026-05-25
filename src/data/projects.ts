export type Project = {
  name: string;
  description: string;
  stack: string[];
  status: "Live" | "In Development" | "Archived";
  githubUrl: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    name: "BitcoinStart Nordics",
    description:
      "A practical education platform helping Nordic users understand and adopt Bitcoin with confidence.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Contentful"],
    status: "Live",
    githubUrl: "https://github.com/hedigardi",
    demoUrl: "https://hedigardi.com",
  },
  {
    name: "Receiptuary",
    description:
      "Digital receipt verification with browser-side hashing and web3-friendly validation flows.",
    stack: ["Next.js", "Viem", "Wagmi", "Account Abstraction"],
    status: "Live",
    githubUrl: "https://github.com/hedigardi",
    demoUrl: "https://receiptuary.hedigardi.com/",
  },
  {
    name: "Voting DApp",
    description:
      "A transparent on-chain voting application with a clean UX and robust smart contract integration.",
    stack: ["Solidity", "Hardhat", "React", "Ethers"],
    status: "Live",
    githubUrl: "https://github.com/hedigardi",
    demoUrl: "https://votingdapp.hedigardi.com/",
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
];
