'use client';

import { useTask } from '@/hooks/use-task';
import TaskItem from '@/components/task/TaskItem';
import { UserAvatar } from '@/app/interfaces/user';

interface Props {
  users: UserAvatar[];
}

export default function TaskList({ users }: Props) {
  const { tasks } = useTask();

  return (
    <div className="w-full">
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} users={users} />
      ))}
    </div>
  );
}
