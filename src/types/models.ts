export type NodeType = 'company' | 'department' | 'team' | 'group' | 'chat' | 'system';

export type TabType = 'people' | 'positions' | 'chats' | 'files' | 'about';

export type PositionStatus = 'occupied' | 'vacant';

export type AddEntityType = 'employee' | 'position' | 'department' | 'chat' | 'file';

export interface OrgNode {
  id: string;
  name: string;
  type: NodeType;
  parentId: string | null;
  childrenIds: string[];
  // primaryChatId нужен для кнопок "Открыть чат" в центре и правой карточке.
  primaryChatId?: string | null;
  summary: {
    people: number;
    leads: number;
    chats: number;
    files: number;
  };
  description: string;
  leader: string;
  createdAt: string;
}

export interface Employee {
  id: string;
  name: string;
  initials: string;
  position: string;
  subtitle: string;
  status: 'online' | 'away' | 'offline';
  departmentId: string;
  manager: string;
  contacts: string;
  appointedAt: string;
}

export interface Position {
  id: string;
  title: string;
  status: PositionStatus;
  assignee: string;
  reportsTo: string;
  departmentId: string;
  description: string;
  createdAt: string;
}

export interface DepartmentChat {
  id: string;
  name: string;
  chatType: string;
  participants: number;
  lastActivity: string;
  departmentId: string;
  linkedEntity: string;
  nodeId?: string;
}

export interface DepartmentFile {
  id: string;
  name: string;
  fileType: string;
  owner: string;
  updatedAt: string;
  departmentId: string;
  linkedEntity: string;
}

export type Selection =
  | { kind: 'node'; id: string }
  | { kind: 'employee'; id: string }
  | { kind: 'position'; id: string }
  | { kind: 'chat'; id: string }
  | { kind: 'file'; id: string };
