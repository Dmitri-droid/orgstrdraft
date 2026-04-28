import { OrgNode } from '../../types/models';

export function AboutTab({ node, nodeTypeLabel }: { node: OrgNode; nodeTypeLabel: string }) {
  return (
    <section className="about-grid">
      <div><strong>Название</strong><div>{node.name}</div></div>
      <div><strong>Тип узла</strong><div>{nodeTypeLabel}</div></div>
      <div><strong>Руководитель</strong><div>{node.leader}</div></div>
      <div><strong>Количество сотрудников</strong><div>{node.summary.people}</div></div>
      <div><strong>Количество подгрупп</strong><div>{node.childrenIds.length}</div></div>
      <div><strong>Количество чатов</strong><div>{node.summary.chats}</div></div>
      <div><strong>Описание</strong><div>{node.description}</div></div>
      <div><strong>Дата создания</strong><div>{node.createdAt}</div></div>
      <div><strong>Связанные сущности</strong><div>Чаты, файлы, должности, сотрудники</div></div>
    </section>
  );
}
