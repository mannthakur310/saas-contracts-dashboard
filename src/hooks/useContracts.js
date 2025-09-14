import { useContext } from 'react'
import { ContractsContext } from '../context/ContractsContext.js'

export function useContracts() {
  return useContext(ContractsContext)
}
