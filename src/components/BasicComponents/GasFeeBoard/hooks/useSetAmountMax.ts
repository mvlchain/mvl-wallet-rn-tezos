import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
const useSetAmount = (fee: string) => {
  const { value, setBody } = transactionRequestStore();
};

export default useSetAmount;
