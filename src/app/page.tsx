import TaskInput from '@/components/task/TaskInput';
import TaskList from '@/components/task/TaskList';
import { TaskProvider } from '@/hooks/use-task';
import { listTasksByUser } from '@/actions/listTasksByUser';
import HandleSignOut from '@/components/ui/HandleSignOut';
import { Pagination } from '@/components/ui/pagination';
import { checkPositiveInteger } from '@/components/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const { page } = searchParams;

  const tasks = await listTasksByUser({
    page: +checkPositiveInteger(page || '1', 1, 1000000, '1'),
    limit: +checkPositiveInteger(page || '10', 10, 10, '10'),
  });

  return (
    <main className="flex flex-col justify-start px-10 py-5">
      <ScrollArea className="flex-1">
        <TaskProvider initialTasks={tasks?.data?.elements || []}>
          <HandleSignOut status={tasks?.status ?? 200} />
          <TaskInput />
          <TaskList />
          {tasks?.data?.elements?.length > 0 && (
            <Pagination totalPages={Math.ceil(tasks?.data?.pagination?.lastPage ?? 0)} />
          )}
        </TaskProvider>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </main>
  );
}
