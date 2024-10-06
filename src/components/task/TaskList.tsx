'use client';

import {useTask} from "@/hooks/use-task";
import TaskItem from "@/components/task/TaskItem";

export default function TaskList() {
    const {tasks} = useTask()

    return (
        <div className="w-full mt-8 ">
            {tasks.map((task, index) => (
                <TaskItem
                    key={index}
                    task={task}
                />

            ))}
        </div>
    );
}
