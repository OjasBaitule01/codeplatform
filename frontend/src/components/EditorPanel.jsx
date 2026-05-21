export default function EditorPanel({ code, setCode, onSubmit, status }) {
  return (
    <section className="editor-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center' }}>
        <h2>Code Editor</h2>
        <span className="badge">{status}</span>
      </div>
      <textarea value={code} onChange={(event) => setCode(event.target.value)} placeholder="Write your code here..." />
      <button className="btn-primary" onClick={onSubmit}>Submit Code</button>
    </section>
  );
}
