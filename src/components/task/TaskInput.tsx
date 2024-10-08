'use client';

import { useCallback, useMemo } from 'react';
import { cn, highlightWordsColor } from '@/components/utils';
import { Button } from '@/components/ui/button';
import { ButtonResize } from '@/components/ui/button-resize';
import { useWindowSize } from '@/hooks/use-windows-size';
import { useTask } from '@/hooks/use-task';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '@/app/interfaces/task';
import { useRouter } from 'next/navigation';
import { createTasksByUser } from '@/actions/createTasksByUser';
import { updatedTaskByUser } from '@/actions/updatedTaskByUser';
import { toast } from 'sonner';

const initialValue = {
  id: '',
  completed: false,
  title: '',
};

export default function TaskInput() {
  const router = useRouter();
  const windowSize = useWindowSize();

  const { task, setTask, editing, setEditing, updateTask } = useTask();

  const handleCancel = useCallback(() => {
    setEditing(false);
    setTask({
      completed: false,
      title: '',
    });
  }, [setEditing, setTask]);

  const addTaskAction = useCallback(() => {
    if (task.title.trim() === '') {
      setEditing(false);
      return;
    }

    if (task?.id === '') {
      const newTaskId = uuidv4();
      const newTask = {
        id: newTaskId,
        title: task.title,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Task;

      updateTask(newTaskId, newTask);
      createTasksByUser({ title: newTask.title }).then(() => {
        toast.message('📑 Task created!');
      });
    } else {
      updatedTaskByUser({ id: task.id!, title: task.title }).then(() => {
        toast.message('📑 Task updated!');
      });
    }
    setTask(initialValue);
    setEditing(false);
    router.refresh();
  }, [task.title, task.id, setEditing, updateTask, setTask, router]);

  const isDisabled = task.title.trim() === '';

  const buttonsConfig = useMemo(() => {
    return [
      {
        id: 'open',
        label: 'Open',
        icon: isDisabled ? '/maximize-2-light.svg' : '/maximize-2-dark.svg',
        className: cn(
          'bg-cancelButton -mr-1 custom-xl:mr-8',
          isDisabled ? 'text-textLetterLight' : 'text-textLetterDark',
        ),
        disabled: isDisabled,
        onClick: () => {},
      },
      {
        id: 'today',
        label: 'Today',
        icon: isDisabled ? '/calendar-light.svg' : '/calendar-dark.svg',
        disabled: isDisabled,
        onClick: () => {},
      },
      {
        id: 'public',
        label: 'Public',
        icon: isDisabled ? '/unlock-light.svg' : '/unlock-dark.svg',
        disabled: isDisabled,
        onClick: () => {},
      },
      {
        id: 'highlight',
        label: 'Normal',
        icon: isDisabled ? '/normal-light.svg' : '/normal-dark.svg',
        disabled: isDisabled,
        onClick: () => {},
      },
      {
        id: 'estimation',
        label: 'Estimation',
        icon: isDisabled ? '/estimation-light.svg' : '/estimation-dark.svg',
        disabled: isDisabled,
        onClick: () => {},
      },
      {
        id: 'delete',
        label: 'Delete',
        className: 'custom-xl:hidden block',
        icon: isDisabled ? '/trash-light.svg' : '/trash-dark.svg',
        disabled: false,
        onClick: handleCancel,
      },
    ];
  }, [handleCancel, isDisabled]);

  const actionButtons = useMemo(() => {
    return [
      { id: 'cancel', label: 'Cancel', className: 'bg-cancelButton text-textLetterDark', onClick: handleCancel },
      {
        id: 'ok',
        label: windowSize.width && windowSize.width > 1230 ? (isDisabled ? 'Ok' : 'Add') : isDisabled ? 'X' : '+',
        className: 'bg-acceptButton text-white text-center',
        onClick: addTaskAction,
      },
    ];
  }, [addTaskAction, handleCancel, isDisabled, windowSize.width]);

  const highlightWords = useCallback(highlightWordsColor, []);

  const renderButtons = () => {
    return windowSize.width && windowSize.width < 1230 ? (
      <Button key={actionButtons[1].id} button={actionButtons[1]} />
    ) : (
      actionButtons.map(button => <Button key={button.id} button={button} />)
    );
  };

  const renderButtonsConfig = () => {
    return buttonsConfig.map(button => (
      <div key={button.id}>
        <div className="block custom-xl:hidden">
          <ButtonResize
            icon={button.icon}
            onClick={button.onClick}
            disabled={isDisabled}
            className={button.className}
          />
        </div>
        <div className="hidden custom-xl:block">
          <Button button={button} />
        </div>
      </div>
    ));
  };

  return (
    <div className={cn('flex w-10/12 flex-col', editing && 'shadow-custom')}>
      <div
        className={cn('flex items-center gap-3 p-3', editing && 'rounded-t border border-[#E7ECEF]')}
        onClick={() => {
          setEditing(true);
        }}
      >
        <img src="/plus-square.svg" alt="Add icon" className="bg-[background: #007FFF] h-6 w-6" />
        {editing ? (
          <div className="relative w-full overflow-auto">
            <div className="pointer-events-none absolute inset-0 whitespace-pre-wrap break-words bg-transparent">
              {highlightWords(task.title)}
            </div>
            <input
              type="text"
              value={task.title}
              onChange={e => setTask({ id: task.id || '', title: e.target.value, completed: false })}
              placeholder="Type to add new task"
              className="caret-default relative z-10 w-full bg-transparent pr-10 focus:outline-none"
              style={{ caretColor: 'auto', color: 'transparent' }}
            />

            <img
              src="/avatar.svg"
              alt="Avatar"
              className={cn('absolute right-0 top-0', isDisabled ? 'opacity-50' : '')}
            />
          </div>
        ) : (
          <p className="text-sm text-gray-500 md:text-base">Type to add new task</p>
        )}
      </div>

      {editing && (
        <div className="flex items-center justify-between gap-3 rounded-b border border-[#E7ECEF] px-2 py-1">
          <div className="flex gap-1">{renderButtonsConfig()}</div>
          <div className="flex gap-1">{renderButtons()}</div>
        </div>
      )}
    </div>
  );
}
