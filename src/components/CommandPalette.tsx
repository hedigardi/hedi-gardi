import {
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFocusTrap } from "../hooks/useFocusTrap";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, isOpen);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
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

  // Clamp the cursor to the visible list so it never points at a hidden item
  // when typing shrinks the results.
  const safeIndex = Math.min(activeIndex, Math.max(filtered.length - 1, 0));
  const activeAction = filtered[safeIndex];
  const activeId = activeAction
    ? `palette-option-${activeAction.id}`
    : undefined;

  const runAction = (index: number) => {
    const action = filtered[index];
    if (!action) {
      return;
    }
    action.run();
    onClose();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runAction(safeIndex);
  };

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) =>
        filtered.length ? (current + 1) % filtered.length : 0,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) =>
        filtered.length
          ? (current - 1 + filtered.length) % filtered.length
          : 0,
      );
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(Math.max(filtered.length - 1, 0));
    }
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
      <div className="palette__panel" ref={panelRef}>
        <form onSubmit={onSubmit}>
          <input
            ref={inputRef}
            className="palette__input"
            type="text"
            placeholder="Type a command..."
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={activeId}
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
          />
        </form>
        <ul
          id="palette-list"
          className="palette__list"
          role="listbox"
          aria-label="Available commands"
        >
          {filtered.length ? (
            filtered.map((action, index) => (
              <li key={action.id}>
                <button
                  id={`palette-option-${action.id}`}
                  className={`palette__item${index === safeIndex ? " palette__item--active" : ""}`}
                  type="button"
                  role="option"
                  aria-selected={index === safeIndex}
                  tabIndex={-1}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => runAction(index)}
                >
                  <span>{action.label}</span>
                  {action.hint ? <small>{action.hint}</small> : null}
                </button>
              </li>
            ))
          ) : (
            <li className="palette__empty" role="option" aria-disabled="true">
              No command found.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
