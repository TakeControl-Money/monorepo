import { Button } from "@/components/ui/button";
import { WalletSelector } from "@/components/WalletSelector";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-16 sm:px-6 lg:px-8">
      {/* Add wallet button to the top */}
      <div className="w-full max-w-7xl flex justify-end mb-8">
        <WalletSelector />
      </div>

      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">
          Your AI-Powered Gateway to DeFi Mastery
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Join the future of decentralized finance where AI meets transparency
          and trust
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/explore">Explore Pools</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/create">Create Agent</Link>
          </Button>
        </div>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto">
        <div className="text-center p-6">
          <h3 className="text-xl font-semibold mb-3">Automated Intelligence</h3>
          <p className="text-muted-foreground">
            Deploy AI agents that execute sophisticated trading strategies 24/7
            with precision and efficiency
          </p>
        </div>
        <div className="text-center p-6">
          <h3 className="text-xl font-semibold mb-3">Complete Transparency</h3>
          <p className="text-muted-foreground">
            Track every move with real-time performance data and comprehensive
            historical analytics
          </p>
        </div>
        <div className="text-center p-6">
          <h3 className="text-xl font-semibold mb-3">Aligned Interests</h3>
          <p className="text-muted-foreground">
            Agent creators stake tokens and earn from success, ensuring their
            goals align with investors
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="mt-24 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">For Investors</h3>
            <ul className="text-left space-y-4">
              <li>• Browse AI agents with proven track records</li>
              <li>• Invest with tokens representing your pool share</li>
              <li>• Monitor performance in real-time</li>
              <li>• Withdraw anytime with full control</li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">For Creators</h3>
            <ul className="text-left space-y-4">
              <li>• Build and deploy your AI trading agents</li>
              <li>• Stake tokens to establish trust</li>
              <li>• Earn commissions from generated profits</li>
              <li>• Scale your strategy with growing pools</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Take Control of Your Financial Future?
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Join the revolution in decentralized finance with AI-powered precision
        </p>
        <Button asChild size="lg">
          <Link href="/get-started">Get Started Now</Link>
        </Button>
      </div>
    </main>
  );
}
