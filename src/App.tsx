import { useMemo, useState } from 'react';
import { chats, employees, files, nodeTypeLabel, orgNodes, positions } from './data/mockData';
import { ContentPanel } from './components/ContentPanel';
import { DetailsPanel } from './components/DetailsPanel';
import { OrgTreeSidebar } from './components/OrgTreeSidebar';
import { TopBar } from './components/TopBar';
import { Selection, TabType } from './types/models';

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

export function App() {
  // Простая state-модель прототипа: текущий узел, таб и контекстное выделение.
  const [activeModule, setActiveModule] = useState<'Компания' | 'Люди' | 'Чаты' | 'Файлы'>('Компания');
  const [activeNodeId, setActiveNodeId] = useState(ROOT_ID);
  const [activeTab, setActiveTab] = useState<TabType>('people');
  const [selection, setSelection] = useState<Selection>({ kind: 'node', id: ROOT_ID });
  const [toast, setToast] = useState<string | null>(null);

  const activeNode = orgNodes[activeNodeId];
  const breadcrumb = useMemo(() => getBreadcrumb(activeNodeId), [activeNodeId]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 1800);
  };

  const scopedEmployees = employees.filter((item) => item.departmentId === activeNodeId);
  const scopedPositions = positions.filter((item) => item.departmentId === activeNodeId);
  const scopedChats = chats.filter((item) => item.departmentId === activeNodeId);
  const scopedFiles = files.filter((item) => item.departmentId === activeNodeId);

  return (
    <div className="app-shell">
      <TopBar
        activeModule={activeModule}
        breadcrumb={breadcrumb}
        onSwitchModule={setActiveModule}
        onCreate={() => showToast('Создание сущности: mock действие')}
        onMore={() => showToast('Дополнительные действия: mock меню')}
      />
      <div className="workspace-grid">
        <OrgTreeSidebar
          activeNodeId={activeNodeId}
          onSelectNode={(id) => {
            setActiveNodeId(id);
            setSelection({ kind: 'node', id });
            setActiveTab('people');
          }}
        />
        <ContentPanel
          node={activeNode}
          breadcrumb={breadcrumb}
          nodeTypeLabel={nodeTypeLabel[activeNode.type]}
          activeTab={activeTab}
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
          onAction={showToast}
        />
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
