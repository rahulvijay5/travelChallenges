"use client";

import { useState } from "react";
import { Challenge } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skipChallenge, markChallengeCompleted } from "@/actions/challenges";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";

interface ChallengeViewProps {
  challenge: Challenge;
}

export default function ChallengeView({ challenge }: ChallengeViewProps) {
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [experience, setExperience] = useState("");
  const [difficulty, setDifficulty] = useState(3);
  const router = useRouter();

  const handleSkip = async () => {
    try {
      const result = await skipChallenge(challenge.id);
      if (result.success) {
        toast({
          title: "Challenge Skipped",
          description: "You've successfully skipped this challenge.",
        });
        router.push("/challenge");
      } else {
        toast({
          title: "Unable to Skip",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to skip challenge:", error);
      toast({
        title: "Error",
        description: "An error occurred while trying to skip the challenge.",
        variant: "destructive",
      });
    }
    setShowSkipModal(false);
  };

  // const handleComplete = async () => {
  //   console.log("Completed buttonpressed");
  //   try {
  //     const imageUrl = `imageurl${Math.floor(1000 + Math.random() * 9000)}`;
  //     const result = await markChallengeCompleted(
  //       challenge.id,
  //       imageUrl,
  //       experience,
  //       difficulty
  //     );
  //     if (result.success) {
  //       toast({
  //         title: "Challenge Completed",
  //         description: "Congratulations! You've completed the challenge.",
  //       });
  //       router.push("/challenge");
  //     } else {
  //       toast({
  //         title: "Unable to Complete",
  //         description:
  //           "An error occurred while marking the challenge as completed.",
  //         variant: "destructive",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Failed to complete challenge:", error);
  //     toast({
  //       title: "Error",
  //       description:
  //         "An error occurred while trying to complete the challenge.",
  //       variant: "destructive",
  //     });
  //   }
  //   setShowCompleteModal(false);
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {challenge.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{challenge.description}</p>
          <p className="text-sm text-muted-foreground">
            Estimated Time: {challenge.estimatedTime} minutes
          </p>
          <Button
            variant="link"
            className="text-xs pl-0"
            onClick={() => setShowSkipModal(true)}
          >
            Skip this challenge
          </Button>
          {/* <Button
            variant="link"
            className="text-xs pl-0"
            onClick={() => setShowCompleteModal(true)}
          >
            Challenge Completed?
          </Button> */}
        </CardContent>
      </Card>

      <Dialog open={showSkipModal} onOpenChange={setShowSkipModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mt-8 mb-4">
              Are you sure you want to skip this one?
            </DialogTitle>
            <DialogDescription>
              You can only skip one challenge a month.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowSkipModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSkip}>Skip</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* <Dialog open={showCompleteModal} onOpenChange={setShowCompleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Challenge</DialogTitle>
            <DialogDescription>
              Share your experience and rate the difficulty of this challenge.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Share your experience..."
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
          <div>
            <label>Difficulty</label>
            <Slider
              min={1}
              max={5}
              step={1}
              value={[difficulty]}
              onValueChange={(value) => setDifficulty(value[0])}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCompleteModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleComplete}>Complete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
