"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { useState } from 'react'
import { ethers } from 'ethers'
import { BrowserProvider } from 'ethers'


function Home () {
  const [errorMessage, SetErrorMessage] = useState<string>("");
  const [defaultAccount, setDefaultAccount] = useState<string>("");
  const [balance, setBalance] = useState<any>();
  
  const connectWalletHandler = () => {
    const provider = new BrowserProvider(window.ethereum)
    
    if (window.ethereum) {
        provider.send("eth_requestAccounts", [])
        .then(async () => {
          const newAccount = await provider.getSigner();
          accountChangeHandler(newAccount);
        })
    } else {
      SetErrorMessage('Please install MetaMask')
    }
  }

  const accountChangeHandler = async (newAccount:any) => {
    const provider = new BrowserProvider(window.ethereum)
    const address = await newAccount.getAddress();
    setDefaultAccount(address);
    const rawbalance = await provider.getBalance(newAccount);
    const balance = Number(rawbalance) * 3500/1e18;
    setBalance(balance);
    // await getuserBalance(address);
  }

  // const getuserBalance = async (address: string) => {
  //   const provider = new BrowserProvider(window.ethereum);

  //   const balance = await provider.getBalance(address)
  //   setBalance(balance);
  // }

  console.log("defaultAccount", defaultAccount);
  console.log("balance", balance);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mt-4">Click on the button to connect to the metamask wallet</h2>
      <br />
    <Button variant="outline" size="lg" onClick={connectWalletHandler}>
      Click Me
    </Button>
    <br />

    <div>Wallet Address: {defaultAccount}</div>
    <br />
    <div>Wallet balance: $ {balance}</div>

    </div>
  )
}

export default Home