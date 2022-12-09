import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { getModalState, RESET_MODAL } from "../../store/slicers/modalSlice";

import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

export const TheModal = () => {
  const { id, header, content, isInformativeModal } =
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
          {isInformativeModal ? (
            <h3 className="text-lg font-bold">{header}</h3>
          ) : (
            <div className="flex justify-between">
              <h3 className="text-lg font-bold">{header}</h3>
              <label htmlFor={id} onClick={resetModal}>
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  className="cursor-pointer hover:scale-110"
                />
              </label>
            </div>
          )}

          {content}
          {isInformativeModal && (
            <div className="modal-action">
              <label htmlFor={id} className="btn" onClick={resetModal}>
                Close
              </label>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
