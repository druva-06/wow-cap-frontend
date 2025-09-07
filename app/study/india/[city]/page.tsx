import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MapPin, DollarSign, GraduationCap, Users, Star, Building } from "lucide-react"

const cityData = {
  hyderabad: {
    name: "Hyderabad",
    state: "Telangana",
    nickname: "Cyberabad",
    description: "Major IT hub with excellent educational institutions and growing startup ecosystem",
    averageFees: "₹2,00,000 - ₹15,00,000",
    livingCost: "₹15,000 - ₹25,000/month",
    industries: ["Information Technology", "Biotechnology", "Pharmaceuticals", "Aerospace"],
    popularCourses: ["Computer Science", "MBA", "Biotechnology", "Pharmacy", "Engineering"],
    topColleges: [
      { name: "Indian School of Business (ISB)", ranking: 1, type: "Business School" },
      { name: "University of Hyderabad", ranking: 2, type: "Central University" },
      { name: "IIIT Hyderabad", ranking: 3, type: "Technical Institute" },
      { name: "Osmania University", ranking: 4, type: "State University" },
    ],
    advantages: [
      "Major IT and tech hub",
      "Lower cost of living",
      "Rich cultural heritage",
      "Growing startup ecosystem",
      "Excellent connectivity",
      "Diverse food culture",
    ],
    facilities: [
      "Modern infrastructure",
      "Metro connectivity",
      "International airport",
      "Tech parks and incubators",
      "Healthcare facilities",
      "Entertainment options",
    ],
  },
  bangalore: {
    name: "Bangalore",
    state: "Karnataka",
    nickname: "Silicon Valley of India",
    description: "India's tech capital with world-class educational institutions and vibrant startup culture",
    averageFees: "₹3,00,000 - ₹20,00,000",
    livingCost: "₹20,000 - ₹35,000/month",
    industries: ["Information Technology", "Biotechnology", "Aerospace", "Research & Development"],
    popularCourses: ["Computer Science", "MBA", "Engineering", "Biotechnology", "Design"],
    topColleges: [
      { name: "Indian Institute of Science (IISc)", ranking: 1, type: "Research Institute" },
      { name: "Indian Institute of Management Bangalore", ranking: 2, type: "Business School" },
      { name: "National Institute of Fashion Technology", ranking: 3, type: "Design Institute" },
      { name: "Bangalore University", ranking: 4, type: "State University" },
    ],
    advantages: [
      "Global IT capital",
      "Pleasant weather",
      "Cosmopolitan culture",
      "Innovation ecosystem",
      "Career opportunities",
      "Quality of life",
    ],
    facilities: [
      "Tech parks and campuses",
      "Metro and transport",
      "International airport",
      "Research centers",
      "Healthcare infrastructure",
      "Cultural venues",
    ],
  },
  mumbai: {
    name: "Mumbai",
    state: "Maharashtra",
    nickname: "Financial Capital of India",
    description: "Commercial hub with premier educational institutions and diverse career opportunities",
    averageFees: "₹2,50,000 - ₹25,00,000",
    livingCost: "₹25,000 - ₹45,000/month",
    industries: ["Finance", "Entertainment", "Textiles", "Information Technology", "Pharmaceuticals"],
    popularCourses: ["MBA", "Finance", "Mass Communication", "Fashion Design", "Engineering"],
    topColleges: [
      { name: "Indian Institute of Technology Bombay", ranking: 1, type: "Technical Institute" },
      { name: "Jamnalal Bajaj Institute of Management", ranking: 2, type: "Business School" },
      { name: "Tata Institute of Social Sciences", ranking: 3, type: "Social Sciences" },
      { name: "University of Mumbai", ranking: 4, type: "State University" },
    ],
    advantages: [
      "Financial capital",
      "Entertainment industry",
      "Diverse opportunities",
      "Cosmopolitan culture",
      "Excellent connectivity",
      "Business networks",
    ],
    facilities: [
      "Financial districts",
      "Local train network",
      "International airport",
      "Business centers",
      "Healthcare facilities",
      "Cultural institutions",
    ],
  },
  delhi: {
    name: "Delhi",
    state: "Delhi",
    nickname: "Capital Territory",
    description: "National capital with prestigious universities and government opportunities",
    averageFees: "₹1,50,000 - ₹20,00,000",
    livingCost: "₹18,000 - ₹30,000/month",
    industries: ["Government", "Education", "Information Technology", "Manufacturing", "Tourism"],
    popularCourses: ["Public Administration", "Law", "MBA", "Engineering", "Liberal Arts"],
    topColleges: [
      { name: "University of Delhi", ranking: 1, type: "Central University" },
      { name: "Jawaharlal Nehru University", ranking: 2, type: "Central University" },
      { name: "Indian Institute of Technology Delhi", ranking: 3, type: "Technical Institute" },
      { name: "All India Institute of Medical Sciences", ranking: 4, type: "Medical Institute" },
    ],
    advantages: [
      "National capital",
      "Government opportunities",
      "Rich history and culture",
      "Educational hub",
      "Political center",
      "Cultural diversity",
    ],
    facilities: [
      "Metro connectivity",
      "Government offices",
      "International airport",
      "Museums and monuments",
      "Healthcare facilities",
      "Educational infrastructure",
    ],
  },
  chennai: {
    name: "Chennai",
    state: "Tamil Nadu",
    nickname: "Detroit of India",
    description: "Industrial and educational hub with strong automotive and healthcare sectors",
    averageFees: "₹2,00,000 - ₹18,00,000",
    livingCost: "₹15,000 - ₹28,000/month",
    industries: ["Automotive", "Healthcare", "Information Technology", "Leather", "Textiles"],
    popularCourses: ["Engineering", "Medicine", "MBA", "Automotive Technology", "IT"],
    topColleges: [
      { name: "Indian Institute of Technology Madras", ranking: 1, type: "Technical Institute" },
      { name: "Anna University", ranking: 2, type: "Technical University" },
      { name: "Christian Medical College", ranking: 3, type: "Medical College" },
      { name: "University of Madras", ranking: 4, type: "State University" },
    ],
    advantages: [
      "Automotive capital",
      "Healthcare hub",
      "Cultural heritage",
      "Educational excellence",
      "Industrial growth",
      "Coastal location",
    ],
    facilities: [
      "Industrial corridors",
      "Metro and transport",
      "International airport",
      "Healthcare facilities",
      "Cultural centers",
      "Educational infrastructure",
    ],
  },
  pune: {
    name: "Pune",
    state: "Maharashtra",
    nickname: "Oxford of the East",
    description: "Educational hub with numerous colleges and growing IT sector",
    averageFees: "₹1,80,000 - ₹15,00,000",
    livingCost: "₹12,000 - ₹25,000/month",
    industries: ["Information Technology", "Automotive", "Manufacturing", "Education", "Research"],
    popularCourses: ["Engineering", "MBA", "Computer Science", "Automotive Engineering", "Design"],
    topColleges: [
      { name: "Pune University", ranking: 1, type: "State University" },
      { name: "College of Engineering Pune", ranking: 2, type: "Engineering College" },
      { name: "Symbiosis International University", ranking: 3, type: "Private University" },
      { name: "Film and Television Institute of India", ranking: 4, type: "Specialized Institute" },
    ],
    advantages: [
      "Educational hub",
      "Pleasant climate",
      "Cultural richness",
      "IT growth",
      "Student-friendly",
      "Proximity to Mumbai",
    ],
    facilities: [
      "Educational institutions",
      "IT parks",
      "Airport connectivity",
      "Cultural venues",
      "Healthcare facilities",
      "Student accommodations",
    ],
  },
}

