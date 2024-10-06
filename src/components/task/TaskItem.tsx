'use client';

import {Task} from "@/app/interfaces/task";
import {highlightWordsList} from "@/components/utils";
import {startTransition, useOptimistic} from "react";
import {useRouter} from "next/navigation";
import {useTask} from "@/hooks/use-task";
import {updatedCompletedByUser} from "@/actions/updatedCompletedByUser";
import useScrollToTop from "@/hooks/useScrollToTop";

interface TaskItemProps {
    task: Task;
}

export default function TaskItem({task}: TaskItemProps) {
    const router = useRouter()
    const scrollToTop = useScrollToTop();
    const {setTask, setEditing} = useTask()


    const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(task, (state, newCompleteValue: boolean) => ({
        ...state,
        completed: newCompleteValue
    }));

    const onToggleTask = async () => {
        startTransition(() => {
            toggleTodoOptimistic(!todoOptimistic.completed);
        });

        try {
            updatedCompletedByUser({id: todoOptimistic.id}).then(() => {
                router.refresh();
            })
        } catch (error) {
            console.log("Error: ", error);
            toggleTodoOptimistic(todoOptimistic.completed);
        }
    }

    const onTaskClick = () => {
        setEditing(true);
        scrollToTop();
        setTask(todoOptimistic);
    };

    return (
        <div className="flex  p-3 w-full items-center gap-2">
            {
                !todoOptimistic.completed ?
                    <img src="/square.svg"
                         alt="Add icon"
                         className="w-6 h-6"
                         onClick={onToggleTask}
                    />
                    : <img src="/check-square.svg"
                           alt="Add icon"
                           className="w-6 h-6"/>
            }

            <div
                className="flex-grow break-words text-base leading-6 w-5/6"
                onClick={onTaskClick}
            >
                {highlightWordsList(todoOptimistic.title)}
            </div>
        </div>
    );
}
