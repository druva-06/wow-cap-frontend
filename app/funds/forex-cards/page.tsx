import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Globe } from "lucide-react"

export default function ForexCardsPage() {
  const forexCards = [
    {
      name: "HDFC Forex Plus Card",
      currencies: ["USD", "EUR", "GBP", "AUD", "CAD"],
      loadLimit: "$10,000",
      features: ["Multi-currency support", "Chip & PIN security", "Online reloading"],
      fees: "₹150 issuance fee",
    },
    {
      name: "ICICI Travel Card",
      currencies: ["USD", "EUR", "GBP", "SGD", "AED"],
      loadLimit: "$5,000",
      features: ["Contactless payments", "Emergency cash", "Travel insurance"],
      fees: "₹199 issuance fee",
    },
    {
      name: "Axis Bank Forex Card",
      currencies: ["USD", "EUR", "GBP", "AUD", "JPY"],
      loadLimit: "$8,000",
      features: ["Zero cross-currency charges", "SMS alerts", "24/7 support"],
      fees: "₹175 issuance fee",
    },
  ]

  const benefits = [
    "Better exchange rates than cash",
    "Secure and convenient payments",
    "Accepted worldwide",
    "Emergency assistance",
    "Online transaction tracking",
    "Multiple currency support",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <Globe className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Forex Cards</h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">Travel Smart with Prepaid Forex Cards</p>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Get the best exchange rates and secure payment options for your international education journey with our
            forex cards.
          </p>
          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-green-800 font-bold px-8 py-4">
            Get Forex Card
          </Button>
        </div>
      </section>

      {/* Forex Cards Comparison */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Compare Forex Cards</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {forexCards.map((card, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{card.name}</h3>

                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="text-sm text-gray-600">Load Limit</span>
                      <p className="font-semibold text-lg">{card.loadLimit}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Issuance Fee</span>
                      <p className="font-semibold text-lg text-green-600">{card.fees}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Supported Currencies</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {card.currencies.map((currency) => (
                          <Badge key={currency} variant="secondary" className="text-xs">
                            {currency}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {card.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700">Apply for This Card</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Forex Cards?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
                  <p className="text-lg font-medium">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-green-500 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold mb-2">Apply Online</h3>
                <p className="text-gray-600">Submit your application with required documents</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-green-500 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold mb-2">Load Money</h3>
                <p className="text-gray-600">Load your card with the required foreign currency</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-green-500 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold mb-2">Activate Card</h3>
                <p className="text-gray-600">Activate your card before traveling abroad</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-green-500 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  4
                </div>
                <h3 className="text-lg font-bold mb-2">Use Abroad</h3>
                <p className="text-gray-600">Use your card for payments and ATM withdrawals</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6">Apply for Forex Card</h2>
          <p className="text-xl mb-8">Get your card delivered in 2-3 working days</p>

          <Card className="bg-white text-gray-900">
            <CardContent className="p-8">
              <div className="grid gap-4">
                <Input placeholder="Full Name" className="text-lg py-3" />
                <Input placeholder="Email Address" type="email" className="text-lg py-3" />
                <Input placeholder="Phone Number" type="tel" className="text-lg py-3" />
                <Input placeholder="Travel Destination" className="text-lg py-3" />
                <Input placeholder="Amount to Load" className="text-lg py-3" />
                <Button className="bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold">
                  Apply for Forex Card
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