export default function StudyIndiaCityPage({ params }: { params: { city: string } }) {
  const city = cityData[params.city as keyof typeof cityData] || cityData.bangalore

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto text-center">
          <div className="text-6xl mb-4">🏛️</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Study in {city.name}</h1>
          <p className="text-xl md:text-2xl mb-2 opacity-90">{city.nickname}</p>
          <p className="text-lg mb-6 opacity-80">{city.state}</p>
          <p className="text-lg max-w-3xl mx-auto mb-8">{city.description}</p>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <DollarSign className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm opacity-80">Course Fees</div>
              <div className="font-semibold text-sm">{city.averageFees}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm opacity-80">Living Cost</div>
              <div className="font-semibold text-sm">{city.livingCost}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Building className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm opacity-80">Top Industry</div>
              <div className="font-semibold text-sm">{city.industries[0]}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="text-sm opacity-80">Student Hub</div>
              <div className="font-semibold text-sm">50,000+ Students</div>
            </div>
          </div>

          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-orange-800 font-bold px-8 py-4">
            Get Free Counseling
          </Button>
        </div>
      </section>

      {/* Top Colleges */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Top Colleges in {city.name}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {city.topColleges.map((college, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{college.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <GraduationCap className="w-4 h-4" />
                        <span>{college.type}</span>
                      </div>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">Rank #{college.ranking}</Badge>
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Courses</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {city.popularCourses.map((course, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-6">
                  <GraduationCap className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h3 className="font-semibold">{course}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Major Industries</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {city.industries.map((industry, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-6">
                  <Building className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold">{industry}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages & Facilities */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Why Study in {city.name}?</h3>
                <div className="space-y-3">
                  {city.advantages.map((advantage, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{advantage}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">City Facilities</h3>
                <div className="space-y-3">
                  {city.facilities.map((facility, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-6">Start Your Journey in {city.name}</h2>
          <p className="text-xl mb-8">Get personalized guidance for college admissions</p>

          <Card className="bg-white text-gray-900">
            <CardContent className="p-8">
              <div className="grid gap-4">
                <Input placeholder="Full Name" className="text-lg py-3" />
                <Input placeholder="Email Address" type="email" className="text-lg py-3" />
                <Input placeholder="Phone Number" type="tel" className="text-lg py-3" />
                <Input placeholder="Preferred Course" className="text-lg py-3" />
                <Input placeholder="Target College" className="text-lg py-3" />
                <Button className="bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-semibold">
                  Get Free Counseling
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Our local experts will help you with college selection and admission process
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
