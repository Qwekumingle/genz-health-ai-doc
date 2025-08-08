import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

export function Account() {
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const formattedAddress = formatAddress(address);

  return (
    <div className="mb-4 p-3 rounded-md bg-muted/50 border border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {ensAvatar ? (
            <img 
              alt="ENS Avatar" 
              className="w-10 h-10 rounded-full" 
              src={ensAvatar} 
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
          )}
          <div>
            {address && (
              <p className="font-medium text-sm">
                {ensName
                  ? `${ensName} (${formattedAddress})`
                  : formattedAddress}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              Connected via {connector?.name}
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => disconnect()} 
          className="text-xs h-8 hover:bg-red-500"
        >
          <LogOut className="h-3.5 w-3.5 mr-1.5" />
          Disconnect
        </Button>
      </div>
    </div>
  );
}

function formatAddress(address?: string) {
  if (!address) return null;
  return `${address.slice(0, 6)}…${address.slice(38, 42)}`;
}
