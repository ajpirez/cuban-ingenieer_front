import TaskInput from '@/components/task/TaskInput';
import TaskList from '@/components/task/TaskList';
import { TaskProvider } from '@/hooks/use-task';
import { listTasksByUser } from '@/actions/listTasksByUser';
import { PaginationURL } from '@/components/ui/paginationURL';
import { checkPositiveInteger } from '@/components/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { listUsersAvatars } from '@/actions/listUsersAvatars';
import { HandleSignOut } from '@/components/ui/handleSignOut';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const { page } = searchParams;

  const [tasks, users] = await Promise.all([
    listTasksByUser({
      page: +checkPositiveInteger(page || '1', 1, 1000000, '1'),
      limit: +checkPositiveInteger(page || '10', 10, 10, '10'),
    }),
    listUsersAvatars(),
  ]);

  return (
    <main className="flex flex-col justify-start px-10 py-5">
      <ScrollArea className="flex-1">
        <TaskProvider initialTasks={tasks?.data?.elements || []}>
          <HandleSignOut status={tasks?.status ?? 200} />
          <TaskInput users={users?.data?.elements || []} />
          <TaskList users={users?.data?.elements || []} />
          {tasks?.data?.elements?.length > 0 && (
            <PaginationURL totalPages={Math.ceil(tasks?.data?.pagination?.lastPage ?? 0)} />
          )}
        </TaskProvider>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </main>
  );
}
