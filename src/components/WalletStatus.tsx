import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Wallet } from 'lucide-react';
import { useUser } from '@civic/auth-web3/react';
import { useAccount, useBalance } from 'wagmi';
import { userHasWallet } from "@civic/auth-web3";
import { toast } from '@/components/ui/sonner';

const WalletStatus: React.FC = () => {
  const userContext = useUser();
  const { address } = useAccount();
  const balance = useBalance({ address });

  const afterLogin = async () => {
    try {
      // Check if the user has a wallet, and create one if not
      if (userContext.user && !userHasWallet(userContext)) {
        await userContext.createWallet();
      }
      if (userContext.user) {
        toast.success('Wallet created successfully!');
        console.log('Wallet created successfully:', userContext.user);
      } else {
        toast.error('Failed to create wallet');
        console.log('Failed to create wallet');
      }
    } catch (error) {
      console.log('Error in afterLogin:', error);
      toast.error(`Error creating wallet, ${error}`);
    }
  };

  // Only show component if user is logged in
  if (!userContext.user) return null;

  return (
    <div className='fixed top-20 right-8 z-10 max-w-xs'>
      <div className='flex'>
        {!userHasWallet(userContext) &&
          <div className="p-4 rounded-lg border bg-card shadow-md">
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                </div>
                <span className="text-sm font-medium">Wallet Setup</span>
              </div>
              
              <p className="text-xs text-muted-foreground">Create a blockchain wallet to enable payments and secure your health data.</p>
              
              <Button 
                onClick={afterLogin} 
                className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white"
                size="sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                Create Wallet
              </Button>
            </div>
          </div>
        }
        {userHasWallet(userContext) && 
          <div className="p-4 rounded-lg border bg-card shadow-md">
            <div className="space-y-2">
              <div className="flex items-center">
                <Wallet className="h-5 w-5 text-primary mr-2" />
                <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                  <Check className="h-3 w-3 text-green-500" />
                  
                </div>
               
                <span className="text-sm font-medium">Wallet Connected</span>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Wallet Address</p>
                <div className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                    {userContext.ethereum.address.substring(0, 6)}...{userContext.ethereum.address.substring(userContext.ethereum.address.length - 4)}
                  </code>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => {
                      navigator.clipboard.writeText(userContext.ethereum.address);
                      toast.success("Address copied to clipboard");
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </Button>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground">Balance</p>
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {balance?.data
                      ? `${(BigInt(balance.data.value) / BigInt(1e18)).toString()} ${balance.data.symbol}`
                      : "Loading..."}
                  </span>
                  {(balance?.data && BigInt(balance.data.value) === BigInt(0)) && (
                    <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                      Low balance
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default WalletStatus;