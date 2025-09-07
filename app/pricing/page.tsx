export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Premium Subscription Plans</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock advanced features and get personalized guidance for your study abroad journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic</h3>
            <div className="text-4xl font-bold text-blue-600 mb-6">Free</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Basic university search
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Limited course recommendations
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Basic AI chatbot support
              </li>
            </ul>
            <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium">Current Plan</button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white relative">
            <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
              70% OFF
            </div>
            <h3 className="text-2xl font-bold mb-4">Premium</h3>
            <div className="mb-6">
              <div className="text-4xl font-bold">
                ₹299
                <span className="text-lg line-through opacity-70 ml-2">₹999</span>
              </div>
              <div className="text-sm opacity-80">per month</div>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span>
                Advanced AI counseling
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span>
                Unlimited university search
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span>
                Personalized recommendations
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span>
                Priority support
              </li>
            </ul>
            <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Get Premium
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro</h3>
            <div className="text-4xl font-bold text-purple-600 mb-6">
              ₹599
              <span className="text-lg text-gray-500 ml-2">per month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Everything in Premium
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                1-on-1 counselor sessions
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Application assistance
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Visa guidance
              </li>
            </ul>
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
              Get Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
