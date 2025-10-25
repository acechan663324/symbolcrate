import React from 'react';

interface PricingPageProps {
    onSubscribe: (plan: 'monthly' | 'yearly' | '2-year', planName: string) => void;
}

const PricingCard: React.FC<{
    plan: 'monthly' | 'yearly' | '2-year';
    planName: string;
    price: string;
    period: string;
    features: string[];
    onSubscribe: (plan: 'monthly' | 'yearly' | '2-year', planName: string) => void;
    bestValue?: boolean;
}> = ({ plan, planName, price, period, features, onSubscribe, bestValue = false }) => (
    <div className={`relative flex flex-col p-8 rounded-2xl shadow-lg ${bestValue ? 'bg-purple-600 text-white' : 'bg-white text-gray-900'}`}>
        {bestValue && <div className="absolute top-0 -translate-y-1/2 px-4 py-1.5 text-xs font-semibold tracking-wide text-white uppercase transform bg-pink-500 rounded-full">Best Value</div>}
        <h3 className="text-2xl font-semibold leading-7">{planName}</h3>
        <p className="mt-4 flex items-baseline gap-x-2">
            <span className={`text-4xl font-bold tracking-tight ${bestValue ? 'text-white' : 'text-gray-900'}`}>${price}</span>
            <span className={`text-sm font-semibold leading-6 ${bestValue ? 'text-gray-200' : 'text-gray-500'}`}>{period}</span>
        </p>
        <p className={`mt-3 text-sm leading-6 ${bestValue ? 'text-gray-200' : 'text-gray-500'}`}>{planName === 'Monthly' ? 'Billed monthly' : 'Billed once'}</p>
        <ul role="list" className="mt-8 space-y-3 text-sm leading-6">
            {features.map((feature) => (
                <li key={feature} className="flex gap-x-3 items-center">
                    <svg className={`h-6 w-5 flex-none ${bestValue ? 'text-white' : 'text-purple-600'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" /></svg>
                    {feature}
                </li>
            ))}
        </ul>
        <button onClick={() => onSubscribe(plan, planName)} className={`mt-8 block rounded-lg px-3.5 py-2.5 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors ${bestValue ? 'bg-white text-purple-600 hover:bg-gray-100 focus-visible:outline-white' : 'bg-purple-600 text-white shadow-sm hover:bg-purple-700 focus-visible:outline-purple-600'}`}>
            Get Started
        </button>
    </div>
);


const PricingPage: React.FC<PricingPageProps> = ({ onSubscribe }) => {
    const features = [
        "Unlimited nickname copies",
        "Access to all future updates",
        "Unlimited AI nickname generation",
        "Exclusive AI avatar generator",
    ];
    return (
        <div className="w-full max-w-7xl animate-fade-in mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">
                    Find the perfect plan for you
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Unlock premium features and take your creativity to the next level.
                </p>
            </div>
            <div className="isolate grid max-w-md grid-cols-1 gap-8 mx-auto lg:max-w-4xl lg:grid-cols-3">
                <PricingCard 
                    plan="monthly"
                    planName="Monthly"
                    price="3.99"
                    period="/month"
                    features={features}
                    onSubscribe={onSubscribe}
                />
                <PricingCard 
                    plan="yearly"
                    planName="Yearly"
                    price="19.99"
                    period="/year"
                    features={features}
                    onSubscribe={onSubscribe}
                    bestValue={true}
                />
                <PricingCard 
                    plan="2-year"
                    planName="2-Yearly"
                    price="24.99"
                    period="/2 years"
                    features={features}
                    onSubscribe={onSubscribe}
                />
            </div>
             <style>{`
              @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
              .animate-fade-in { animation: fade-in 0.3s ease-out; }
            `}</style>
        </div>
    );
};

export default PricingPage;
