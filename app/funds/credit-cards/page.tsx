import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle, CreditCard, Shield, Percent, Gift } from "lucide-react"

export default function CreditCardsPage() {
  const creditCards = [
    {
      name: "HDFC Student Credit Card",
      features: ["No annual fee for first year", "Cashback on online purchases", "International usage"],
      limit: "₹50,000 - ₹2,00,000",
      cashback: "Up to 5%",
      benefits: ["Airport lounge access", "Fuel surcharge waiver", "Online shopping rewards"],
    },
    {
      name: "SBI Student Plus Card",
      features: ["Low interest rates", "Easy approval", "Reward points"],
      limit: "₹25,000 - ₹1,50,000",
      cashback: "Up to 3%",
      benefits: ["Movie ticket discounts", "Dining offers", "Travel benefits"],
    },
    {
      name: "ICICI Student Credit Card",
      features: ["Instant approval", "Digital card", "Contactless payments"],
      limit: "₹30,000 - ₹1,00,000",
      cashback: "Up to 4%",
      benefits: ["E-commerce discounts", "Utility bill payments", "EMI options"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <CreditCard className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Student Credit Cards</h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">Build Your Credit History While Studying</p>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            Get specially designed credit cards for students with attractive benefits, cashback offers, and easy
            approval process.
          </p>
          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold px-8 py-4">
            Apply Now
          </Button>
        </div>
      </section>

      {/* Credit Cards Comparison */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Compare Student Credit Cards</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {creditCards.map((card, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{card.name}</h3>
                  <div className="space-y-4 mb-6">
                    <div>
                      <span className="text-sm text-gray-600">Credit Limit</span>
                      <p className="font-semibold text-lg">{card.limit}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Cashback</span>
                      <p className="font-semibold text-lg text-green-600">{card.cashback}</p>
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

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Apply for This Card</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Student Credit Cards?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Build Credit History</h3>
                <p className="text-gray-600">Start building your credit score early for future financial needs</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Percent className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Cashback Rewards</h3>
                <p className="text-gray-600">Earn cashback on purchases and save money on expenses</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Gift className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Student Benefits</h3>
                <p className="text-gray-600">Special offers on dining, entertainment, and online shopping</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <CreditCard className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Easy Approval</h3>
                <p className="text-gray-600">Simplified application process designed for students</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6">Apply for Student Credit Card</h2>
          <p className="text-xl mb-8">Get approved in 24-48 hours</p>

          <Card className="bg-white text-gray-900">
            <CardContent className="p-8">
              <div className="grid gap-4">
                <Input placeholder="Full Name" className="text-lg py-3" />
                <Input placeholder="Email Address" type="email" className="text-lg py-3" />
                <Input placeholder="Phone Number" type="tel" className="text-lg py-3" />
                <Input placeholder="College/University" className="text-lg py-3" />
                <Input placeholder="Monthly Income/Allowance" className="text-lg py-3" />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
                  Submit Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
