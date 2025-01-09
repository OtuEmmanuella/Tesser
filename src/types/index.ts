export interface BaseEntry {
  id: string;
  title: string;
}

export interface Project extends BaseEntry {
  lead: string;
}

export interface Ticket extends BaseEntry {
  projectId: string;
  issueIds: string[];
}

export interface Issue extends BaseEntry {
  description?: string;
  assignee?: string;
  reporter?: string;
  createdAd?: string;
}

export interface Notification extends BaseEntry {
  variant: "info" | "warning" | "success" | "error";
  message?: string;
}