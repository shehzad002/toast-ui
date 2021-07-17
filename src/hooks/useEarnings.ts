import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../toast/utils'
import useToast from './useToast'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const toast = useToast()
  const masterChefContract = getMasterChefContract(toast)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, toast])

  useEffect(() => {
    if (account && masterChefContract && toast) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, toast])

  return balance
}

export default useEarnings
