import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, ArrowRight, TrendingUp, Users, BookOpen } from "lucide-react"
import Image from "next/image"

export default function StoriesPage() {
  const featuredStory = {
    id: 1,
    title: "From Small Town Dreams to Silicon Valley Success",
    excerpt: "How Priya from Vizag cracked Google interviews and landed her dream job in California",
    author: "Priya Sharma",
    authorImage: "/placeholder.svg?height=60&width=60",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    category: "Success Story",
    image: "/placeholder.svg?height=400&width=600&text=Success+Story",
    type: "student",
  }

  const studentStories = [
    {
      id: 2,
      title: "MIT Admission: My Journey from IIT to Boston",
      excerpt: "The complete roadmap of how I secured admission to MIT for my PhD in Computer Science",
      author: "Arjun Patel",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "Dec 12, 2024",
      readTime: "6 min read",
      category: "Study Abroad",
      image: "/placeholder.svg?height=250&width=400&text=MIT+Story",
      type: "student",
    },
    {
      id: 3,
      title: "Securing ₹50L Education Loan Without Collateral",
      excerpt: "Step-by-step guide on how I got education loan approval for my MS in Canada",
      author: "Sneha Gupta",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "Dec 10, 2024",
      readTime: "5 min read",
      category: "Funding",
      image: "/placeholder.svg?height=250&width=400&text=Loan+Success",
      type: "student",
    },
    {
      id: 4,
      title: "Online MBA While Working: My Experience",
      excerpt: "How I completed my Executive MBA from IIM while managing a full-time job",
      author: "Vikram Singh",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "Dec 8, 2024",
      readTime: "7 min read",
      category: "Online Education",
      image: "/placeholder.svg?height=250&width=400&text=Online+MBA",
      type: "student",
    },
  ]

  const parentStories = [
    {
      id: 5,
      title: "Supporting My Daughter's Study Abroad Dreams",
      excerpt: "A parent's perspective on navigating the complex world of international education",
      author: "Mrs. Kavitha Reddy",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "Dec 5, 2024",
      readTime: "6 min read",
      category: "Parent Story",
      image: "/placeholder.svg?height=250&width=400&text=Parent+Story",
      type: "parent",
    },
    {
      id: 6,
      title: "Financial Planning for Child's Education Abroad",
      excerpt: "How we saved and planned for our son's engineering degree in Germany",
      author: "Mr. Rajesh Kumar",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "Dec 3, 2024",
      readTime: "8 min read",
      category: "Financial Planning",
      image: "/placeholder.svg?height=250&width=400&text=Financial+Planning",
      type: "parent",
    },
  ]

  const courseEvolutionStories = [
    {
      id: 7,
      title: "The Evolution of Data Science: From Statistics to AI",
      excerpt: "Tracing the journey of Data Science from its statistical roots to modern AI applications",
      author: "WowCap Research Team",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "Dec 1, 2024",
      readTime: "12 min read",
      category: "Course Evolution",
      image: "/placeholder.svg?height=250&width=400&text=Data+Science+Evolution",
      type: "course",
      stats: { growth: "300%", jobs: "2.3M", salary: "$120K" },
    },
    {
      id: 8,
      title: "Cybersecurity: The Most In-Demand Field of 2024",
      excerpt: "Why cybersecurity has become the hottest career choice and what the future holds",
      author: "Industry Experts",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "Nov 28, 2024",
      readTime: "10 min read",
      category: "Career Trends",
      image: "/placeholder.svg?height=250&width=400&text=Cybersecurity+Trends",
      type: "course",
      stats: { growth: "350%", jobs: "3.5M", salary: "$110K" },
    },
    {
      id: 9,
      title: "Artificial Intelligence: Reshaping Every Industry",
      excerpt: "How AI is transforming industries and creating new career opportunities worldwide",
      author: "Tech Analysts",
      authorImage: "/placeholder.svg?height=40&width=40",
      date: "Nov 25, 2024",
      readTime: "15 min read",
      category: "Future Tech",
      image: "/placeholder.svg?height=250&width=400&text=AI+Revolution",
      type: "course",
      stats: { growth: "400%", jobs: "5M", salary: "$150K" },
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <div className="text-6xl mb-4">📖</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Inspiring Stories</h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">Real Journeys, Real Success, Real Impact</p>
          <p className="text-lg max-w-3xl mx-auto">
            Discover inspiring stories from students, parents, and industry insights that will motivate and guide your
            educational journey.
          </p>
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-400 text-purple-800">Featured Story</Badge>
            <h2 className="text-4xl font-bold">Story of the Week</h2>
          </div>

          <Card className="overflow-hidden border-0 shadow-2xl max-w-6xl mx-auto">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-full">
                  <Image
                    src={featuredStory.image || "/placeholder.svg"}
                    alt={featuredStory.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600 text-white">Featured</Badge>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-4">
                    {featuredStory.category}
                  </Badge>
                  <h3 className="text-3xl font-bold mb-4">{featuredStory.title}</h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">{featuredStory.excerpt}</p>

                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={featuredStory.authorImage || "/placeholder.svg"} />
                      <AvatarFallback>
                        {featuredStory.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{featuredStory.author}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{featuredStory.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{featuredStory.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-fit bg-purple-600 hover:bg-purple-700 group">
                    Read Full Story
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Student Stories */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Student Success Stories</h2>
              <p className="text-gray-600">Real experiences from students who achieved their dreams</p>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <Users className="w-5 h-5" />
              <span className="font-semibold">50,000+ Students</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentStories.map((story) => (
              <Card
                key={story.id}
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-blue-600 text-white">{story.category}</Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">{story.excerpt}</p>

                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={story.authorImage || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {story.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{story.author}</p>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <span>{story.date}</span>
                          <span>•</span>
                          <span>{story.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm" className="p-0 h-auto font-medium group-hover:text-purple-600">
                      Read Story
                      <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Stories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Parent Perspectives</h2>
              <p className="text-gray-600">Insights and experiences from supportive parents</p>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <Users className="w-5 h-5" />
              <span className="font-semibold">25,000+ Families</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {parentStories.map((story) => (
              <Card
                key={story.id}
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-48 md:h-full">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-green-600 text-white">{story.category}</Badge>
                    </div>
                    <div className="p-6 flex flex-col justify-center">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-green-600 transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm">{story.excerpt}</p>

                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={story.authorImage || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {story.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{story.author}</p>
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <span>{story.date}</span>
                            <span>•</span>
                            <span>{story.readTime}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto font-medium group-hover:text-green-600 w-fit"
                      >
                        Read Story
                        <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Evolution & Industry Insights */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Course Evolution & Industry Insights</h2>
              <p className="text-gray-600">Deep dives into how fields are evolving and their future potential</p>
            </div>
            <div className="flex items-center gap-2 text-orange-600">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">Industry Analysis</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {courseEvolutionStories.map((story) => (
              <Card
                key={story.id}
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-orange-600 text-white">{story.category}</Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">{story.excerpt}</p>

                    {story.stats && (
                      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{story.stats.growth}</div>
                          <div className="text-xs text-gray-500">Growth</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{story.stats.jobs}</div>
                          <div className="text-xs text-gray-500">Jobs</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">{story.stats.salary}</div>
                          <div className="text-xs text-gray-500">Avg Salary</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={story.authorImage || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {story.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{story.author}</p>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <span>{story.date}</span>
                          <span>•</span>
                          <span>{story.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm" className="p-0 h-auto font-medium group-hover:text-orange-600">
                      Read Analysis
                      <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="border-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white max-w-4xl mx-auto">
            <CardContent className="p-12">
              <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Never Miss an Inspiring Story</h2>
              <p className="text-xl mb-8 text-purple-100">
                Subscribe to get the latest success stories, industry insights, and educational trends delivered to your
                inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-yellow-400"
                />
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-bold">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-purple-200 mt-4">Join 100,000+ students and parents who get inspired weekly</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
