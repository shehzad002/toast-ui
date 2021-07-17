import { useCallback } from 'react'

import useToast from './useToast'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../toast/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const toast = useToast()
  const masterChefContract = getMasterChefContract(toast)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, toast])

  return { onReward: handleReward }
}

export default useReward
