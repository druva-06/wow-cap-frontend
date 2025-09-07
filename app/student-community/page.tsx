"use client"

import type React from "react"

import { useState, useRef } from "react"

const studyRooms = [
  {
    id: "1",
    title: "Data Analytics Bootcamp",
    description: "Join our live bootcamp to learn data analytics from scratch.",
    host: "John Doe",
    participants: 25,
    maxParticipants: 50,
    isLive: true,
    category: "Technical",
  },
  {
    id: "2",
    title: "IELTS Preparation Workshop",
    description: "Scheduled workshop for IELTS preparation.",
    host: "Jane Smith",
    participants: 10,
    maxParticipants: 30,
    isLive: false,
    category: "Language",
    scheduledTime: "Dec 18, 2024 10:00 AM",
  },
]

const experts = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    title: "Study Abroad Counselor",
    specialization: "USA, Canada, Admissions",
    rating: 4.8,
    reviews: 500,
    responseTime: "24 hours",
    isOnline: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    title: "Software Engineer",
    specialization: "Tech Career, USA Work Culture",
    rating: 4.5,
    reviews: 300,
    responseTime: "48 hours",
    isOnline: false,
  },
]

export default function StudentCommunityPage() {
  const [activeTab, setActiveTab] = useState<"discussions" | "rooms" | "experts">("discussions")
  const [selectedTopic, setSelectedTopic] = useState<string>("usa-safety")
  const [chatMessage, setChatMessage] = useState("")
  const [isVerifiedUser] = useState(true)
  const [isKYCVerified] = useState(false)
  const [showCreateTopic, setShowCreateTopic] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null)

  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [roomType, setRoomType] = useState<"study" | "exam" | "project" | "discussion">("study")
  const [roomTopic, setRoomTopic] = useState("")
  const [roomDuration, setRoomDuration] = useState("2")
  const [inviteContacts, setInviteContacts] = useState("")
  const [showStudyRoomInterface, setShowStudyRoomInterface] = useState(false)

  const studyRooms = [
    {
      id: "1",
      title: "AI & Machine Learning Study Group",
      host: "Priya Sharma",
      hostAvatar: "PS",
      hostPoints: 1250,
      hostBadges: ["AI Expert", "Top Contributor"],
      hostScore: 4.8,
      participants: 4,
      maxParticipants: 8,
      isLive: true,
      category: "Exam Preparation",
      type: "study",
      duration: "3 hours",
      createdAt: "2 hours ago",
    },
    {
      id: "2",
      title: "IELTS Speaking Practice",
      host: "Dr. Sarah Wilson",
      hostAvatar: "SW",
      hostPoints: 2100,
      hostBadges: ["Language Expert", "Verified Mentor"],
      hostScore: 4.9,
      participants: 6,
      maxParticipants: 10,
      isLive: false,
      category: "Daily Practice",
      type: "exam",
      scheduledTime: "Dec 18, 2024 10:00 AM",
      duration: "2 hours",
    },
    {
      id: "3",
      title: "Data Science Project Collaboration",
      host: "Arjun Patel",
      hostAvatar: "AP",
      hostPoints: 890,
      hostBadges: ["Project Leader"],
      hostScore: 4.6,
      participants: 3,
      maxParticipants: 6,
      isLive: true,
      category: "Project",
      type: "project",
      duration: "4 hours",
    },
  ]

  const activeStudySessions = [
    {
      id: "session-1",
      title: "Calculus Problem Solving",
      participants: ["You", "Rahul K", "Meera S"],
      duration: "1h 23m",
      isRecording: true,
    },
    {
      id: "session-2",
      title: "MBA Case Study Discussion",
      participants: ["You", "Ankit P", "Divya R", "Karan M"],
      duration: "45m",
      isRecording: false,
    },
  ]

  const handleJoinRoom = (roomId: string) => {
    setSelectedRoom(roomId)
    setShowStudyRoomInterface(true)
  }

  const handleRejoinSession = (sessionId: string) => {
    console.log("[v0] Rejoining session:", sessionId)
    setShowStudyRoomInterface(true)
  }

  const discussionTopics = [
    {
      id: "usa-safety",
      name: "USA Is SAFE for Higher Education in 2025?",
      date: "Dec 15, 2024",
      participants: 156,
      status: "active",
      messages: 89,
    },
    {
      id: "mba-india",
      name: "Study MBA in India - Worth it or Worthless?",
      date: "Dec 12, 2024",
      participants: 134,
      status: "active",
      messages: 67,
    },
    {
      id: "r-software",
      name: "How many agree R software is Important in Data Analytics?",
      date: "Dec 10, 2024",
      participants: 98,
      status: "closed",
      messages: 45,
    },
    {
      id: "germany-canada",
      name: "Germany vs Canada: Best for Engineering Masters?",
      date: "Dec 8, 2024",
      participants: 87,
      status: "active",
      messages: 34,
    },
    {
      id: "ielts-toefl",
      name: "IELTS vs TOEFL: Which is easier in 2025?",
      date: "Dec 5, 2024",
      participants: 76,
      status: "closed",
      messages: 28,
    },
  ]

  const messages = [
    {
      id: "1",
      user: {
        name: "Priya Sharma",
        avatar: "PS",
        degree: "B.Tech Computer Science",
        year: "Final Year",
        university: "IIT Delhi",
        type: "student",
      },
      content:
        "I've been researching this extensively. Based on recent data, USA remains one of the safest destinations for international students. The key is choosing the right location and university.",
      timestamp: "2 hours ago",
      loves: 23,
      connects: 12,
      stars: 8,
      replies: [
        {
          id: "1-1",
          user: {
            name: "Dr. Rajesh Kumar",
            avatar: "RK",
            title: "Study Abroad Counselor",
            experience: "15+ years",
            type: "faculty",
          },
          content:
            "@Priya Sharma Absolutely correct! I've guided 500+ students to USA. Safety largely depends on the city and campus you choose.",
          timestamp: "1 hour ago",
          loves: 15,
          connects: 8,
          stars: 12,
        },
      ],
    },
    {
      id: "2",
      user: {
        name: "Arjun Patel",
        avatar: "AP",
        degree: "MBA",
        year: "2nd Year",
        university: "ISB Hyderabad",
        type: "student",
      },
      content:
        "I disagree. With recent policy changes and increasing costs, I think students should consider alternatives like Canada or Germany. What do you all think?",
      timestamp: "3 hours ago",
      loves: 18,
      connects: 9,
      stars: 5,
      replies: [],
    },
    {
      id: "3",
      user: {
        name: "Sarah Johnson",
        avatar: "SJ",
        title: "Software Engineer",
        company: "Google",
        experience: "8 years",
        type: "professional",
      },
      content:
        "As someone who studied in USA and now works here, I can share that the experience was transformative. Yes, there are challenges, but the opportunities outweigh them.",
      timestamp: "4 hours ago",
      loves: 31,
      connects: 19,
      stars: 15,
      replies: [],
    },
  ]

  const participants = [
    {
      id: "1",
      name: "Priya Sharma",
      avatar: "PS",
      degree: "B.Tech Computer Science",
      year: "Final Year",
      university: "IIT Delhi",
      type: "student",
      contributions: 12,
      expertise: ["Programming", "AI/ML"],
    },
    {
      id: "2",
      name: "Dr. Rajesh Kumar",
      avatar: "RK",
      title: "Study Abroad Counselor",
      experience: "15+ years",
      institution: "WowCap Education",
      type: "faculty",
      contributions: 8,
      expertise: ["USA", "Canada", "Admissions"],
    },
    {
      id: "3",
      name: "Sarah Johnson",
      avatar: "SJ",
      title: "Software Engineer",
      company: "Google",
      experience: "8 years",
      type: "professional",
      contributions: 5,
      expertise: ["Tech Career", "USA Work Culture"],
    },
  ]

  const currentTopic = discussionTopics.find((topic) => topic.id === selectedTopic)

  // State variables for study room interface
  const [activeContentTab, setActiveContentTab] = useState<"screen" | "documents" | "whiteboard">("screen")
  const [sharedDocuments, setSharedDocuments] = useState([
    {
      id: "doc-1",
      name: "Neural Networks Basics.pdf",
      type: "pdf",
      uploadedBy: "Priya Sharma",
      url: "/placeholder.svg",
    },
    {
      id: "doc-2",
      name: "AI Cheat Sheet.jpg",
      type: "image",
      uploadedBy: "You",
      url: "/placeholder.svg",
    },
  ])
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [showDocumentUpload, setShowDocumentUpload] = useState(false)

  // Whiteboard state and functions
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [whiteboardTool, setWhiteboardTool] = useState<"pen" | "eraser" | "text">("pen")
  const [drawingColor, setDrawingColor] = useState("#000000")
  const [brushSize, setBrushSize] = useState(5)

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineWidth = brushSize
    ctx.lineCap = "round"
    ctx.strokeStyle = drawingColor

    if (whiteboardTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out"
      ctx.strokeStyle = "rgba(0,0,0,1)" // Use white color for erasing
    } else {
      ctx.globalCompositeOperation = "source-over"
    }

    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearWhiteboard = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <section className="py-8 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-xl">👥</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Student Community</h1>
                <p className="text-sm opacity-90">Connect, Learn, and Grow Together</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm bg-white bg-opacity-10 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>1,247 members online</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-1 shadow-xl border border-gray-100">
            <button
              onClick={() => setActiveTab("discussions")}
              className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 text-sm ${
                activeTab === "discussions"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:shadow-md"
              }`}
            >
              💬 Discussions
            </button>
            <button
              onClick={() => setActiveTab("rooms")}
              className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 text-sm ${
                activeTab === "rooms"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:shadow-md"
              }`}
            >
              👥 Study Rooms
            </button>
            <button
              onClick={() => setActiveTab("experts")}
              className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 text-sm ${
                activeTab === "experts"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:shadow-md"
              }`}
            >
              👑 Ask Experts
            </button>
          </div>
        </div>

        {activeTab === "discussions" && (
          <div className="grid lg:grid-cols-12 gap-2">
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl p-8 sticky top-4 border border-blue-500">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-bold text-xl text-white">Discussion Topics</h3>
                  <button
                    onClick={() => setShowCreateTopic(true)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    + New Topic
                  </button>
                </div>
                <div className="space-y-3">
                  {discussionTopics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`w-full text-left p-5 rounded-2xl transition-all duration-300 ${
                        selectedTopic === topic.id
                          ? "bg-white bg-opacity-20 text-white border-l-4 border-blue-300 shadow-xl transform scale-[1.02]"
                          : "hover:bg-white hover:bg-opacity-10 text-blue-100 hover:transform hover:scale-[1.01] hover:shadow-lg"
                      }`}
                    >
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm leading-tight mb-2">{topic.name}</h4>
                        <p className="text-xs text-blue-200">{topic.date}</p>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-blue-200 flex items-center gap-1">
                          <span>👥</span> {topic.participants}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full font-semibold text-xs ${
                              topic.status === "active"
                                ? "bg-green-500 text-green-100 shadow-md"
                                : "bg-gray-600 text-gray-200 shadow-md"
                            }`}
                          >
                            {topic.status}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={showParticipants ? "lg:col-span-6" : "lg:col-span-9"}>
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Topic Header */}
                <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-white to-blue-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold mb-3 text-gray-800 leading-tight">{currentTopic?.name}</h2>
                      <div className="flex items-center gap-8 text-sm text-gray-600">
                        <span className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                          <span>👥</span> {currentTopic?.participants} participants
                        </span>
                        <span className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                          <span>💬</span> {currentTopic?.messages} messages
                        </span>
                        <span
                          className={`px-4 py-2 rounded-full text-xs font-semibold shadow-md ${
                            currentTopic?.status === "active"
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {currentTopic?.status}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowParticipants(!showParticipants)}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      View All
                    </button>
                  </div>
                </div>

                <div className="p-8 space-y-8 max-h-96 overflow-y-auto">
                  {messages.map((message) => (
                    <div key={message.id} className="space-y-6">
                      {/* Main Message */}
                      <div className="flex gap-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <span className="text-white font-bold text-sm">{message.user.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="font-bold text-gray-800 text-lg">{message.user.name}</span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                              {message.user.type === "student" && `${message.user.degree}, ${message.user.university}`}
                              {message.user.type === "faculty" && `${message.user.title}, ${message.user.experience}`}
                              {message.user.type === "professional" && `${message.user.title}, ${message.user.company}`}
                            </span>
                            <span className="text-xs text-gray-400">{message.timestamp}</span>
                          </div>
                          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 mb-4 border border-gray-100 shadow-sm">
                            <p className="text-gray-700 leading-relaxed">{message.content}</p>
                          </div>

                          <div className="flex items-center gap-6 text-sm">
                            <button className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
                              <span>❤️</span> <span className="font-semibold">{message.loves}</span>
                            </button>
                            <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
                              <span>🤝</span> <span className="font-semibold">{message.connects}</span>
                            </button>
                            <button className="flex items-center gap-2 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 px-4 py-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
                              <span>⭐</span> <span className="font-semibold">{message.stars}</span>
                            </button>
                            <button className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all duration-300 font-semibold shadow-sm hover:shadow-md">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Replies */}
                      {message.replies.map((reply) => (
                        <div key={reply.id} className="ml-16 flex gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                            <span className="text-white font-bold text-xs">{reply.user.avatar}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-bold text-gray-800">{reply.user.name}</span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-medium">
                                {reply.user.title}, {reply.user.experience}
                              </span>
                              <span className="text-xs text-gray-400">{reply.timestamp}</span>
                            </div>
                            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-4 mb-3 border border-purple-100 shadow-sm">
                              <p className="text-gray-700 leading-relaxed">{reply.content}</p>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <button className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg transition-all duration-300">
                                <span>❤️</span> {reply.loves}
                              </button>
                              <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg transition-all duration-300">
                                <span>🤝</span> {reply.connects}
                              </button>
                              <button className="flex items-center gap-1 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 px-3 py-1 rounded-lg transition-all duration-300">
                                <span>⭐</span> {reply.stars}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="p-8 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
                  {currentTopic?.status === "closed" ? (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <span className="text-3xl">🔒</span>
                      </div>
                      <p className="text-gray-600 mb-4 font-semibold text-lg">This topic is closed for new messages</p>
                      <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                        Request to Reopen (12 requests needed)
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xs">You</span>
                      </div>
                      <div className="flex-1 flex items-center gap-4 bg-white rounded-2xl border border-gray-200 p-3 shadow-lg">
                        <input
                          type="text"
                          placeholder="Share your thoughts... Use @name to mention someone"
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          className="flex-1 px-6 py-4 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none text-lg"
                        />
                        <div className="flex items-center gap-3">
                          <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
                            <span className="text-xl">📎</span>
                          </button>
                          <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
                            <span className="text-xl">🖼️</span>
                          </button>
                          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {showParticipants && (
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-2xl p-8 sticky top-4 border border-gray-100">
                  <h3 className="font-bold text-xl mb-8 text-gray-800">Participants ({participants.length})</h3>
                  <div className="space-y-4">
                    {participants.map((participant) => (
                      <div
                        key={participant.id}
                        className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-blue-200"
                      >
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <span className="text-white font-bold text-sm">{participant.avatar}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-800">{participant.name}</h4>
                          <p className="text-xs text-gray-600 font-medium">
                            {participant.type === "student" && `${participant.degree} ${participant.year}`}
                            {participant.type === "faculty" && `${participant.title}`}
                            {participant.type === "professional" && `${participant.title}`}
                          </p>
                          <p className="text-xs text-gray-500">{participant.contributions} contributions</p>
                        </div>
                        {participant.contributions > 10 && (
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-xs font-bold">
                              {Math.min(participant.contributions, 99)}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {showCreateTopic && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-xl font-bold mb-4">Start New Topic</h3>
              <p className="text-sm text-gray-600 mb-4">
                Please ensure this topic will be helpful to others with right insights and awareness of many options.
              </p>

              {!isKYCVerified ? (
                <div className="text-center py-4">
                  <div className="text-yellow-600 mb-4">⚠️ KYC Verification Required</div>
                  <p className="text-sm text-gray-600 mb-4">
                    You need to complete KYC verification to start new topics.
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-2">
                    Complete Verification
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Topic title (e.g., Is studying in Germany better than USA in 2025?)"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Provide context and your initial thoughts..."
                    className="w-full px-3 py-2 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                      Start Topic
                    </button>
                    <button
                      onClick={() => setShowCreateTopic(false)}
                      className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Study Rooms Tab */}
        {activeTab === "rooms" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-3 text-gray-800">Study Rooms</h2>
              <p className="text-gray-600 mb-6 text-lg">Collaborate with verified students in focused study sessions</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowCreateRoom(true)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    isVerifiedUser
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!isVerifiedUser}
                >
                  ➕ Create Room
                </button>
                <button
                  onClick={() => setShowInviteModal(true)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    isVerifiedUser
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!isVerifiedUser}
                >
                  📱 Invite Friends
                </button>
              </div>
            </div>

            {activeStudySessions.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-800">Your Active Sessions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {activeStudySessions.map((session) => (
                    <div key={session.id} className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-blue-800">{session.title}</h4>
                          <p className="text-sm text-blue-600">Duration: {session.duration}</p>
                        </div>
                        {session.isRecording && (
                          <div className="flex items-center gap-1 text-red-600">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium">REC</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {session.participants.slice(0, 3).map((participant, index) => (
                            <div
                              key={index}
                              className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center"
                            >
                              <span className="text-white text-xs font-bold">{participant.charAt(0)}</span>
                            </div>
                          ))}
                          {session.participants.length > 3 && (
                            <div className="w-8 h-8 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center">
                              <span className="text-white text-xs">+{session.participants.length - 3}</span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleRejoinSession(session.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          Rejoin
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Available Study Rooms</h3>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200">
                    🔥 Trending
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                    📚 My Topics
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studyRooms.map((room) => (
                  <div
                    key={room.id}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              room.isLive
                                ? "bg-red-100 text-red-800 border border-red-200"
                                : "bg-blue-100 text-blue-800 border border-blue-200"
                            }`}
                          >
                            {room.isLive ? "🔴 LIVE" : "⏰ Scheduled"}
                          </span>
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {room.category}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold mb-4 text-gray-800">{room.title}</h3>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{room.hostAvatar}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{room.host}</p>
                          <p className="text-xs text-gray-500">Host • {room.createdAt || room.scheduledTime}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">Host Credibility:</p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-sm font-medium">{room.hostScore}</span>
                          <span className="text-xs text-gray-500">• {room.hostPoints} points</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {room.hostBadges?.map((badge, index) => (
                            <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Participants:</span>
                          <span className="font-medium">
                            {room.participants}/{room.maxParticipants}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Duration:</span>
                          <span className="font-medium">{room.duration}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button
                          className={`w-full py-3 rounded-lg font-medium transition-all ${
                            room.isLive
                              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                              : "bg-red-600 hover:bg-red-700 text-white shadow-md"
                          } ${!isVerifiedUser ? "opacity-50 cursor-not-allowed" : ""}`}
                          disabled={!isVerifiedUser}
                          onClick={() => handleJoinRoom(room.id)}
                        >
                          {room.isLive ? "🚀 Join Now" : "📅 Register"}
                        </button>
                        <div className="flex gap-2">
                          <button className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-2 rounded-lg text-sm font-medium">
                            📱 Invite via WhatsApp
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {showCreateRoom && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Create Study Room</h3>

                  <div className="space-y-6">
                    {/* Room Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Room Type</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { id: "study", icon: "📚", label: "Study Session" },
                          { id: "exam", icon: "🎯", label: "Exam Prep" },
                          { id: "project", icon: "📝", label: "Project Work" },
                          { id: "discussion", icon: "🧠", label: "Discussion" },
                        ].map((type) => (
                          <button
                            key={type.id}
                            onClick={() => setRoomType(type.id as any)}
                            className={`p-4 rounded-lg border-2 text-center transition-all ${
                              roomType === type.id
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="text-2xl mb-1">{type.icon}</div>
                            <div className="text-sm font-medium">{type.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Topic Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Study Topic</label>
                      <select
                        value={roomTopic}
                        onChange={(e) => setRoomTopic(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select a topic...</option>
                        <option value="ai-ml">Artificial Intelligence & Machine Learning</option>
                        <option value="data-science">Data Science & Analytics</option>
                        <option value="web-dev">Web Development</option>
                        <option value="mobile-dev">Mobile App Development</option>
                        <option value="ielts">IELTS Preparation</option>
                        <option value="gre">GRE Preparation</option>
                        <option value="gmat">GMAT Preparation</option>
                        <option value="project">Project Report Development</option>
                        <option value="research">Research Paper Writing</option>
                        <option value="interview">Interview Preparation</option>
                      </select>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                      <div className="flex gap-3">
                        {["1", "2", "4", "8"].map((duration) => (
                          <button
                            key={duration}
                            onClick={() => setRoomDuration(duration)}
                            className={`px-4 py-2 rounded-lg border transition-all ${
                              roomDuration === duration
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            {duration} hour{duration !== "1" ? "s" : ""}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Room Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Room Title</label>
                      <input
                        type="text"
                        placeholder="e.g., AI Study Group - Neural Networks Deep Dive"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        placeholder="Describe what you'll be studying and what participants can expect..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Privacy Settings */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Privacy</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3">
                          <input type="radio" name="privacy" value="public" className="text-blue-600" />
                          <div>
                            <div className="font-medium">🌍 Public Room</div>
                            <div className="text-sm text-gray-500">Anyone can discover and join</div>
                          </div>
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="radio" name="privacy" value="private" className="text-blue-600" />
                          <div>
                            <div className="font-medium">🔒 Private Room</div>
                            <div className="text-sm text-gray-500">Invite-only access</div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setShowCreateRoom(false)}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                      >
                        Cancel
                      </button>
                      <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                        🚀 Create Room
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showInviteModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl p-6 w-full max-w-md">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Invite Friends to Study</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Send WhatsApp invites to your friends. They'll get a registration link if not already registered.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Numbers</label>
                      <textarea
                        value={inviteContacts}
                        onChange={(e) => setInviteContacts(e.target.value)}
                        placeholder="Enter phone numbers (one per line)&#10;+91 9876543210&#10;+91 8765432109"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800">
                        📱 Message Preview: "Join my study session on WowCap! We're studying [Topic]. Register here:
                        [Link]"
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowInviteModal(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                        📱 Send Invites
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showStudyRoomInterface && (
              <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl w-full max-w-7xl h-[95vh] flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                    <div className="flex items-center gap-4">
                      <h3 className="text-xl font-bold">AI & Machine Learning Study Group</h3>
                      <div className="flex items-center gap-2 text-red-600">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">LIVE</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowStudyRoomInterface(false)}
                      className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 flex">
                    <div className="flex-1 flex flex-col">
                      {/* Content Tabs */}
                      <div className="flex border-b bg-gray-50">
                        <button
                          onClick={() => setActiveContentTab("screen")}
                          className={`px-4 py-2 text-sm font-medium ${
                            activeContentTab === "screen"
                              ? "border-b-2 border-blue-500 text-blue-600 bg-white"
                              : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          📺 Screen Share
                        </button>
                        <button
                          onClick={() => setActiveContentTab("documents")}
                          className={`px-4 py-2 text-sm font-medium ${
                            activeContentTab === "documents"
                              ? "border-b-2 border-blue-500 text-blue-600 bg-white"
                              : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          📄 Documents
                        </button>
                        <button
                          onClick={() => setActiveContentTab("whiteboard")}
                          className={`px-4 py-2 text-sm font-medium ${
                            activeContentTab === "whiteboard"
                              ? "border-b-2 border-blue-500 text-blue-600 bg-white"
                              : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          ✏️ Whiteboard
                        </button>
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 bg-gray-900 relative">
                        {activeContentTab === "screen" && (
                          <div className="h-full flex items-center justify-center">
                            <div className="text-white text-center">
                              <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">📹</span>
                              </div>
                              <p className="text-lg mb-4">Screen sharing will appear here</p>
                              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                                Start Screen Share
                              </button>
                            </div>
                          </div>
                        )}

                        {activeContentTab === "documents" && (
                          <div className="h-full bg-white flex flex-col">
                            <div className="p-4 border-b bg-gray-50">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold">Shared Documents</h4>
                                <button
                                  onClick={() => setShowDocumentUpload(true)}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                                >
                                  📤 Upload Document
                                </button>
                              </div>
                            </div>
                            <div className="flex-1 p-4">
                              {sharedDocuments.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-gray-500">
                                  <div className="text-center">
                                    <div className="text-6xl mb-4">📄</div>
                                    <p>No documents shared yet</p>
                                    <p className="text-sm">Upload notes, PDFs, or images to share with the group</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                  {sharedDocuments.map((doc) => (
                                    <div
                                      key={doc.id}
                                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                    >
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="text-2xl">
                                          {doc.type === "pdf" ? "📄" : doc.type === "image" ? "🖼️" : "📝"}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                          <p className="font-medium text-sm truncate">{doc.name}</p>
                                          <p className="text-xs text-gray-500">by {doc.uploadedBy}</p>
                                        </div>
                                      </div>
                                      <button
                                        onClick={() => setSelectedDocument(doc)}
                                        className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded text-sm"
                                      >
                                        View
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {activeContentTab === "whiteboard" && (
                          <div className="h-full bg-white flex flex-col">
                            <div className="p-4 border-b bg-gray-50">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold">Collaborative Whiteboard</h4>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => setWhiteboardTool("pen")}
                                    className={`p-2 rounded ${whiteboardTool === "pen" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    onClick={() => setWhiteboardTool("eraser")}
                                    className={`p-2 rounded ${whiteboardTool === "eraser" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
                                  >
                                    🧽
                                  </button>
                                  <button
                                    onClick={() => setWhiteboardTool("text")}
                                    className={`p-2 rounded ${whiteboardTool === "text" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
                                  >
                                    📝
                                  </button>
                                  <button
                                    onClick={clearWhiteboard}
                                    className="p-2 rounded hover:bg-gray-100 text-red-600"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="flex-1 relative">
                              <canvas
                                ref={canvasRef}
                                className="w-full h-full cursor-crosshair"
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                              />
                              <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-600">Color:</span>
                                  <input
                                    type="color"
                                    value={drawingColor}
                                    onChange={(e) => setDrawingColor(e.target.value)}
                                    className="w-8 h-8 rounded border"
                                  />
                                  <span className="text-sm text-gray-600">Size:</span>
                                  <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={brushSize}
                                    onChange={(e) => setBrushSize(Number(e.target.value))}
                                    className="w-16"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedDocument && (
                          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10">
                            <div className="bg-white rounded-lg w-4/5 h-4/5 flex flex-col">
                              <div className="flex items-center justify-between p-4 border-b">
                                <h4 className="font-semibold">{selectedDocument.name}</h4>
                                <button
                                  onClick={() => setSelectedDocument(null)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  ✕
                                </button>
                              </div>
                              <div className="flex-1 p-4 overflow-auto">
                                {selectedDocument.type === "image" ? (
                                  <img
                                    src={selectedDocument.url || "/placeholder.svg"}
                                    alt={selectedDocument.name}
                                    className="max-w-full h-auto"
                                  />
                                ) : selectedDocument.type === "pdf" ? (
                                  <div className="h-full flex items-center justify-center text-gray-500">
                                    <div className="text-center">
                                      <div className="text-6xl mb-4">📄</div>
                                      <p>PDF Viewer</p>
                                      <p className="text-sm">{selectedDocument.name}</p>
                                      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
                                        Download PDF
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="h-full bg-gray-50 p-4 rounded">
                                    <pre className="whitespace-pre-wrap">{selectedDocument.content}</pre>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="w-80 bg-white border-l flex flex-col">
                      {/* Participants */}
                      <div className="p-4 border-b bg-gray-50">
                        <h4 className="font-semibold mb-3 text-gray-800">Participants (4)</h4>
                        <div className="space-y-3">
                          {["Priya Sharma (Host)", "You", "Rahul K", "Meera S"].map((participant, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">{participant.charAt(0)}</span>
                              </div>
                              <div className="flex-1">
                                <span className="text-sm font-medium text-gray-800">{participant}</span>
                                {participant.includes("Host") && (
                                  <div className="flex items-center gap-1 mt-1">
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Host</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Chat */}
                      <div className="flex-1 flex flex-col">
                        <div className="p-4 border-b bg-gray-50">
                          <h4 className="font-semibold text-gray-800">Chat</h4>
                        </div>
                        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                          <div className="flex gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">P</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm text-gray-800">Priya</span>
                                <span className="text-xs text-gray-500">2:30 PM</span>
                              </div>
                              <p className="text-sm text-gray-700">
                                Welcome everyone! Let's start with neural networks basics.
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">Y</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm text-gray-800">You</span>
                                <span className="text-xs text-gray-500">2:31 PM</span>
                              </div>
                              <p className="text-sm text-gray-700">Thanks for hosting this session!</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border-t bg-gray-50">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Type a message..."
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                              Send
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full transition-colors">
                        🎤
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full transition-colors">
                        📹
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium">
                        Share Screen
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                        📱 Invite More
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                        Leave Room
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showDocumentUpload && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl p-6 w-full max-w-md">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Upload Document</h3>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="text-4xl mb-2">📄</div>
                      <p className="text-sm text-gray-600 mb-2">Drag and drop files here or click to browse</p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer inline-block"
                      >
                        Choose Files
                      </label>
                    </div>
                    <div className="text-xs text-gray-500">
                      Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB each)
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowDocumentUpload(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Ask Experts Tab */}
            {activeTab === "experts" && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Ask Our Experts</h2>
                  <p className="text-gray-600 mb-8">Get personalized guidance from industry experts and counselors</p>
                </div>

                {/* Question Submission Form */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Question Title"
                      className="w-full px-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <textarea
                      placeholder="Describe your question in detail..."
                      className="w-full px-4 py-3 border rounded-lg min-h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="grid md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <select className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>Select Expert Category</option>
                        <option>Study Abroad</option>
                        <option>Test Preparation</option>
                        <option>Education Finance</option>
                        <option>Career Guidance</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                        📎 Attach Files
                      </button>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg">
                        Submit Question
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expert Profiles */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {experts.map((expert) => (
                    <div
                      key={expert.id}
                      className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                    >
                      <div className="relative mb-4">
                        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-purple-600 font-bold text-xl">
                            {expert.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        {expert.isOnline && (
                          <div className="absolute top-0 right-1/2 translate-x-10 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-1">{expert.name}</h3>
                      <p className="text-purple-600 font-medium mb-1">{expert.title}</p>
                      <p className="text-gray-600 text-sm mb-3">{expert.specialization}</p>

                      <div className="flex justify-center items-center gap-2 mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={star <= Math.floor(expert.rating) ? "text-yellow-400" : "text-gray-300"}
                            >
                              ⭐
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {expert.rating} ({expert.reviews} reviews)
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 mb-4">{expert.responseTime}</p>

                      <div className="space-y-2">
                        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg">
                          💬 Ask Question
                        </button>
                        <button className="w-full border border-purple-600 text-purple-600 hover:bg-purple-50 py-2 rounded-lg">
                          📹 Book 1-on-1 Call
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
