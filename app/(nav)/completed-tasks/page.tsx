import { getCompletedTasksForUser } from "@/actions/challenges";
import AppLayout from "@/components/Applayout";
import CompletedTasksList from "../_components/CompletedTasksList";

export default async function CompletedTasksPage() {
  const completedTasks = await getCompletedTasksForUser();

  return (
    <AppLayout pageTitle="Completed Tasks">
      <CompletedTasksList completedTasks={completedTasks} />
    </AppLayout>
  );
}
