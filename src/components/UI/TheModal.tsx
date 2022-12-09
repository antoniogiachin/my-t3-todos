import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { getModalState, RESET_MODAL } from "../../store/slicers/modalSlice";
import { TheButton } from "./TheButton";

export const TheModal = () => {
  const { id, header, content, actionLabel, funcToExecute } =
    useAppSelector(getModalState);

  const dispatch = useAppDispatch();

  const resetModal = () => {
    dispatch(RESET_MODAL());
  };

  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{header}</h3>
          {content}
          {!funcToExecute ? (
            <div className="modal-action">
              <label htmlFor={id} className="btn" onClick={resetModal}>
                Close
              </label>
            </div>
          ) : (
            <div className="modal-action">
              <TheButton funcToExecute={funcToExecute} label={actionLabel} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
