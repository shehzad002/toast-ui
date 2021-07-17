import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../toast/utils'
import useToast from './useToast'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const toast = useToast()
  const masterChefContract = getMasterChefContract(toast)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, toast])

  useEffect(() => {
    if (account && toast) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, toast])

  return balance
}

export default useStakedBalance
