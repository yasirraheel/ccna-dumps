import React, { useEffect, useRef, useState } from 'react';
import { adminFetch } from '../../utils/adminApi';

const newTask = (index = 0) => ({
  id: `lab-task-${Date.now()}-${index}`,
  label: `Task ${index + 1}`,
  text: '',
  commandText: '',
  solutionImage: ''
});

const blankLab = () => ({
  id: '',
  title: '',
  itemLabel: '',
  topologyImage: '',
  sourceParts: [],
  tasks: [newTask(0)]
});

function AdminLabs() {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editor, setEditor] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState('');
  const [feedback, setFeedback] = useState(null);
  const topologyInputRef = useRef(null);

  const loadLabs = async () => {
    try {
      setLoading(true);
      const response = await adminFetch('/api/admin/labs');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to load labs.');
      setLabs(Array.isArray(data.labs) ? data.labs : []);
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to load labs.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadLabs(); }, []);

  const updateEditor = (patch) => setEditor((previous) => ({ ...previous, ...patch }));

  const uploadImage = async (file, type, onComplete, progressKey = type) => {
    if (!file) return;
    setUploading(progressKey);
    setFeedback(null);
    try {
      const form = new FormData();
      form.append('image', file);
      form.append('type', type);
      const response = await adminFetch('/api/admin/upload-image', { method: 'POST', body: form });
      const data = await response.json();
      if (!response.ok || !data.url) throw new Error(data.error || 'Image upload failed.');
      onComplete(data.url);
      setFeedback({ type: 'success', message: 'Image uploaded. Save the lab to publish this change.' });
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Image upload failed.' });
    } finally {
      setUploading('');
    }
  };

  const handleTopologyUpload = (event) => {
    const file = event.target.files?.[0];
    uploadImage(file, 'lab_topology', (url) => updateEditor({ topologyImage: url }));
    event.target.value = '';
  };

  const handleTaskUpload = (taskIndex, event) => {
    const file = event.target.files?.[0];
    uploadImage(file, 'lab_solution', (url) => {
      setEditor((previous) => {
        const tasks = [...previous.tasks];
        tasks[taskIndex] = { ...tasks[taskIndex], solutionImage: url };
        return { ...previous, tasks };
      });
    }, `lab_solution_${taskIndex}`);
    event.target.value = '';
  };

  const saveTaskImage = (taskIndex, file) => {
    uploadImage(file, 'lab_solution', (url) => {
      setEditor((previous) => {
        const tasks = [...previous.tasks];
        tasks[taskIndex] = { ...tasks[taskIndex], solutionImage: url };
        return { ...previous, tasks };
      });
    }, `lab_solution_${taskIndex}`);
  };

  const saveTaskReferenceImage = (taskIndex, file) => {
    uploadImage(file, 'lab_task', (url) => {
      setEditor((previous) => {
        const tasks = [...previous.tasks];
        tasks[taskIndex] = { ...tasks[taskIndex], taskImage: url };
        return { ...previous, tasks };
      });
    }, `lab_task_${taskIndex}`);
  };

  const handleTaskReferenceUpload = (taskIndex, event) => {
    const file = event.target.files?.[0];
    saveTaskReferenceImage(taskIndex, file);
    event.target.value = '';
  };

  const handleClipboardPaste = (event, target, taskIndex = null) => {
    const items = Array.from(event.clipboardData?.items || []);
    const imageItem = items.find((item) => item.kind === 'file' && item.type.startsWith('image/'));
    if (!imageItem) return;
    event.preventDefault();
    const file = imageItem.getAsFile();
    if (!file) return;
    if (target === 'topology') {
      uploadImage(file, 'lab_topology', (url) => updateEditor({ topologyImage: url }));
    } else if (target === 'task' && taskIndex !== null) {
      saveTaskReferenceImage(taskIndex, file);
    } else if (taskIndex !== null) {
      saveTaskImage(taskIndex, file);
    }
  };

  const updateTask = (taskIndex, patch) => {
    setEditor((previous) => {
      const tasks = [...previous.tasks];
      tasks[taskIndex] = { ...tasks[taskIndex], ...patch };
      return { ...previous, tasks };
    });
  };

  const addTask = () => {
    setEditor((previous) => ({ ...previous, tasks: [...previous.tasks, newTask(previous.tasks.length)] }));
  };

  const removeTask = (taskIndex) => {
    setEditor((previous) => ({
      ...previous,
      tasks: previous.tasks.filter((_, index) => index !== taskIndex).map((task, index) => ({
        ...task,
        label: task.label || `Task ${index + 1}`
      }))
    }));
  };

  const openCreate = () => {
    setFeedback(null);
    setEditor(blankLab());
  };

  const openEdit = (lab) => {
    setFeedback(null);
    const topologyPart = (lab.sourceParts || []).find((part) => /topology/i.test(`${part?.id || ''} ${part?.alt || ''}`)) || lab.sourceParts?.[0];
    setEditor({
      id: lab.id || '',
      title: lab.title || '',
      itemLabel: lab.labItemLabel || lab.itemLabel || '',
      topologyImage: lab.topologyImage || lab.sourceImage || topologyPart?.src || '',
      sourceParts: Array.isArray(lab.sourceParts) ? lab.sourceParts : [],
      sourceWidth: lab.sourceWidth || '',
      sourceHeight: lab.sourceHeight || '',
      sourceDisplayWidth: lab.sourceDisplayWidth || '',
      sourceDisplayHeight: lab.sourceDisplayHeight || '',
      topologyCropHeight: lab.topologyCropHeight || '',
      tasks: Array.isArray(lab.tasks) && lab.tasks.length > 0
        ? lab.tasks.map((task, index) => ({ ...newTask(index), ...task }))
        : [newTask(0)]
    });
  };

  const saveLab = async (event) => {
    event.preventDefault();
    if (!editor?.title.trim() || !editor?.itemLabel.trim() || !editor?.topologyImage) {
      setFeedback({ type: 'error', message: 'Add a lab name, item label, and topology image.' });
      return;
    }
    if (editor.tasks.some((task) => !task.text.trim())) {
      setFeedback({ type: 'error', message: 'Every task needs written instructions.' });
      return;
    }
    setSaving(true);
    try {
      const response = await adminFetch('/api/admin/labs', {
        method: 'POST',
        body: JSON.stringify(editor)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to save lab.');
      setFeedback({ type: 'success', message: 'Lab saved successfully.' });
      setEditor(null);
      await loadLabs();
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to save lab.' });
    } finally {
      setSaving(false);
    }
  };

  const deleteLab = async (lab) => {
    if (!window.confirm(`Delete ${lab.title || lab.id}? This cannot be undone.`)) return;
    try {
      const response = await adminFetch(`/api/admin/labs/${encodeURIComponent(lab.id)}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to delete lab.');
      setFeedback({ type: 'success', message: 'Lab deleted.' });
      loadLabs();
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to delete lab.' });
    }
  };

  return (
    <div className="admin-labs-view">
      {feedback && (
        <div className={`admin-lab-feedback ${feedback.type}`} role="status">
          <span>{feedback.message}</span>
          <button type="button" onClick={() => setFeedback(null)} aria-label="Dismiss">×</button>
        </div>
      )}

      <div className={`admin-card admin-lab-list-shell ${editor ? 'is-editing' : ''}`}>
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title"><span>🧪</span> Guided Labs</h3>
            <p className="admin-lab-description">
              Create Labs with an original topology, written task instructions, and a revealable command solution for every task.
            </p>
          </div>
          <button type="button" className="btn-admin-primary" onClick={openCreate}>+ Add Lab</button>
        </div>

        {loading ? (
          <div className="admin-empty-state">Loading labs…</div>
        ) : labs.length === 0 ? (
          <div className="admin-empty-state">
            <strong>No labs yet.</strong>
            <span>Create a guided lab here. Every lab in this list can be edited or removed.</span>
          </div>
        ) : (
          <div className="admin-lab-list">
            {labs.map((lab) => (
              <article key={lab.id} className="admin-lab-row">
                <div className="admin-lab-thumb">
                  {lab.topologyImage ? <img src={lab.topologyImage} alt="" /> : lab.sourceParts?.[0]?.src ? <img src={lab.sourceParts[0].src} alt="" /> : <span>LAB</span>}
                </div>
                <div className="admin-lab-row-copy">
                  <div className="admin-lab-row-title">{lab.title || lab.questionNo || lab.id}</div>
                  <div className="admin-lab-row-meta">{lab.labItemLabel} · {(lab.tasks || []).length} task{(lab.tasks || []).length === 1 ? '' : 's'}</div>
                </div>
                <div className="admin-lab-row-actions">
                  <button type="button" className="btn-table-action" onClick={() => openEdit(lab)}>Edit</button>
                  <button type="button" className="btn-table-action danger" onClick={() => deleteLab(lab)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {editor && (
          <form className="admin-card admin-lab-editor-page" onSubmit={saveLab}>
            <div className="admin-card-header admin-lab-editor-header">
              <div>
                <h3 className="admin-card-title"><span>🧪</span> {editor.id ? 'Edit Guided Lab' : 'Add Guided Lab'}</h3>
                <p className="admin-lab-modal-subtitle">Upload original artwork, then build the task-by-task reveal in one workspace.</p>
              </div>
              <button type="button" className="btn-admin-secondary" onClick={() => setEditor(null)}>← Back to Labs</button>
            </div>

            <div className="admin-lab-editor-body">
              <div className="admin-lab-form-grid">
                <label className="admin-field-label">
                  Lab name
                  <input className="admin-input" value={editor.title} onChange={(event) => updateEditor({ title: event.target.value })} placeholder="e.g. VLAN & EtherChannel Lab" />
                </label>
                <label className="admin-field-label">
                  Item label
                  <input className="admin-input" value={editor.itemLabel} onChange={(event) => updateEditor({ itemLabel: event.target.value })} placeholder="e.g. ITEM 6 OF 27" />
                </label>
              </div>

              <section className="admin-lab-upload-panel">
                <div>
                  <div className="admin-section-heading">Topology image</div>
                  <p>Use the original topology screenshot. It will be shown before the learner reveals tasks.</p>
                </div>
                <div
                  className="admin-lab-upload-row admin-lab-paste-zone"
                  tabIndex="0"
                  onPaste={(event) => handleClipboardPaste(event, 'topology')}
                  title="Click here and press Ctrl+V to paste an image"
                >
                  {editor.topologyImage && <img className="admin-lab-upload-preview" src={editor.topologyImage} alt="Topology preview" />}
                  <span className="admin-lab-paste-hint">Click here, then press <kbd>Ctrl</kbd> + <kbd>V</kbd> to paste an image</span>
                  <button type="button" className="btn-admin-secondary" onClick={() => topologyInputRef.current?.click()} disabled={uploading === 'lab_topology'}>
                    {uploading === 'lab_topology' ? 'Uploading…' : editor.topologyImage ? 'Replace topology' : 'Upload topology'}
                  </button>
                  {editor.topologyImage && (
                    <button type="button" className="admin-text-danger" onClick={() => updateEditor({ topologyImage: '' })}>
                      Remove image
                    </button>
                  )}
                  <input ref={topologyInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={handleTopologyUpload} hidden />
                </div>
              </section>

              <div className="admin-lab-tasks-heading">
                <div>
                  <div className="admin-section-heading">Tasks and solutions</div>
                  <p>Each task can include learner-facing instructions, typed CLI commands, and an original command screenshot.</p>
                </div>
              </div>

              <div className="admin-lab-task-editor-list">
                {editor.tasks.map((task, taskIndex) => (
                  <section key={task.id || taskIndex} className="admin-lab-task-editor">
                    <div className="admin-lab-task-editor-header">
                      <span className="admin-lab-task-index">{taskIndex + 1}</span>
                      <input className="admin-input admin-task-label-input" value={task.label} onChange={(event) => updateTask(taskIndex, { label: event.target.value })} aria-label={`Task ${taskIndex + 1} label`} />
                      {editor.tasks.length > 1 && <button type="button" className="admin-text-danger" onClick={() => removeTask(taskIndex)}>Remove</button>}
                    </div>
                    <label className="admin-field-label">
                      Task instructions
                      <textarea className="admin-textarea" rows="4" value={task.text} onChange={(event) => updateTask(taskIndex, { text: event.target.value })} placeholder="Write exactly what the learner must configure…" />
                    </label>
                    <label className="admin-field-label">
                      Task written content (optional)
                      <textarea className="admin-textarea" rows="4" value={task.taskText || ''} onChange={(event) => updateTask(taskIndex, { taskText: event.target.value })} placeholder="Add extra task details, addressing tables, or reference notes…" />
                    </label>
                    <div
                      className="admin-task-screenshot-row admin-lab-paste-zone admin-task-reference-upload"
                      tabIndex="0"
                      onPaste={(event) => handleClipboardPaste(event, 'task', taskIndex)}
                      title="Click here and press Ctrl+V to paste a task screenshot"
                    >
                      <div>
                        <div className="admin-field-label">Task screenshot (optional)</div>
                        {task.taskImage && <img className="admin-task-screenshot-preview" src={task.taskImage} alt={`Reference for ${task.label}`} />}
                        <div className="admin-lab-paste-hint">Click here, then press <kbd>Ctrl</kbd> + <kbd>V</kbd> to paste a task screenshot</div>
                        {task.taskImage && (
                          <button type="button" className="admin-text-danger admin-remove-image-button" onClick={() => updateTask(taskIndex, { taskImage: '' })}>
                            Remove task screenshot
                          </button>
                        )}
                      </div>
                      <label className="btn-admin-secondary admin-upload-button">
                        {uploading === `lab_task_${taskIndex}` ? 'Uploading…' : task.taskImage ? 'Replace task screenshot' : 'Attach task screenshot'}
                        <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(event) => handleTaskReferenceUpload(taskIndex, event)} hidden />
                      </label>
                    </div>
                    <label className="admin-field-label">
                      Written commands (optional)
                      <textarea className="admin-textarea admin-command-textarea" rows="6" value={task.commandText || ''} onChange={(event) => updateTask(taskIndex, { commandText: event.target.value })} placeholder="R1# configure terminal&#10;R1(config)# …" />
                    </label>
                    <div
                      className="admin-task-screenshot-row admin-lab-paste-zone"
                      tabIndex="0"
                      onPaste={(event) => handleClipboardPaste(event, 'solution', taskIndex)}
                      title="Click here and press Ctrl+V to paste a command screenshot"
                    >
                      <div>
                        <div className="admin-field-label">Command screenshot (optional)</div>
                        {task.solutionImage && <img className="admin-task-screenshot-preview" src={task.solutionImage} alt={`Solution for ${task.label}`} />}
                        <div className="admin-lab-paste-hint">Click here, then press <kbd>Ctrl</kbd> + <kbd>V</kbd> to paste a screenshot</div>
                        {task.solutionImage && (
                          <button type="button" className="admin-text-danger admin-remove-image-button" onClick={() => updateTask(taskIndex, { solutionImage: '' })}>
                            Remove screenshot
                          </button>
                        )}
                      </div>
                      <label className="btn-admin-secondary admin-upload-button">
                        {uploading === `lab_solution_${taskIndex}` ? 'Uploading…' : task.solutionImage ? 'Replace screenshot' : 'Attach screenshot'}
                        <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(event) => handleTaskUpload(taskIndex, event)} hidden />
                      </label>
                    </div>
                  </section>
                ))}
              </div>
              <button type="button" className="btn-admin-primary admin-add-task-button admin-add-task-bottom" onClick={addTask}>
                + Add another task
              </button>
            </div>

            <div className="admin-modal-footer admin-lab-editor-footer">
              <button type="button" className="btn-admin-secondary" onClick={() => setEditor(null)}>Cancel</button>
              <button type="submit" className="btn-admin-primary" disabled={saving || Boolean(uploading)}>{saving ? 'Saving…' : 'Save Lab'}</button>
            </div>
          </form>
      )}
    </div>
  );
}

export default AdminLabs;
