import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

export type PaletteAction = {
  id: string;
  label: string;
  hint?: string;
  run: () => void;
};

type CommandPaletteProps = {
  isOpen: boolean;
  onClose: () => void;
  actions: PaletteAction[];
};

export default function CommandPalette({
  isOpen,
  onClose,
  actions,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return actions;
    }
    return actions.filter((item) => {
      return `${item.label} ${item.hint ?? ""}`
        .toLowerCase()
        .includes(normalized);
    });
  }, [actions, query]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const first = filtered[0];
    if (!first) {
      return;
    }
    first.run();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="palette"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <button
        className="palette__backdrop"
        type="button"
        aria-label="Close command palette"
        onClick={onClose}
      />
      <div className="palette__panel">
        <form onSubmit={onSubmit}>
          <input
            ref={inputRef}
            className="palette__input"
            type="text"
            placeholder="Type a command..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>
        <ul
          className="palette__list"
          role="listbox"
          aria-label="Available commands"
        >
          {filtered.length ? (
            filtered.map((action) => (
              <li key={action.id}>
                <button
                  className="palette__item"
                  type="button"
                  onClick={() => {
                    action.run();
                    onClose();
                  }}
                >
                  <span>{action.label}</span>
                  {action.hint ? <small>{action.hint}</small> : null}
                </button>
              </li>
            ))
          ) : (
            <li className="palette__empty">No command found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
