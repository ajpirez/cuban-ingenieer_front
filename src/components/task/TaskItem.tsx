'use client';

import { Task } from '@/app/interfaces/task';
import { highlightWordsList } from '@/components/utils';
import { startTransition, useOptimistic } from 'react';
import { useRouter } from 'next/navigation';
import { useTask } from '@/hooks/use-task';
import { updatedCompletedByUser } from '@/actions/updatedCompletedByUser';
import useScrollToTop from '@/hooks/useScrollToTop';
import { toast } from 'sonner';
import { UserAvatar } from '@/app/interfaces/user';
import Image from 'next/image';

interface TaskItemProps {
  task: Task;
  users: UserAvatar[];
}

export default function TaskItem({ task, users }: TaskItemProps) {
  const router = useRouter();
  const scrollToTop = useScrollToTop();
  const { setTask, setEditing } = useTask();

  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(task, (state, newCompleteValue: boolean) => ({
    ...state,
    completed: newCompleteValue,
  }));

  const onToggleTask = async () => {
    startTransition(() => {
      toggleTodoOptimistic(!todoOptimistic.completed);
    });

    try {
      updatedCompletedByUser({ id: todoOptimistic.id }).then(() => {
        router.refresh();
      });
      toast.message('✔ Task completed!');
    } catch (error) {
      toast.message('❌ Error updating task');
      toggleTodoOptimistic(todoOptimistic.completed);
    }
  };

  const onTaskClick = () => {
    setEditing(true);
    scrollToTop();
    setTask(todoOptimistic);
  };

  return (
    <div className="flex w-full items-start gap-2 p-3">
      {!todoOptimistic.completed ? (
        <Image
          width={20}
          height={20}
          src="/square.svg"
          alt="Add icon"
          className="h-6 w-6 flex-shrink-0"
          onClick={onToggleTask}
        />
      ) : (
        <Image width={20} height={20} src="/check-square.svg" alt="Add icon" className="h-6 w-6 flex-shrink-0" />
      )}

      <div
        role="button"
        tabIndex={0}
        className="flex w-5/6 flex-grow flex-wrap items-center gap-2 break-words break-all text-sm leading-6 md:text-base"
        onClick={onTaskClick}
      >
        {highlightWordsList(todoOptimistic.title, users)}
      </div>
    </div>
  );
}
