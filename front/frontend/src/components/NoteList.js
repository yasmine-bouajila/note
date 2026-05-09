import NoteItem from './NoteItem';

export default function NoteList({ notes, onEdit, onDelete }) {
  if (!notes?.length) {
    return (
      <div className="card">
        <h2>Mes notes</h2>
        <p>Aucune note pour le moment. Ajoutez une première note.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="top-actions" style={{ justifyContent: 'space-between' }}>
        <h2>Mes notes</h2>
        <span>{notes.length} note(s)</span>
      </div>
      <div className="note-grid">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
