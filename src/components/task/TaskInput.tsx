'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useCallback, useMemo } from 'react';
import { cn } from '@/components/utils';
import { ButtonResize } from '@/components/ui/button-resize';
import { useWindowSize } from '@/hooks/use-windows-size';
import { useTask } from '@/hooks/use-task';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '@/app/interfaces/task';
import { useRouter } from 'next/navigation';
import { createTasksByUser } from '@/actions/createTasksByUser';
import { updatedTaskByUser } from '@/actions/updatedTaskByUser';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { UserAvatar } from '@/app/interfaces/user';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const initialValue = {
  id: '',
  completed: false,
  title: '',
};

interface Props {
  users: UserAvatar[];
}

export default function TaskInput({ users }: Props) {
  const { data: session } = useSession();
  const avatar = session?.user.avatar || '/avatar.svg';
  const router = useRouter();
  const windowSize = useWindowSize();
  const isEmail = (word: string) => /\S+@\S+\.\S+/.test(word);
  const isUrl = (word: string) => /^(https?:\/\/|www\.)[^\s]+$/.test(word);
  const isTag = (word: string) => word.startsWith('#');
  const isMention = (word: string) => word.startsWith('@');
  const [mentionDetected, setMentionDetected] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isCustomLg = windowSize.width && windowSize.width > 1230;
  const { task, setTask, editing, setEditing, updateTask } = useTask();
  const isDisabled = task.title.trim() === '';

  useEffect(() => {
    inputRef.current?.focus();
  }, [task]);

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
        label: isCustomLg ? (
          isDisabled ? (
            'Ok'
          ) : (
            'Add'
          )
        ) : isDisabled ? (
          <Image width={20} height={20} src="/X.svg" alt="X" className="-p-2 min-h-[1rem]" />
        ) : task?.id ? (
          <Image width={20} height={20} src="/disquete.svg" alt="Disquete" className="mr-1 h-4 w-4" />
        ) : (
          '+'
        ),
        className: `${!isDisabled && isCustomLg && 'text-right w-[100px]'} bg-acceptButton text-white text-center`,
        onClick: addTaskAction,
      },
    ];
  }, [addTaskAction, handleCancel, isDisabled, windowSize.width]);

  const renderButtons = () => {
    return windowSize.width && windowSize.width < 1230 ? (
      <Button key={actionButtons[1].id} button={actionButtons[1]} />
    ) : (
      actionButtons.map(button => <Button key={button.id} button={button} />)
    );
  };

  const highlightWordsColor = (input: string) => {
    const parts = input.split(' ');

    return parts.map((part, i) => {
      if (isEmail(part)) {
        return (
          <span key={i} className="font-semibold text-orangeLetter">
            {part}{' '}
          </span>
        );
      }
      if (isUrl(part)) {
        return (
          <span key={i} className="font-semibold text-blueLetter">
            {part}{' '}
          </span>
        );
      }
      if (isTag(part)) {
        return (
          <span key={i} className="font-semibold text-purpleLetter">
            {part}{' '}
          </span>
        );
      }
      if (isMention(part)) {
        return (
          <span key={i} className="font-semibold text-greenLetter">
            {part}{' '}
          </span>
        );
      }
      return <span key={i}>{part} </span>;
    });
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

  const handleUserSelect = (userEmail: string) => {
    const words = task.title.split(' ');
    words[words.length - 1] = `@${userEmail} `;
    setTask({ ...task, title: words.join(' ') });
    setDropdownVisible(false);
  };

  const handleCloseModal = () => {
    const words = task.title.split(' ');
    const lastWord = words[words.length - 1];
    if (lastWord.startsWith('@')) {
      const newInputValue = words.slice(0, -1).join(' ');
      setTask({ ...task, title: newInputValue });
    }
    setDropdownVisible(false);
    setMentionDetected(false);
  };

  return (
    <div className={cn('flex w-10/12 flex-col', editing && 'shadow-custom')}>
      <div
        role="button"
        tabIndex={0}
        className={cn('flex items-center gap-3 p-3', editing && 'rounded-t border border-textLetterLightDisabled')}
        onClick={() => {
          setEditing(true);
        }}
      >
        <Image
          width={20}
          height={20}
          src="/plus-square.svg"
          alt="Add icon"
          className="bg-[background: blueLetterDark] h-6 w-6"
        />
        {editing ? (
          <div className="relative w-full overflow-auto">
            <div className="pointer-events-none absolute inset-0 whitespace-pre-wrap break-words bg-transparent">
              {highlightWordsColor(task.title)}
            </div>
            <textarea
              ref={inputRef}
              value={task.title}
              onChange={e => {
                const newValue = e.target.value;
                if (newValue.length < 100 && !dropdownVisible) {
                  setTask({ id: task.id || '', title: e.target.value, completed: false });
                }
              }}
              placeholder="Type to add new task"
              className="caret-default relative z-10 w-full resize-none overflow-hidden bg-transparent pr-10 focus:outline-none"
              style={{ caretColor: '#007FFF', color: 'transparent' }}
              rows={1}
              onInput={e => {
                e.currentTarget.style.height = 'auto';
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
              onKeyDown={(e: any) => {
                const inputValue = e.target.value;
                const words = inputValue.split(' ');
                const lastWord = words[words.length - 1];
                const enterPressed = e.key === 'Enter';

                if (enterPressed) {
                  const lines = inputValue.split('\n');
                  if (lines.length >= 2) {
                    e.preventDefault();
                  }
                }

                if (e.key === 'Backspace') {
                  if (lastWord.startsWith('@')) {
                    e.preventDefault();
                    const newInputValue = words.slice(0, -1).join(' ');
                    setTask({ ...task, title: newInputValue + ' ' });
                    setMentionDetected(false);
                    setDropdownVisible(false);
                  } else {
                    setDropdownVisible(false);
                    setMentionDetected(false);
                  }
                  return;
                }

                if (lastWord.startsWith('@') && !mentionDetected) {
                  setMentionDetected(true);
                  setDropdownVisible(true);
                } else if (!lastWord.startsWith('@')) {
                  setMentionDetected(false);
                  setDropdownVisible(false);
                }
              }}
            />

            <Image
              width={20}
              height={20}
              src={avatar}
              alt="Avatar"
              unoptimized
              className={cn('absolute right-0 top-0 h-6', isDisabled ? 'opacity-50' : '')}
            />
          </div>
        ) : (
          <p className="text-sm text-gray-500 md:text-base">Type to add new task</p>
        )}
      </div>

      {editing && (
        <div className="flex items-center justify-between gap-3 rounded-b border border-textLetterLightDisabled px-2 py-1">
          <div className="flex gap-1">{renderButtonsConfig()}</div>
          <div className="flex gap-1">{renderButtons()}</div>
        </div>
      )}

      {dropdownVisible && (
        <div className="relative z-20 -mt-20 w-[250px] rounded-lg border border-gray-300 bg-white shadow-xl transition-all duration-200 ease-in-out">
          <button onClick={handleCloseModal} className="absolute right-2 top-2 z-30 text-gray-500 hover:text-gray-700">
            ✕
          </button>

          {users.length > 0 ? (
            users.map(user => (
              <div
                role="button"
                tabIndex={0}
                key={user.id}
                onClick={() => handleUserSelect(user.email)}
                className="flex cursor-pointer items-center rounded-lg p-3 text-sm text-gray-800 transition-all duration-150 ease-in-out hover:scale-105 hover:bg-gray-100"
              >
                <Image
                  unoptimized
                  width={20}
                  height={20}
                  src={user.avatar || '//avatar.svg'}
                  alt={`${user.email} avatar`}
                  className="mr-3 h-6 w-6 rounded-full"
                />
                <span>{user.email}</span>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-sm text-gray-500">
              <p>No users found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
