import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
// import SVG from "react-inlinesvg";

import style from "./style.module.scss";

import { Issue as IssueType } from "@/types";
import { removeIssue } from "@/slices/issues";
import { removeTicketIssue } from "@/slices/tickets";
// import minus from "@/assets/minus.svg";

interface IssueProps {
  issue: IssueType;
  index: number;
  ticketId: string;
}

export const Issue = ({ issue, index, ticketId }: IssueProps) => {
  const dispatch = useDispatch();

  const handleDeleteIssue = React.useCallback(() => {
    dispatch(removeTicketIssue({ ticketId, issueId: issue.id }));
    dispatch(removeIssue({ id: issue.id }));
  }, [dispatch, ticketId, issue.id]);

  return React.useMemo(() => {
    return (
      <Draggable draggableId={issue.id} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            data-dragging={snapshot.isDragging}
            className={style["issue"]}
          >
            <p>{issue.title}</p>
            <button
              onClick={handleDeleteIssue}
              type="button"
              aria-label="delete issue"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </Draggable>
    );
  }, [issue, index, handleDeleteIssue]);
};
