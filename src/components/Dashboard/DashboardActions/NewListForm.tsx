import { TodoList } from "@prisma/client";
import { useRef } from "react";
import { RefetchTodoListArray } from "../../../pages/dashboard";
import { useAppDispatch } from "../../../store/hooks/hooks";
import { RESET_MODAL } from "../../../store/slicers/modalSlice";
import { trpc } from "../../../utils/trpc";
import { TheButton } from "../../UI/TheButton";

interface NewListFormProps {
  setTodoList: React.Dispatch<
    React.SetStateAction<TodoList[] | RefetchTodoListArray>
  >;
}

export const NewListForm = ({ setTodoList }: NewListFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null!);
  const descriptionRef = useRef<HTMLTextAreaElement>(null!);

  const dispatch = useAppDispatch();
  const mutation = trpc.todo.createTodoList.useMutation();
  const { isLoading, mutateAsync: saveTodoList } = mutation;

  const handleNewListSave = async (event: React.FormEvent) => {
    event.preventDefault();

    const toBeSave = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
    };

    const res = await saveTodoList(toBeSave);
    if (res) {
      setTodoList(res);
    }
    dispatch(RESET_MODAL());
  };

  return (
    <form onSubmit={handleNewListSave} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2 py-4">
        <label className="mb-2">List Title : </label>
        <input
          type="text"
          ref={titleRef}
          placeholder="Insert List title"
          className="input-bordered input w-full max-w-xs"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="mb-2">List Description : </label>
        <textarea
          ref={descriptionRef}
          className="textarea-bordered textarea"
          placeholder="Description"
        ></textarea>
      </div>
      <div className="flex justify-end">
        <TheButton label="Add List" isLoading={isLoading} />
      </div>
    </form>
  );
};
