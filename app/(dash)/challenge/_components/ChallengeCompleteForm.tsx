"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Challenge } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitCompletedChallenge } from "@/actions/challenges";
import { toast } from "@/hooks/use-toast";
import { ImageUploader } from "@/components/ImageUploader";
import { uploadImage } from "@/lib/imageupload";
import Image from "next/image";

interface ChallengeCompletionFormProps {
  challenge: Challenge;
}

export default function ChallengeCompletionForm({
  challenge,
}: ChallengeCompletionFormProps) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [experience, setExperience] = useState("");
  const [difficulty, setDifficulty] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleImageUpload = (file: File) => {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!image) {
        throw new Error("Please upload an image");
      }

      let imageUrl: string;
      try {
        imageUrl = await uploadImage(image, "user-challenge-complete");
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        throw new Error("Failed to upload image. Please try again.");
      }

      const result = await submitCompletedChallenge({
        challengeId: challenge.id,
        imageUrl,
        experience,
        difficulty,
      });

      if (result.success) {
        toast({
          title: "Challenge Completed",
          description:
            "Your challenge completion has been recorded successfully.",
        });
        router.push(`/challenge/completed/${challenge.id}`);
      } else {
        throw new Error(
          result.message || "Failed to submit challenge completion"
        );
      }
    } catch (error) {
      console.error("Failed to submit challenge completion:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to submit challenge completion. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Complete Challenge: {challenge.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="image">Upload Image</Label>
            <ImageUploader onImageUpload={handleImageUpload} />
            {imagePreview && (
              <div className="mt-4">
                <Image
                  src={imagePreview}
                  alt="Uploaded image"
                  width={300}
                  height={300}
                  className="rounded-md object-cover"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Your Experience</Label>
            <Textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Share your experience completing this challenge..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Difficulty</Label>
            <Slider
              min={1}
              max={5}
              step={1}
              value={[difficulty]}
              onValueChange={(value) => setDifficulty(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Very Easy</span>
              <span>Easy</span>
              <span>Moderate</span>
              <span>Hard</span>
              <span>Very Hard</span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !image}
          >
            {isSubmitting ? "Submitting..." : "Submit Completion"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
