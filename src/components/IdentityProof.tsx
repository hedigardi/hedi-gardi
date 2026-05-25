import { useEffect, useState } from "react";
import { identityProof } from "../data/identityProof";

type VerifyState = "idle" | "verifying" | "verified" | "failed";

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

async function waitForMinimumDuration(startedAt: number, minVisibleMs: number) {
  const elapsed = performance.now() - startedAt;
  if (elapsed >= minVisibleMs) {
    return;
  }

  await new Promise((resolve) =>
    window.setTimeout(resolve, minVisibleMs - elapsed),
  );
}

export default function IdentityProof() {
  const [state, setState] = useState<VerifyState>("idle");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const isVerifying = state === "verifying";
  const shortFingerprint = `${identityProof.publicKeyJwk.x.slice(0, 14)}...${identityProof.publicKeyJwk.y.slice(-10)}`;

  const verifyProof = async () => {
    const minVisibleMs = 500;
    const startedAt = performance.now();

    try {
      setState("verifying");

      const encoder = new TextEncoder();
      const payload = encoder.encode(identityProof.message);
      const signature = base64ToArrayBuffer(identityProof.signatureBase64);

      const publicKey = await crypto.subtle.importKey(
        "jwk",
        identityProof.publicKeyJwk,
        {
          name: "ECDSA",
          namedCurve: "P-256",
        },
        false,
        ["verify"],
      );

      const verified = await crypto.subtle.verify(
        {
          name: "ECDSA",
          hash: "SHA-256",
        },
        publicKey,
        signature,
        payload,
      );

      await waitForMinimumDuration(startedAt, minVisibleMs);

      setState(verified ? "verified" : "failed");
    } catch {
      await waitForMinimumDuration(startedAt, minVisibleMs);
      setState("failed");
    }
  };

  useEffect(() => {
    void verifyProof();
  }, []);

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1600);
    } catch {
      setCopyState("error");
      window.setTimeout(() => setCopyState("idle"), 1600);
    }
  };

  return (
    <section id="identity" className="panel identity">
      <header className="panel__header">
        <p className="panel__eyebrow">Identity</p>
        <h2>Cryptographic Proof of Site Ownership</h2>
      </header>

      <p className="identity__copy">
        This message is signed and verified in your browser using an embedded
        public key.
      </p>

      <article className="identity__box">
        <p>
          <strong>Message:</strong> {identityProof.message}
        </p>
        <p>
          <strong>Key fingerprint:</strong> {shortFingerprint}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`identity__status identity__status--${state}`}>
            {state === "verifying"
              ? "Verifying..."
              : state === "verified"
                ? "Verified"
                : state === "failed"
                  ? "Verification failed"
                  : "Idle"}
          </span>
        </p>
      </article>

      <div className="identity__actions">
        <button
          className={`identity__button ${isVerifying ? "identity__button--working" : ""}`}
          type="button"
          disabled={isVerifying}
          aria-busy={isVerifying}
          onClick={() => void verifyProof()}
        >
          {isVerifying ? (
            <>
              <span className="identity__spinner" aria-hidden="true" />
              Re-verifying...
            </>
          ) : (
            "Re-verify signature"
          )}
        </button>
        <button
          className="identity__button"
          type="button"
          onClick={() =>
            void copyToClipboard(JSON.stringify(identityProof.publicKeyJwk))
          }
        >
          Copy public key (JWK)
        </button>
        <button
          className="identity__button"
          type="button"
          onClick={() => void copyToClipboard(identityProof.signatureBase64)}
        >
          Copy signature
        </button>
      </div>

      {copyState !== "idle" ? (
        <p
          className={`identity__copy-feedback identity__copy-feedback--${copyState}`}
        >
          {copyState === "copied"
            ? "Copied to clipboard."
            : "Clipboard unavailable."}
        </p>
      ) : null}
    </section>
  );
}
