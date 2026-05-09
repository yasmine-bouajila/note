import { useState } from 'react';
import NoteItem from './NoteItem';

const PRIORITIES = ['Toutes', 'Haute', 'Moyenne', 'Basse'];

export default function NoteList({ notes, onEdit, onDelete }) {
  const [filter, setFilter] = useState('Toutes');

  const filteredNotes =
    filter === 'Toutes'
      ? notes
      : notes.filter((note) => note.priority === filter);

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
        <span>{filteredNotes.length} note(s)</span>
      </div>

      {/* Boutons de filtre */}
      <div className="filter-bar">
        {PRIORITIES.map((p) => (
          <button
            key={p}
            type="button"
            className={`filter-btn filter-btn--${p.toLowerCase()} ${filter === p ? 'active' : ''}`}
            onClick={() => setFilter(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {filteredNotes.length === 0 ? (
        <p>Aucune note avec la priorité « {filter} ».</p>
      ) : (
        <div className="note-grid">
          {filteredNotes.map((note) => (
            <NoteItem key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}