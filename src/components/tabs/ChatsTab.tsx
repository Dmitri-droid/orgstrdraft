import { DepartmentChat, Selection } from '../../types/models';

interface Props {
  chats: DepartmentChat[];
  selection: Selection;
  onSelect: (selection: Selection) => void;
  onAction: (message: string) => void;
}

export function ChatsTab({ chats, selection, onSelect, onAction }: Props) {
  return (
    <section>
      {chats.length === 0 ? <div className="empty">Чатов в этом узле пока нет.</div> : chats.map((chat) => (
        <div key={chat.id} className={`row ${selection.kind === 'chat' && selection.id === chat.id ? 'selected' : ''}`} onClick={() => onSelect({ kind: 'chat', id: chat.id })}>
          <div className="grow">
            <strong>{chat.name}</strong>
            <div>{chat.chatType} · {chat.participants} участников</div>
            <small>{chat.lastActivity}</small>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onAction(`Открыть чат: ${chat.name}`); }}>Открыть</button>
        </div>
      ))}
    </section>
  );
}
