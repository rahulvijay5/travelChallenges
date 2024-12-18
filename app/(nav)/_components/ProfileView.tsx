"use client";

import { UserProfile } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, TrophyIcon } from "lucide-react";

interface ProfileViewProps {
  userProfile: UserProfile;
}

export default function ProfileView({ userProfile }: ProfileViewProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-8">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={userProfile.profilePicture || ""} />
            <AvatarFallback>{userProfile.username[0]}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl">{userProfile.username}</CardTitle>
            <p className="text-muted-foreground">{userProfile.email}</p>
          </div>
        </CardHeader>
        <CardContent>
          {/* {userProfile.bio && <p className="mb-4">{userProfile.bio}</p>} */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Joined {new Date(userProfile.createdAt).toLocaleDateString()}
            </div>
            {userProfile.city && (
              <div className="flex items-center">
                <MapPinIcon className="mr-2 h-4 w-4" />
                {userProfile.city}
              </div>
            )}
            <div className="flex items-center">
              <TrophyIcon className="mr-2 h-4 w-4" />
              {userProfile.completedTasksCount} challenges completed
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Recent Achievements</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {userProfile.recentCompletedTasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle className="text-lg">{task.challenge.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Completed on {new Date(task.createdAt).toLocaleDateString()}
              </p>
              <Badge variant="secondary">Difficulty: {task.difficulty}/5</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
