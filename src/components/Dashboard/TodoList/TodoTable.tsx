import { faSync, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Todo } from "@prisma/client";
import React, { useMemo } from "react";
import { TheBadge } from "../../UI/TheBadge";
import { TheButton } from "../../UI/TheButton";

interface TodoTableProps {
  todos: Partial<Todo>[];
  listTitle: string;
  isDoneChangeLoading?: string;
  handleUpdateTodoStatus: (
    listTitle: string,
    done: boolean,
    id?: string,
    mode?: string
  ) => Promise<void>;
  handleTodoDelete: (listTitle: string, id: string) => Promise<void>;
}

export const TodoTable = ({
  todos,
  listTitle,
  handleUpdateTodoStatus,
  isDoneChangeLoading,
  handleTodoDelete,
}: TodoTableProps) => {
  const isEveryTodoChecked = useMemo(
    () => todos.every((todo) => todo && todo.done === true),
    [todos]
  );

  return (
    <div className="m-auto my-10 w-4/5 overflow-x-hidden">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>
              <label>
                {isDoneChangeLoading === "multiple" ? (
                  <FontAwesomeIcon icon={faSync} className="fa-spin fa-2x" />
                ) : (
                  <input
                    type="checkbox"
                    className="checkbox"
                    readOnly
                    checked={isEveryTodoChecked}
                    onClick={() => {
                      handleUpdateTodoStatus(
                        listTitle,
                        !isEveryTodoChecked,
                        undefined,
                        "multiple"
                      );
                    }}
                  />
                )}
              </label>
            </th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- rows --> */}
          {todos.map((todo, index) => (
            <tr key={index}>
              <th>
                <label>
                  {isDoneChangeLoading === todo.id ? (
                    <FontAwesomeIcon icon={faSync} className="fa-spin fa-xl" />
                  ) : (
                    <input
                      type="checkbox"
                      readOnly
                      className="checkbox"
                      checked={todo.done}
                      onChange={() => {
                        handleUpdateTodoStatus(listTitle, !todo.done, todo.id);
                      }}
                    />
                  )}
                </label>
              </th>
              <td>{todo.title}</td>
              {todo.description && todo.description?.length < 100 ? (
                <td>{todo.description}</td>
              ) : (
                <td className="flex items-center space-x-2">
                  <span>{todo.description?.slice(0, 99)}...</span>
                  <TheBadge style={{ cursor: "pointer" }} label="read more" />
                </td>
              )}
              <td>
                {isDoneChangeLoading === todo.id ? (
                  <FontAwesomeIcon icon={faSync} className="fa-spin fa-xl" />
                ) : (
                  <div className="tooltip" data-tip="Delete">
                    <TheButton
                      label=""
                      severity="error"
                      icon={faTrash}
                      funcToExecute={() => {
                        handleTodoDelete(listTitle, todo.id as string);
                      }}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
