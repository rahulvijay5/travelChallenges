"use client";

import { useState } from "react";
import {
  CompletedChallenge,
  Challenge,
  CompleteChallengeType,
} from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { submitComment } from "@/actions/challenges";
import { MessageSquareIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface CompletedChallengePageProps {
  challenge: CompleteChallengeType;
  completedChallenges: CompletedChallenge[];
}

export default function CompletedChallengePage({
  challenge,
  completedChallenges,
}: CompletedChallengePageProps) {
  const [activeComments, setActiveComments] = useState<Record<string, boolean>>(
    {}
  );
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({});

  const toggleComments = (id: string) => {
    setActiveComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCommentChange = (id: string, text: string) => {
    setCommentTexts((prev) => ({ ...prev, [id]: text }));
  };

  const router = useRouter();

  const handleSubmitComment = async (completedTaskId: string) => {
    try {
      const result = await submitComment(
        completedTaskId,
        commentTexts[completedTaskId]
      );
      if (result.success) {
        toast({
          title: "Comment Submitted",
          description: "Your comment has been posted successfully.",
        });
        setCommentTexts((prev) => ({ ...prev, [completedTaskId]: "" }));
        // You might want to refresh the comments here
      } else {
        throw new Error(result.message || "Failed to submit comment");
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
      toast({
        title: "Error",
        description: "Failed to submit comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const ChallengeDetails = () => (
    <Card className="bg-background mb-6 md:mb-0">
      <CardHeader>
        <CardTitle>{challenge.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{challenge.description}</p>
        <div>
          <p className="font-semibold">Difficulty:</p>
          <p>{challenge.difficultyLevel}/5</p>
        </div>
        <div>
          <p className="font-semibold">Suitable for:</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {challenge.suitableFor.map((item: string) => (
              <Badge key={item} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold">Type:</p>
          <Badge>{challenge.challengeType}</Badge>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="md:hidden mb-6">
        <ChallengeDetails />
      </div>
      <div className="md:flex md:gap-6">
        <div className="hidden md:block md:w-1/3 md:sticky md:top-20 md:self-start space-y-4">
          <ChallengeDetails />
          <Button onClick={() => router.push("/home")} className="w-full">
            Bring Up a New Challenge!
          </Button>
        </div>
        <div className="md:w-2/3">
          {completedChallenges.map((challenge) => (
            <Card key={challenge.id} className="mb-6 bg-background">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex gap-4 items-center">
                  <Avatar>
                    <AvatarImage src={challenge.user.profilePicture || ""} />
                    <AvatarFallback>
                      {challenge.user.username[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">
                      {challenge.user.username}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Completed{" "}
                      {new Date(challenge.createdAt).toLocaleDateString(
                        "en-In"
                      )}
                    </p>
                  </div>
                </div>
                <div className="items-center hidden md:flex space-x-2 text-sm text-muted-foreground justify-end gap-1">
                  <p className="text-sm">
                    Felt{" "}
                    {challenge.difficulty == 1
                      ? "Very Easy"
                      : challenge.difficulty == 2
                      ? "Easy"
                      : challenge.difficulty == 3
                      ? "Moderate"
                      : challenge.difficulty == 4
                      ? "Hard"
                      : "Very Hard"}
                  </p>
                  <Button
                    variant="ghost"
                    className="flex gap-1 items-center"
                    size="sm"
                    onClick={() => toggleComments(challenge.id)}
                  >
                    <MessageSquareIcon className="h-4 w-4" />
                    {challenge.comments.length}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="mt-4">{challenge.experience}</p>
                <Image
                  src={
                    "https://images.unsplash.com/photo-1471247511763-88a722fc9919?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  width={400}
                  height={400}
                  alt="Challenge completion"
                  className="rounded-md max-h-48 w-full object-cover"
                />
                <div className="flex items-center md:hidden space-x-2 text-sm text-muted-foreground justify-end gap-1">
                  <p className="text-sm">
                    Felt{" "}
                    {challenge.difficulty == 1
                      ? "Very Easy"
                      : challenge.difficulty == 2
                      ? "Easy"
                      : challenge.difficulty == 3
                      ? "Moderate"
                      : challenge.difficulty == 4
                      ? "Hard"
                      : "Very Hard"}
                  </p>
                  <Button
                    variant="ghost"
                    className="flex gap-1 items-center"
                    size="sm"
                    onClick={() => toggleComments(challenge.id)}
                  >
                    <MessageSquareIcon className="h-4 w-4" />
                    {challenge.comments.length}
                  </Button>
                </div>

                {activeComments[challenge.id] && (
                  <div className="mt-4 space-y-4 border-t-2 pt-4">
                    {challenge.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex items-start space-x-2"
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={comment.user.profilePicture || ""}
                          />
                          <AvatarFallback>
                            {comment.user.username[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">
                            {comment.user.username}
                          </p>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                    <div className="mt-8">
                      <Textarea
                        placeholder="Add a comment..."
                        value={commentTexts[challenge.id] || ""}
                        onChange={(e) =>
                          handleCommentChange(challenge.id, e.target.value)
                        }
                      />
                      <Button
                        className="mt-2"
                        onClick={() => handleSubmitComment(challenge.id)}
                        disabled={!commentTexts[challenge.id]}
                      >
                        Post Comment
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
