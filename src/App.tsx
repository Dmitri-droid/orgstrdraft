import { useMemo, useState } from 'react';
import { chats, employees, files, nodeTypeLabel, orgNodes, positions } from './data/mockData';
import { AddEntityModal } from './components/AddEntityModal';
import { ChangeHistoryDrawer, HistoryEntry } from './components/ChangeHistoryDrawer';
import { ContentPanel } from './components/ContentPanel';
import { DetailsPanel, ShowInStructureTarget } from './components/DetailsPanel';
import { OrgTreeSidebar } from './components/OrgTreeSidebar';
import { StructureSettingsDrawer, StructureSettings } from './components/StructureSettingsDrawer';
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
  const [activeNodeId, setActiveNodeId] = useState(ROOT_ID);
  const [activeTab, setActiveTab] = useState<TabType>('people');
  const [selection, setSelection] = useState<Selection>({ kind: 'node', id: ROOT_ID });
  const [toast, setToast] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalEntityType, setAddModalEntityType] = useState<AddEntityType>('employee');
  const [addModalContextNodeId, setAddModalContextNodeId] = useState(ROOT_ID);
  const [employeeOrderByDepartment, setEmployeeOrderByDepartment] = useState<Record<string, string[]>>(() =>
    employees.reduce<Record<string, string[]>>((acc, employee) => {
      if (!acc[employee.departmentId]) acc[employee.departmentId] = [];
      acc[employee.departmentId].push(employee.id);
      return acc;
    }, {}),
  );

  const [isStructureSettingsOpen, setIsStructureSettingsOpen] = useState(false);
  const [isResetStructureConfirmOpen, setIsResetStructureConfirmOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const [focusNodeId, setFocusNodeId] = useState<string | null>(null);
  const [resetStructureOrderSignal, setResetStructureOrderSignal] = useState(0);
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([
    { id: 'h-1', departmentId: 'feo', eventType: 'reordered_nodes', description: 'Перемещён узел "Штаб ФЭО-Б"', actor: 'Иван Петров', timeLabel: 'сегодня, 14:32', relatedEntity: 'Штаб ФЭО-Б' },
    { id: 'h-2', departmentId: 'feo', eventType: 'created_chat', description: 'Создан чат "Руководители ФЭО"', actor: 'Марина Соколова', timeLabel: 'сегодня, 11:10', relatedEntity: 'Руководители ФЭО' },
    { id: 'h-3', departmentId: 'feo', eventType: 'changed_primary_chat', description: 'Назначен основной чат подразделения', actor: 'Иван Петров', timeLabel: 'вчера, 18:05' },
    { id: 'h-4', departmentId: 'feo', eventType: 'added_employee', description: 'Добавлен сотрудник "Кузнецова Мария"', actor: 'Елена Смирнова', timeLabel: 'вчера, 09:40', relatedEntity: 'Кузнецова Мария' },
    { id: 'h-5', departmentId: 'feo', eventType: 'changed_leader', description: 'Изменён руководитель подразделения', actor: 'Иван Петров', timeLabel: '12 апр, 16:20' },
    { id: 'h-6', departmentId: 'feo', eventType: 'reset_order', description: 'Сброшен пользовательский порядок', actor: 'Администратор', timeLabel: '12 апр, 15:02' },
    { id: 'h-7', departmentId: 'feo', eventType: 'settings_changed', description: 'Обновлены настройки оргструктуры', actor: 'Администратор', timeLabel: '12 апр, 14:10' },
    { id: 'h-8', departmentId: 'feo', eventType: 'created_department', description: 'Создано подразделение "Группа планирования"', actor: 'Марина Соколова', timeLabel: '10 апр, 12:44', relatedEntity: 'Группа планирования' },
    { id: 'h-9', departmentId: 'feo', eventType: 'archived_node', description: 'Архивирован узел "Планерки 2"', actor: 'Иван Петров', timeLabel: '08 апр, 17:28', relatedEntity: 'Планерки 2' },
    { id: 'h-10', departmentId: 'feo', eventType: 'renamed_department', description: 'Переименовано подразделение "Штаб ФЭО-А"', actor: 'Марина Соколова', timeLabel: '07 апр, 10:11', relatedEntity: 'Штаб ФЭО-А' },
    { id: 'h-11', departmentId: 'feo', eventType: 'added_position', description: 'Добавлена должность "Аналитик бюджета"', actor: 'Елена Смирнова', timeLabel: '06 апр, 16:54', relatedEntity: 'Аналитик бюджета' },
  ]);
  const [structureSettings, setStructureSettings] = useState<StructureSettings>({
    dragAndDropEnabled: true,
    whoCanEdit: 'admins',
    whoCanAddDepartments: 'admins_leads',
    whoCanMoveNodes: 'admins',
  });

  const activeNode = orgNodes[activeNodeId];
  const breadcrumb = useMemo(() => getBreadcrumb(activeNodeId), [activeNodeId]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 1800);
  };

  const addHistoryEntry = (entry: Omit<HistoryEntry, 'id'>) => {
    setHistoryEntries((prev) => [{ ...entry, id: `h-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` }, ...prev]);
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

  const showInStructure = (target: ShowInStructureTarget) => {
    let targetNodeId = activeNodeId;
    let nextTab: TabType | null = null;
    let nextSelection: Selection | null = null;

    if (target.kind === 'node') {
      targetNodeId = target.nodeId;
      nextSelection = { kind: 'node', id: target.nodeId };
    }

    if (target.kind === 'employee') {
      const employee = employees.find((item) => item.id === target.employeeId);
      if (!employee) return;
      targetNodeId = employee.departmentId;
      nextTab = 'people';
      nextSelection = { kind: 'employee', id: employee.id };
    }

    if (target.kind === 'position') {
      const position = positions.find((item) => item.id === target.positionId);
      if (!position) return;
      targetNodeId = position.departmentId;
      nextTab = 'positions';
      nextSelection = { kind: 'position', id: position.id };
    }

    if (target.kind === 'chat') {
      const chat = chats.find((item) => item.id === target.chatId);
      if (!chat) return;
      targetNodeId = chat.nodeId && orgNodes[chat.nodeId] ? chat.nodeId : chat.departmentId;
      nextTab = 'chats';
      nextSelection = { kind: 'chat', id: chat.id };
    }

    if (target.kind === 'file') {
      const file = files.find((item) => item.id === target.fileId);
      if (!file) return;
      targetNodeId = file.departmentId;
      nextTab = 'files';
      nextSelection = { kind: 'file', id: file.id };
    }

    if (!orgNodes[targetNodeId]) return;

    setActiveNodeId(targetNodeId);
    setSelection(nextSelection ?? { kind: 'node', id: targetNodeId });
    if (nextTab) setActiveTab(nextTab);
    setFocusNodeId(targetNodeId);
    showToast(`Показано в структуре: ${orgNodes[targetNodeId].name}`);
  };

  const scopedEmployees = (employeeOrderByDepartment[activeNodeId] ?? [])
    .map((id) => employees.find((employee) => employee.id === id))
    .filter((employee): employee is NonNullable<typeof employee> => Boolean(employee));
  const scopedPositions = positions.filter((item) => item.departmentId === activeNodeId);
  const scopedChats = chats.filter((item) => item.departmentId === activeNodeId || item.nodeId === activeNodeId);
  const scopedFiles = files.filter((item) => item.departmentId === activeNodeId);

  const reorderEmployeesInDepartment = (departmentId: string, draggedEmployeeId: string, targetEmployeeId: string) => {
    setEmployeeOrderByDepartment((prev) => {
      const list = [...(prev[departmentId] ?? [])];
      const fromIndex = list.indexOf(draggedEmployeeId);
      const toIndex = list.indexOf(targetEmployeeId);
      if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return prev;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { ...prev, [departmentId]: list };
    });
    showToast('Порядок сотрудников обновлен');
    addHistoryEntry({
      departmentId,
      eventType: 'reordered_nodes',
      description: 'Обновлён порядок сотрудников внутри подразделения',
      actor: 'Администратор',
      timeLabel: 'только что',
    });
  };

  return (
    <div className="app-shell">
      <div className="workspace-grid">
        <OrgTreeSidebar
          activeNodeId={activeNodeId}
          dragEnabled={structureSettings.dragAndDropEnabled}
          resetOrderSignal={resetStructureOrderSignal}
          focusNodeId={focusNodeId}
          onFocusHandled={() => setFocusNodeId(null)}
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
          onOpenStructureSettings={() => setIsStructureSettingsOpen(true)}
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
          onReorderEmployees={(draggedId, targetId) => reorderEmployeesInDepartment(activeNodeId, draggedId, targetId)}
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
          onOpenHistory={() => setIsHistoryDrawerOpen(true)}
          onShowInStructure={showInStructure}
          onAction={showToast}
        />
      </div>

      <StructureSettingsDrawer
        isOpen={isStructureSettingsOpen}
        settings={structureSettings}
        isResetConfirmOpen={isResetStructureConfirmOpen}
        onClose={() => {
          setIsStructureSettingsOpen(false);
          setIsResetStructureConfirmOpen(false);
        }}
        onToggleDrag={(value) => {
          setStructureSettings((prev) => ({ ...prev, dragAndDropEnabled: value }));
          showToast(value ? 'Drag-and-drop включен' : 'Drag-and-drop отключен');
          addHistoryEntry({
            departmentId: activeNodeId,
            eventType: 'settings_changed',
            description: `Изменена настройка drag-and-drop: ${value ? 'включено' : 'выключено'}`,
            actor: 'Администратор',
            timeLabel: 'только что',
          });
        }}
        onChangePermission={(field, value) => {
          setStructureSettings((prev) => ({ ...prev, [field]: value }));
          showToast('Настройка обновлена');
          addHistoryEntry({
            departmentId: activeNodeId,
            eventType: 'settings_changed',
            description: `Обновлены права в настройке "${field}"`,
            actor: 'Администратор',
            timeLabel: 'только что',
          });
        }}
        onAskResetOrder={() => setIsResetStructureConfirmOpen(true)}
        onCancelResetOrder={() => setIsResetStructureConfirmOpen(false)}
        onConfirmResetOrder={() => {
          setResetStructureOrderSignal((prev) => prev + 1);
          setIsResetStructureConfirmOpen(false);
          showToast('Пользовательский порядок сброшен');
          addHistoryEntry({
            departmentId: activeNodeId,
            eventType: 'reset_order',
            description: 'Сброшен пользовательский порядок',
            actor: 'Администратор',
            timeLabel: 'только что',
          });
        }}
      />

      <ChangeHistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        departmentId={activeNodeId}
        departmentName={activeNode.name}
        entries={historyEntries}
      />

      <AddEntityModal
        isOpen={isAddModalOpen}
        contextNode={orgNodes[addModalContextNodeId]}
        entityType={addModalEntityType}
        onEntityTypeChange={setAddModalEntityType}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(type) => {
          setIsAddModalOpen(false);
          showToast(`${submitLabelByEntityType[type]} добавлен(а): mock flow`);
          const eventTypeByEntity: Record<AddEntityType, HistoryEntry['eventType']> = {
            employee: 'added_employee',
            position: 'added_position',
            department: 'created_department',
            chat: 'created_chat',
            file: 'settings_changed',
          };
          addHistoryEntry({
            departmentId: addModalContextNodeId,
            eventType: eventTypeByEntity[type],
            description: `${submitLabelByEntityType[type]} добавлен(а): mock flow`,
            actor: 'Пользователь',
            timeLabel: 'только что',
          });
        }}
      />

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
