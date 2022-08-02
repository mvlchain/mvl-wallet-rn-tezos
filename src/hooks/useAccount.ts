export const useAccount = () => {
  // @TODO 데이터 연결

  const list = [
    {
      iconUrl: '',
      name: 'Wallet 1',
      address: '0xE4de5635351F5fa0e1e8b85642B25605',
    },
    {
      iconUrl: '',
      name: 'Wallet 2',
      address: '0xE4de5635351F5fa0e1e8b85642B25605',
    },
  ];

  return list;
};

export const useCurrentAccount = () => {
  // @TODO 데이터 연결

  const current = {
    iconUrl: '',
    name: 'Wallet 1',
    address: '0xE4de5635351F5fa0e1e8b85642B25605',
  };

  return current;
};
