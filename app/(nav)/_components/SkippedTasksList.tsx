"use client";

import { SkippedTask } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

interface SkippedTasksListProps {
  skippedTasks: SkippedTask[];
}

export default function SkippedTasksList({
  skippedTasks,
}: SkippedTasksListProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Skipped Tasks</h1>
      {skippedTasks.length === 0 ? (
        <p>You haven't skipped any tasks yet. Keep up the good work!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skippedTasks.map((task) => (
            <Card key={task.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{task.challenge.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-2">
                  Skipped on {new Date(task.createdAt).toLocaleDateString()}
                </p>
                <p className="mb-4">
                  {task.challenge.description.substring(0, 100)}...
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">
                    Difficulty: {task.challenge.difficultyLevel}/5
                  </Badge>
                  <Badge variant="outline">
                    Est. Time: {task.challenge.estimatedTime} min
                  </Badge>
                </div>
                <Link href={`/challenge/${task.challengeId}`}>
                  <Button className="w-full">
                    Try Again
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
