import TaskInput from "@/components/task/TaskInput";
import TaskList from "@/components/task/TaskList";
import {TaskProvider} from "@/hooks/use-task";
import {listTasksByUser} from "@/actions/listTasksByUser";


export default async function Home() {

    const tasks = await listTasksByUser({page: 1, limit: 10});

    return (
        <main className="flex flex-col justify-start min-h-screen px-10 py-12">
            <TaskProvider initialTasks={tasks?.data?.elements || []}>
                <TaskInput/>
                <TaskList/>
            </TaskProvider>
        </main>
    );
}
