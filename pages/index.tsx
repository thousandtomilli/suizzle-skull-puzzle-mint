import type { NextPage } from "next";
import { SignInButton, ethos } from "ethos-connect";
import { useCallback, useEffect, useState } from "react";
import { Disconnect, Fund, Mint, WalletActions } from "../components";
import useScript from '../hooks/useScript';
 
const Home: NextPage = () => {
  useScript('../lib/headbreaker.js');
  useScript('../lib/script.js');    
  const { status, wallet } = ethos.useWallet();

  const [version, setVersion] = useState<number>(0);
  
  const reset = useCallback(() => {
    setVersion(prev => prev + 1)
  }, []);

  useEffect(reset, [wallet?.address, reset])

  return (
    <div className="flex justify-between items-start">
      <div className="p-12 flex-1">Status: {status}</div>

      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex-6">
        {!wallet ? (
          <SignInButton className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            Connect
          </SignInButton>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Solve the Puzzle to Mint
              </h2>
              <h3 className="text-2xl font-extrabold tracking-tight sm:text-2xl">
                Must Fit in Square!
              </h3>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              First, fund this wallet from the Sui faucet:
              <Fund
                version={version}
                reset={reset}
              />
              then
              <div id="autogen-canvas" className="flex flex-col gap-4"></div>
  
              <Mint 
                version={version}
                reset={reset}
              />
              or
              <WalletActions 
                version={version}
                reset={reset}
              />
              or
              <Disconnect reset={reset} />
            </div>
          </div>
        )}
      </div>

      <div className="p-12 flex-1 flex justify-end">
        <ethos.components.AddressWidget />
      </div>
    </div>
  );
};

export default Home;
