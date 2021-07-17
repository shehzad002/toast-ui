import { useCallback } from 'react'

import useToast from './useToast'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../toast/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const toast = useToast()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(toast),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, toast],
  )

  return { onStake: handleStake }
}

export default useStake
