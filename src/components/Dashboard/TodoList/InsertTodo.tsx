import { faPlus, faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
import { Todo } from "@prisma/client";
import { useRef, useState } from "react";
import { TheButton } from "../../UI/TheButton";

import { trpc } from "../../../utils/trpc";

interface InsertTodoProps {
  listSlug: string;
}

export const InsertTodo = ({ listSlug }: InsertTodoProps) => {
  const utils = trpc.useContext();

  const [showInsertForm, setShowInsertForm] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null!);
  const descriptionRef = useRef<HTMLTextAreaElement>(null!);
  const [done, setDone] = useState(false);

  const { mutateAsync: addTodoToList, isLoading } =
    trpc.todo.addTodoToList.useMutation({
      onSuccess() {
        utils.todo.getTodoListBySlug.invalidate();
      },
    });

  const handleInsertTodo = async () => {
    const { value: title } = titleRef.current;
    const { value: description } = descriptionRef.current;

    const res = await addTodoToList({
      title,
      description,
      done,
      listSlug,
    });

    setDone(false);
    titleRef.current.value = "";
    descriptionRef.current.value = "";
  };

  return (
    <div className="my-6 flex items-center space-x-8">
      <TheButton
        label="Add Todo"
        icon={showInsertForm ? faXmarkSquare : faPlus}
        funcToExecute={() => {
          setShowInsertForm((prev) => !prev);
        }}
      />
      {showInsertForm && (
        <div className="mt-6 grid max-w-fit grid-cols-10 gap-6 rounded-lg  bg-base-300 p-6">
          <div className="col-span-3 flex items-center justify-center">
            <input
              type="text"
              placeholder="Insert Title"
              className="input w-full max-w-xs"
              ref={titleRef}
            />
          </div>
          <div className="col-span-3 flex items-center justify-center">
            <textarea
              ref={descriptionRef}
              className="textarea-bordered textarea"
              placeholder="Description"
            ></textarea>
          </div>
          <div className="col-span-3 flex items-center justify-center">
            <div className="tooltip" data-tip="Done">
              <input
                type="checkbox"
                className="toggle toggle-lg"
                onChange={() => {
                  setDone((prev) => !prev);
                }}
                checked={done}
              />
            </div>
          </div>
          <div className="col-span-1 ml-auto flex max-w-fit items-center justify-center">
            <TheButton
              label={""}
              isLoading={isLoading}
              icon={faPlus}
              severity="secondary"
              funcToExecute={handleInsertTodo}
            />
          </div>
        </div>
      )}
    </div>
  );
};
