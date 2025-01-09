import * as React from "react";
import { useDispatch } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { nanoid } from "@reduxjs/toolkit";
// import SVG from "react-inlinesvg";

import style from "./style.module.scss";

import { Issue as IssueType, Ticket as TicketType } from "@/types";
import { addTicket, removeTicket, updateTicket } from "@/slices/tickets";
import { addNotification } from "@/slices/notifications";
import { addIssue, removeIssue } from "@/slices/issues";
import { useDisclosure } from "@/hooks/useDisclosure";
import { Button, ConfirmationDialog } from "@/components/Elements";

// import plus from "@/assets/plus.svg";
// import minus from "@/assets/minus.svg";

import { Issue } from "../Issue";
import { TicketForm } from "../TicketForm";

interface TicketProps {
  ticket: TicketType;
  issues: IssueType[];
  isDummy?: () => void;
  index: number;
}

export const Ticket = ({ ticket, issues, isDummy, index }: TicketProps) => {
  const dispatch = useDispatch();
  const [ticketTitle, setTicketTitle] = React.useState("");
  const { isOpen: isNewTicket, handleClose, handleOpen } = useDisclosure();
  const {
    isOpen: isNewIssue,
    handleClose: handleCloseIsNewIssue,
    handleOpen: handleOpenIsNewIssue,
  } = useDisclosure();

  const handleAddNewIssue = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let id = nanoid();
      dispatch(addIssue({ id, issue: { id, title: ticketTitle } }));
      dispatch(updateTicket({ ...ticket, issueIds: [...ticket.issueIds, id] }));
      setTicketTitle("");
      handleCloseIsNewIssue();
    },
    [dispatch, handleCloseIsNewIssue, ticket, ticketTitle]
  );

  const handleTicketTitle = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTicketTitle(event.target.value);
    },
    []
  );

  const handleEditTitle = React.useCallback(() => {
    handleOpen();
    setTicketTitle(ticket.title);
  }, [handleOpen, ticket.title]);

  const handleUpdateTitle = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!ticketTitle) {
        dispatch(
          addNotification({
            message: "Ticket must have a title",
            title: "Error",
            variant: "error",
          })
        );
        handleClose();
        return;
      }

      if (isDummy) {
        dispatch(addTicket({ ...ticket, title: ticketTitle }));
        isDummy();
      } else {
        dispatch(updateTicket({ ...ticket, title: ticketTitle }));
      }

      handleClose();
      setTicketTitle("");
    },
    [dispatch, handleClose, isDummy, ticketTitle, ticket]
  );

  const handleDeleteTicket = React.useCallback(() => {
    dispatch(removeTicket({ id: ticket.id }));
    ticket.issueIds.forEach((issue) => dispatch(removeIssue({ id: issue }))); //remove all issues of a ticket
  }, [dispatch, ticket]);

  return React.useMemo(() => {
    return (
      <Draggable draggableId={ticket.id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className={style["ticket"]}
          >
            <div className={style["ticket__container"]}>
              <div
                className={style["ticket__header"]}
                {...provided.dragHandleProps}
              >
                {!isNewTicket && !isDummy ? (
                  <div className={style["ticket__header-title"]}>
                    <button type="button" className="visually-hidden">
                      Edit
                    </button>
                    <div onClick={handleEditTitle} style={{ flexGrow: 1 }}>
                      <h2 className={style["ticket__header-title-text"]}>
                        <span>{ticket.title.toUpperCase()}</span>
                        {Boolean(issues?.length) && (
                          <span>
                            {issues.length} issue{issues.length > 1 && "s"}
                          </span>
                        )}
                      </h2>
                    </div>

                    <ConfirmationDialog
                      triggerButton={
                        <button
                          style={{ outline: "none" }}
                          type="button"
                          aria-label="delete ticket"
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
                      }
                      confirmButton={
                        <Button
                          type="button"
                          variant="danger"
                          onClick={handleDeleteTicket}
                        >
                          Confirm
                        </Button>
                      }
                      title="Confirmation"
                      body={`Are you sure you want delete "${ticket.title}" ticket?`}
                    />
                  </div>
                ) : (
                  <TicketForm
                    handleSubmit={handleUpdateTitle}
                    handleChange={handleTicketTitle}
                    handleCancel={handleClose}
                    value={ticketTitle}
                  />
                )}
              </div>

              <Droppable droppableId={ticket.id} type="task">
                {(provider) => (
                  <div
                    ref={provider.innerRef}
                    {...provider.droppableProps}
                    className={style["ticket__main"]}
                  >
                    <div>
                      <div className={style["ticket__main-issues"]}>
                        {issues.map((issue, index) => (
                          <Issue
                            key={issue.id}
                            issue={issue}
                            index={index}
                            ticketId={ticket.id}
                          />
                        ))}
                      </div>

                      {provider.placeholder}

                      <div className={style["ticket__main-controls"]}>
                        {!isNewIssue ? (
                          <button
                            className={style["ticket__main-button"]}
                            onClick={handleOpenIsNewIssue}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              role="presentation"
                            >
                              <path
                                d="M13 11V3.993A.997.997 0 0012 3c-.556 0-1 .445-1 .993V11H3.993A.997.997 0 003 12c0 .557.445 1 .993 1H11v7.007c0 .548.448.993 1 .993.556 0 1-.445 1-.993V13h7.007A.997.997 0 0021 12c0-.556-.445-1-.993-1H13z"
                                fill="currentColor"
                                fillRule="evenodd"
                              ></path>
                            </svg>
                            {/* <SVG src={plus} height={16} width={16} /> */}
                            <span>Create issue</span>
                          </button>
                        ) : (
                          <TicketForm
                            handleSubmit={handleAddNewIssue}
                            handleChange={handleTicketTitle}
                            handleCancel={handleCloseIsNewIssue}
                            value={ticketTitle}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        )}
      </Draggable>
    );
  }, [
    ticket,
    issues,
    index,
    isDummy,
    isNewTicket,
    handleDeleteTicket,
    handleEditTitle,
    handleTicketTitle,
    handleUpdateTitle,
    handleAddNewIssue,
    handleCloseIsNewIssue,
    handleClose,
    handleOpenIsNewIssue,
    ticketTitle,
    isNewIssue,
  ]);
};
