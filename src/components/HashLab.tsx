import { DragEvent, useMemo, useState } from "react";

type HashState = {
  fileName: string;
  hash: string;
  sizeKb: string;
};

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function digestSha256(file: File): Promise<HashState> {
  const data = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return {
    fileName: file.name,
    hash: toHex(hashBuffer),
    sizeKb: (file.size / 1024).toFixed(2),
  };
}

export default function HashLab() {
  const [isOver, setIsOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HashState | null>(null);
  const [error, setError] = useState<string | null>(null);

  const placeholder = useMemo(() => {
    return loading
      ? "Hashing file locally..."
      : "Drop a file here or choose one manually.";
  }, [loading]);

  const handleFile = async (file: File | null) => {
    if (!file) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const hashResult = await digestSha256(file);
      setResult(hashResult);
    } catch {
      setError("Failed to hash the file in your browser.");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = async (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsOver(false);
    await handleFile(event.dataTransfer.files?.[0] ?? null);
  };

  return (
    <section id="lab" className="panel lab">
      <header className="panel__header">
        <p className="panel__eyebrow">Lab</p>
        <h2>Local SHA-256 Hash Sandbox</h2>
      </header>

      <p className="lab__copy">
        This demo computes a file hash directly in your browser. No upload. No
        backend roundtrip.
      </p>

      <label
        className={`dropzone ${isOver ? "is-over" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={onDrop}
      >
        <input
          type="file"
          onChange={async (event) => {
            await handleFile(event.target.files?.[0] ?? null);
          }}
        />
        <span>{placeholder}</span>
      </label>

      {error ? <p className="lab__error">{error}</p> : null}

      {result ? (
        <article className="hash-result" aria-live="polite">
          <p>
            <strong>File:</strong> {result.fileName}
          </p>
          <p>
            <strong>Size:</strong> {result.sizeKb} KB
          </p>
          <p>
            <strong>SHA-256:</strong>
          </p>
          <code>{result.hash}</code>
        </article>
      ) : null}
    </section>
  );
}
