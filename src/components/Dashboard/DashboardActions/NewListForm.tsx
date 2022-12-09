import { useRef } from "react";
import { TheButton } from "../../UI/TheButton";

export const NewListForm = () => {
  const titleRef = useRef<HTMLInputElement>(null!);
  const descriptionRef = useRef<HTMLTextAreaElement>(null!);

  const handleNewListSave = async (event: React.FormEvent) => {
    event.preventDefault();

    const toBeSave = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
    };
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
        <TheButton label="Add List" />
      </div>
    </form>
  );
};
