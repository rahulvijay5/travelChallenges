"use client";

import { CompletedTask } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface CompletedTasksListProps {
  completedTasks: CompletedTask[];
}

export default function CompletedTasksList({
  completedTasks,
}: CompletedTasksListProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Completed Tasks</h1>
      {completedTasks.length === 0 ? (
        <p>
          You haven't completed any tasks yet. Start a challenge to get going!
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {completedTasks.map((task) => (
            <Card key={task.id} className="overflow-hidden">
              <Image
                src={
                  //   task.image ||
                  "https://images.unsplash.com/photo-1471247511763-88a722fc9919?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={task.challenge.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>{task.challenge.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Completed on{" "}
                  {new Date(task.createdAt).toLocaleDateString("en-IN")}
                </p>
                <p className="mb-2">{task.experience.substring(0, 100)}...</p>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">
                    Difficulty: {task.difficulty}/5
                  </Badge>
                  <Link
                    href={`/challenge/completed/${task.challengeId}`}
                    className="text-sm text-primary hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
