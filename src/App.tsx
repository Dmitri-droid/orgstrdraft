import { useMemo, useState } from 'react';
import { chats, employees, files, nodeTypeLabel, orgNodes, positions } from './data/mockData';
import { AddEntityModal } from './components/AddEntityModal';
import { ContentPanel } from './components/ContentPanel';
import { DetailsPanel } from './components/DetailsPanel';
import { OrgTreeSidebar } from './components/OrgTreeSidebar';
import { AddEntityType, Selection, TabType } from './types/models';

const ROOT_ID = 'root';

// Базовая навигационная модель для синхронизации breadcrumb и выделенного узла.
const getBreadcrumb = (nodeId: string): string[] => {
  const chain: string[] = [];
  let current: string | null = nodeId;
  while (current) {
    chain.push(orgNodes[current].name);
    current = orgNodes[current].parentId;
  }
  return chain.reverse();
};

const submitLabelByEntityType: Record<AddEntityType, string> = {
  employee: 'Сотрудник',
  position: 'Должность',
  department: 'Подразделение',
  chat: 'Чат',
  file: 'Файл',
};

export function App() {
  // Простая state-модель прототипа: текущий узел, таб и контекстное выделение.
  const [activeNodeId, setActiveNodeId] = useState(ROOT_ID);
  const [activeTab, setActiveTab] = useState<TabType>('people');
  const [selection, setSelection] = useState<Selection>({ kind: 'node', id: ROOT_ID });
  const [toast, setToast] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalEntityType, setAddModalEntityType] = useState<AddEntityType>('employee');
  const [addModalContextNodeId, setAddModalContextNodeId] = useState(ROOT_ID);

  const activeNode = orgNodes[activeNodeId];
  const breadcrumb = useMemo(() => getBreadcrumb(activeNodeId), [activeNodeId]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 1800);
  };

  const openAddModal = (nodeId: string, entityType: AddEntityType = 'employee') => {
    setAddModalContextNodeId(nodeId);
    setAddModalEntityType(entityType);
    setIsAddModalOpen(true);
  };

  const openPrimaryChat = (nodeId: string) => {
    const node = orgNodes[nodeId];
    if (node.type === 'chat') {
      const directChat = chats.find((chat) => chat.nodeId === node.id) ?? chats.find((chat) => chat.id === node.primaryChatId);
      if (directChat) {
        setSelection({ kind: 'chat', id: directChat.id });
        setActiveTab('chats');
        showToast(`Открыт чат: ${directChat.name}`);
      } else {
        showToast('Для выбранного чат-узла не найден связанный чат.');
      }
      return;
    }

    if (!node.primaryChatId) {
      showToast('У этого подразделения пока нет основного чата.');
      return;
    }

    const primaryChat = chats.find((chat) => chat.id === node.primaryChatId);
    if (!primaryChat) {
      showToast('Основной чат не найден в мок-данных.');
      return;
    }

    setSelection({ kind: 'chat', id: primaryChat.id });
    setActiveTab('chats');
    showToast(`Открыт основной чат: ${primaryChat.name}`);
  };

  const scopedEmployees = employees.filter((item) => item.departmentId === activeNodeId);
  const scopedPositions = positions.filter((item) => item.departmentId === activeNodeId);
  const scopedChats = chats.filter((item) => item.departmentId === activeNodeId || item.nodeId === activeNodeId);
  const scopedFiles = files.filter((item) => item.departmentId === activeNodeId);

  return (
    <div className="app-shell">
      <div className="workspace-grid">
        <OrgTreeSidebar
          activeNodeId={activeNodeId}
          onAction={showToast}
          onOpenAddModal={openAddModal}
          onSelectNode={(id) => {
            setActiveNodeId(id);
            setSelection({ kind: 'node', id });
            setActiveTab(orgNodes[id].type === 'chat' ? 'chats' : 'people');
          }}
        />
        <ContentPanel
          node={activeNode}
          breadcrumb={breadcrumb}
          nodeTypeLabel={nodeTypeLabel[activeNode.type]}
          activeTab={activeTab}
          onPrimaryChatOpen={() => openPrimaryChat(activeNodeId)}
          onOpenAddModal={() => openAddModal(activeNodeId)}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setSelection({ kind: 'node', id: activeNodeId });
          }}
          employees={scopedEmployees}
          positions={scopedPositions}
          chats={scopedChats}
          files={scopedFiles}
          selection={selection}
          onSelect={setSelection}
          onAction={showToast}
        />
        <DetailsPanel
          selection={selection}
          node={activeNode}
          employees={employees}
          positions={positions}
          chats={chats}
          files={files}
          nodeTypeLabel={nodeTypeLabel[activeNode.type]}
          onPrimaryChatOpen={() => openPrimaryChat(activeNodeId)}
          onOpenAddModal={() => openAddModal(activeNodeId)}
          onAction={showToast}
        />
      </div>

      <AddEntityModal
        isOpen={isAddModalOpen}
        contextNode={orgNodes[addModalContextNodeId]}
        entityType={addModalEntityType}
        onEntityTypeChange={setAddModalEntityType}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(type) => {
          setIsAddModalOpen(false);
          showToast(`${submitLabelByEntityType[type]} добавлен(а): mock flow`);
        }}
      />

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
