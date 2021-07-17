import { useCallback } from 'react'

import useToast from './useToast'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../toast/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const toast = useToast()
  const masterChefContract = getMasterChefContract(toast)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, toast],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
