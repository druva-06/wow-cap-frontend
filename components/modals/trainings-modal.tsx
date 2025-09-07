"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface TrainingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TrainingsModal({ isOpen, onClose }: TrainingsModalProps) {
  const router = useRouter()

  const handleSubmit = () => {
    onClose()
    router.push("/search-results?vertical=trainings")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Trainings Integration</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4 text-center">
          <p className="text-gray-600">
            Training programs will be integrated with third-party APIs for real-time course listings.
          </p>

          <div className="flex justify-center pt-6">
            <Button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-3 text-lg font-semibold rounded-xl"
            >
              Continue to Registration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
