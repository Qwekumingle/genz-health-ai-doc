import * as React from 'react';
import { Connector, useChainId, useConnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Wallet, ChevronRight } from 'lucide-react';

export function Connect() {
  const chainId = useChainId();
  const { connectors, connect } = useConnect();
  console.log('connectors:', { connectors });

  // Filter out duplicate connectors by name
  const uniqueConnectors = React.useMemo(() => {
    const seen = new Set();
    return connectors.filter((connector) => {
      const normalizedName = connector.name.toLowerCase();
      if (seen.has(normalizedName)) return false;
      seen.add(normalizedName);
      return true;
    });
  }, [connectors]);

  return (
    <div className="mb-6">
      <div className="p-3 rounded-lg border border-muted bg-muted/30">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Wallet className="h-4 w-4" /> 
          Connect Wallet to Continue
        </h3>
        
        <div className="grid grid-cols-1 gap-2">
          {uniqueConnectors.map((connector) => (
            <ConnectorButton
              key={connector.uid}
              connector={connector}
              onClick={() => connect({ connector, chainId })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ConnectorButton({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector, setReady]);

  

  

  // Map connector names to nicer display names and potential icons
  const getConnectorDetails = (name: string) => {
    console.log('getConnectorDetails:', { name });

    switch (name.toLowerCase()) {
      case 'metamask':
        return { name: 'MetaMask', color: 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100' };
      case 'coinbase wallet':
        return { name: 'Coinbase Wallet', color: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' };
      case 'walletconnect':
        return { name: 'WalletConnect', color: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100' };
      case 'injected':
        return { name: 'Browser Wallet', color: 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100' };
      case 'Civic Wallet':
        return { name: 'Civic Wallet', color: 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' };
      default:
        return { name: connector.name, color: 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100' };
    }
  };

  const details = getConnectorDetails(connector.name);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      // Add a small delay before resetting loading state to avoid flickering
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  return (
    <button
      disabled={!ready || isLoading}
      onClick={handleClick}
      type="button"
      className={`flex items-center justify-between w-full px-3 py-2 rounded-md border transition-colors ${details.color} ${!ready ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span className="font-medium text-sm">{details.name}</span>
      {isLoading ? (
        <div className="h-4 w-4 rounded-full border-2 border-t-transparent animate-spin" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </button>
  );
}

export default Connect;