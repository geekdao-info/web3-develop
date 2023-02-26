export interface SITE {
  title: string,
  url: string,
  image: string,
  description: string,
  key: string
}

export interface SITES {
  [key: string]: SITE[]
}

export const websites: SITES = {
  'links': [
    {
      title: 'thirdweb',
      url: 'https://thirdweb.com/',
      image: 'https://portal.thirdweb.com/img/thirdweb-logo-transparent-black.svg',
      description: 'thirdweb is a complete web3 development framework that provides everything you ne',
      key: 'thirdweb'
    },
    {
      title: 'wagmi.sh',
      url: 'https://wagmi.sh/',
      image: 'https://avatars.githubusercontent.com/u/58292274?s=400&u=a46b463019b90c071a27243c2add5d0177b482e4&v=4',
      description: 'wagmi 是一个 React Hook 的集合，包含了你与以太坊交互所需的一切。wagmi 使连接钱包、显示 ENS 和余额信息、签署消息、与合约交互等变得简单——所有这些都有缓存、重复请求降重和持久化',
      key: 'wagmi'
    }
  ],
  'articles': [
    {
      title: 'Web3 DApp 最佳编程实践指南',
      url: 'https://guoyu.mirror.xyz/RD-xkpoxasAU7x5MIJmiCX4gll3Cs0pAd5iM258S1Ek',
      image: 'https://avatars.githubusercontent.com/u/58292274?s=400&u=a46b463019b90c071a27243c2add5d0177b482e4&v=4',
      description: '这篇文章将会涉及到开发一个 DApp 所涵盖的几乎所有方面内容。包括：认识 DApp 技术栈、智能合约编码、开发工作流与单元测试、前端与客户端开发、开发、测试与生产环境调试、服务端编码与集成、合约部署方案 L1s & L2、去中心化储存方案等',
      // author: '郭宇',
      key: 'guoyu'
    }
  ]
}