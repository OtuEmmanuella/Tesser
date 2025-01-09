import * as React from "react";
import { issueSlice, projectSlice, ticketSlice } from "@/selectors";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  DragDropContext,
  ResponderProvided,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

import style from "./style.module.scss";

import { Ticket as TicketComponent } from "../../components/Ticket";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useClickOutside } from "@/hooks/useClickOutside";
import { updateTicket, updateTicketOrder } from "@/slices/tickets";
import { Link } from "@/components/Elements";
import { Project as ProjectType, Ticket as TicketType, Issue as IssueType } from "@/types";

export const Project = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const ref = React.useRef<HTMLDivElement>(null);
  const { tickets, ticketOrder } = useSelector(ticketSlice);
  const { issues } = useSelector(issueSlice);
  const { projects } = useSelector(projectSlice);
  const { isOpen, handleClose, handleOpen } = useDisclosure();
  useClickOutside(ref, handleClose);

  const projectId = params.id;
  if (!projectId || !projects || !projects[projectId]) {
    return (
      <div className={style["project"]}>
        <Link to="/projects">Back</Link>
        <div>Project not found</div>
      </div>
    );
  }

  const project = projects[projectId];
  const projectTickets = ticketOrder[projectId];

  const handleOnDragEnd = (result: DropResult, provider: ResponderProvided) => {
    const { draggableId, destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newTicketOrder = Array.from(projectTickets);
      newTicketOrder.splice(source.index, 1);
      newTicketOrder.splice(destination.index, 0, draggableId);

      dispatch(
        updateTicketOrder({ id: projectId, order: newTicketOrder })
      );
      return;
    }

    const startTicket = tickets[source.droppableId];
    const endTicket = tickets[destination.droppableId];

    if (startTicket === endTicket) {
      const newIssueIds = Array.from(startTicket.issueIds);
      newIssueIds.splice(source.index, 1);
      newIssueIds.splice(destination.index, 0, draggableId);

      const newTicket = { ...startTicket, issueIds: newIssueIds };
      dispatch(updateTicket(newTicket));
      return;
    }

    const startIssueIds = Array.from(startTicket.issueIds);
    startIssueIds.splice(source.index, 1);
    const newStartTicket = { ...startTicket, issueIds: startIssueIds };

    const endIssueIds = Array.from(endTicket.issueIds);
    endIssueIds.splice(destination.index, 0, draggableId);
    const newEndTicket = { ...endTicket, issueIds: endIssueIds };
    dispatch(updateTicket(newStartTicket));
    dispatch(updateTicket(newEndTicket));
  };

  return (
    <div className={style["project"]} ref={ref}>
      <div>
        <Link to="/projects">Back</Link>
      </div>

      <div className={style["project__title"]}>
        <h2>Projects / {project.title}</h2>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tickets" direction="horizontal" type="column">
          {(provided) => (
            <div
              className={style["project__tickets"]}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <>
                {projectTickets.map((id, index) => {
                  const column = tickets[id];
                  if (!column) return null;
                  const tasks = column.issueIds.map((taskId) => issues[taskId]).filter(Boolean);
                  return (
                    <TicketComponent
                      key={id}
                      ticket={column}
                      issues={tasks}
                      index={index}
                    />
                  );
                })}
              </>

              {provided.placeholder}

              <>
                {!isOpen ? (
                  <button
                    type="button"
                    onClick={handleOpen}
                    className={style["project__tickets-add-button"]}
                    aria-label="add ticket"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      role="presentation"
                    >
                      <path
                        d="M13 11V3.993A.997.997 0 0012 3c-.556 0-1 .445-1 .993V11H3.993A.997.997 0 003 12c0 .557.445 1 .993 1H11v7.007c0 .548.448.993 1 .993.556 0 1-.445 1-.993V13h7.007A.997.997 0 0021 12c0-.556-.445-1-.993-1H13z"
                        fill="currentColor"
                        fillRule="evenodd"
                      />
                    </svg>
                  </button>
                ) : (
                  <TicketComponent
                    ticket={{
                      title: "",
                      id: "dummy",
                      issueIds: [],
                      projectId: projectId,
                    }}
                    issues={[]}
                    isDummy={handleClose}
                    index={1}
                  />
                )}
              </>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};