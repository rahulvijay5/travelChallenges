"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createChallenge } from "@/actions/challenges";
import { MultiSelect } from "@/components/MultiSelect";
import { Button } from "@/components/ui/button";
import { Globe2 } from "lucide-react";
import AppLayout from "@/components/Applayout";
import { toast } from "@/hooks/use-toast";

const AddChallengePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    difficultyLevel: 1,
    place: "Any",
    suitableFor: [],
    challengeType: [],
    // kind: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, difficultyLevel: value[0] }));
  };

  const handleMultiSelectChange = (name: string) => (value: string[]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createChallenge(formData);
      setFormData({
        title: "",
        description: "",
        estimatedTime: "",
        difficultyLevel: 1,
        place: "Any",
        suitableFor: [],
        challengeType: [],
        // kind: "",
      });
      toast({
        title: "Challenge Created",
        description: "Your new challenge has been successfully added.",
      });
    } catch (error) {
      console.error("Failed to create challenge:", error);
      toast({
        title: "Error",
        description: "Failed to create challenge. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AppLayout showBackButton={true} pageTitle="Add a New Challenge">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          {/* <CardTitle className="text-2xl font-bold text-center">
            Add a New Challenge
          </CardTitle> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedTime">Estimated Time (minutes)</Label>
                <Input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="number"
                  value={formData.estimatedTime}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="w-full min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Difficulty Level</Label>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[formData.difficultyLevel]}
                  onValueChange={handleSliderChange}
                />
                <div className="flex justify-between text-xs">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="place">Place</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="place"
                    name="place"
                    value={formData.place}
                    onChange={handleInputChange}
                    placeholder="Any"
                    className="flex-grow"
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, place: "Any" }))
                    }
                    className="whitespace-nowrap px-2 text-muted-foreground"
                    variant="outline"
                  >
                    <Globe2 />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <MultiSelect
                  options={["Solo", "Couple", "Family", "Group"]}
                  selectedOptions={formData.suitableFor}
                  onChange={handleMultiSelectChange("suitableFor")}
                  label="Suitable For"
                  description="Select who this challenge is suitable for"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <MultiSelect
                  options={[
                    "Any",
                    "Beach",
                    "City",
                    "River",
                    "Forest",
                    "Sea",
                    "Public",
                    "Mountains",
                    "Wild",
                    "Food",
                  ]}
                  selectedOptions={formData.challengeType}
                  onChange={handleMultiSelectChange("challengeType")}
                  label="Challenge Type"
                  description="Select what kind of challenge this is"
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-6">
              Post Challenge
            </Button>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default AddChallengePage;
