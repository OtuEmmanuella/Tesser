import { Ticket } from "@/types";
import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

type TicketState = {
  tickets: Record<string, Ticket>;
  ticketOrder: Record<string, string[]>;
};

export const initialState: TicketState = {
  tickets: {},
  ticketOrder: {},
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTicket: (
      state: TicketState,
      { payload }: PayloadAction<Omit<Ticket, "id" | "issueIds">>
    ) => {
      let id = nanoid();
      let ticket = { ...payload, id, issueIds: [] };

      state.tickets = {
        ...state.tickets,
        [id]: ticket,
      };

      //Add new ticket Id to ticket order
      state.ticketOrder = {
        ...state.ticketOrder,
        [payload.projectId]: (
          state.ticketOrder[payload.projectId] || []
        ).concat([id]),
      };
    },
    removeTicketIssue: (
      state: TicketState,
      { payload }: PayloadAction<{ ticketId: string; issueId: string }>
    ) => {
      let issueIds = state.tickets[payload.ticketId].issueIds.filter(
        (id) => id !== payload.issueId
      );

      state.tickets[payload.ticketId] = {
        ...state.tickets[payload.ticketId],
        issueIds,
      };
    },
    removeTicket: (
      state: TicketState,
      { payload }: PayloadAction<{ id: string }>
    ) => {
      let { [payload.id]: removedTicket, ...tickets } = state.tickets;

      let projectId = state.tickets[payload.id].projectId;

      let order = state.ticketOrder[projectId].filter(
        (id) => payload.id !== id
      );

      state.ticketOrder = { ...state.ticketOrder, [projectId]: order };
      state.tickets = tickets;
    },
    updateTicket: (state: TicketState, { payload }: PayloadAction<Ticket>) => {
      state.tickets = { ...state.tickets, [payload.id]: payload };
    },
    updateTicketOrder: (
      state: TicketState,
      { payload }: PayloadAction<{ id: string; order: string[] }>
    ) => {
      state.ticketOrder = { ...state.ticketOrder, [payload.id]: payload.order };
    },
  },
});

export const {
  addTicket,
  removeTicket,
  updateTicket,
  updateTicketOrder,
  removeTicketIssue,
} = ticketSlice.actions;

export default ticketSlice.reducer;
