import React, { useState, useEffect } from 'react';

function AdminUsers({ currentUser, isCreateOpen, onCloseCreate }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [actionFeedback, setActionFeedback] = useState(null);

  // New User Form State
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: 'Password123!',
    role: 'user',
    plan: 'free',
    isVerified: true
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams();
      if (search) query.append('search', search);
      if (roleFilter) query.append('role', roleFilter);
      if (statusFilter) query.append('status', statusFilter);

      const res = await fetch(`/api/admin/users?${query.toString()}`);
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
      }
    } catch (e) {
      console.error('Fetch users error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, roleFilter, statusFilter]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserData)
      });
      const data = await res.json();
      if (res.ok) {
        setActionFeedback({ type: 'success', message: 'Candidate account created successfully!' });
        onCloseCreate();
        setNewUserData({ name: '', email: '', password: 'Password123!', role: 'user', plan: 'free', isVerified: true });
        fetchUsers();
      } else {
        setActionFeedback({ type: 'error', message: data.error || 'Failed to create user.' });
      }
    } catch (err) {
      setActionFeedback({ type: 'error', message: 'Network error creating user.' });
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser)
      });
      const data = await res.json();
      if (res.ok) {
        setActionFeedback({ type: 'success', message: 'User updated successfully!' });
        setEditingUser(null);
        fetchUsers();
      } else {
        setActionFeedback({ type: 'error', message: data.error || 'Failed to update user.' });
      }
    } catch (err) {
      setActionFeedback({ type: 'error', message: 'Network error updating user.' });
    }
  };

  const handleDeleteUser = async (user) => {
    if (user.email === 'candidate@ccna.com') {
      alert('Cannot delete primary demo admin account.');
      return;
    }
    if (!window.confirm(`Are you sure you want to permanently delete user "${user.name}" (${user.email})? All their exam history will be erased.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, { method: 'DELETE' });
      if (res.ok) {
        setActionFeedback({ type: 'success', message: 'User deleted.' });
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete user.');
      }
    } catch (e) {
      alert('Network error deleting user.');
    }
  };

  const handleToggleVerify = async (user) => {
    try {
      const updated = { ...user, isVerified: user.is_verified ? 0 : 1 };
      await fetch(`/api/admin/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      fetchUsers();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="admin-users-view">
      {/* FEEDBACK TOAST */}
      {actionFeedback && (
        <div
          style={{
            padding: '12px 18px',
            borderRadius: '8px',
            marginBottom: '20px',
            background: actionFeedback.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${actionFeedback.type === 'success' ? '#22c55e' : '#ef4444'}`,
            color: actionFeedback.type === 'success' ? '#4ade80' : '#fca5a5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span>{actionFeedback.message}</span>
          <button
            type="button"
            onClick={() => setActionFeedback(null)}
            style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <span>👥</span> Candidates Management ({users.length})
          </h3>

          <div className="admin-card-actions">
            <input
              type="text"
              className="admin-search-input"
              placeholder="Search candidate by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="admin-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="admin">Admins</option>
              <option value="user">Standard Users</option>
            </select>

            <select
              className="admin-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="verified">Verified Only</option>
              <option value="unverified">Pending Verification</option>
            </select>

            <button
              type="button"
              className="btn-admin-primary"
              onClick={() => {
                setNewUserData({ name: '', email: '', password: 'Password123!', role: 'user', plan: 'free', isVerified: true });
                onCloseCreate(true);
              }}
            >
              + New Candidate
            </button>
          </div>
        </div>

        {/* USERS DATA TABLE */}
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Role</th>
                <th>Current Plan</th>
                <th>Status</th>
                <th>Exams Taken</th>
                <th>Joined Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                    Loading candidates database...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    No candidates found matching filter criteria.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: u.role === 'admin' ? '#a855f7' : '#22c55e',
                            color: '#090d16',
                            fontWeight: 800,
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {(u.name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#f8fafc' }}>{u.name}</div>
                          <div style={{ fontSize: '12px', color: '#94a3b8' }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge-pill ${u.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                        {u.role === 'admin' ? '🛡️ Admin' : '👤 User'}
                      </span>
                    </td>
                    <td>
                      <span className="badge-pill badge-pro">
                        {u.plan ? u.plan.toUpperCase() : 'FREE'}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleToggleVerify(u)}
                        className={`badge-pill ${u.is_verified ? 'badge-verified' : 'badge-unverified'}`}
                        style={{ cursor: 'pointer', border: '1px solid currentColor' }}
                        title="Click to toggle verification status"
                      >
                        {u.is_verified ? '✓ Verified' : '⏳ Pending'}
                      </button>
                    </td>
                    <td>
                      <strong style={{ color: '#38bdf8' }}>{u.attempts_count || 0}</strong> exams
                    </td>
                    <td style={{ fontSize: '12px', color: '#94a3b8' }}>
                      {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <div className="admin-actions-cell">
                        <button
                          type="button"
                          className="btn-table-action btn-table-edit"
                          onClick={() => setEditingUser(u)}
                          title="Edit Candidate Details"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          className="btn-table-action btn-table-delete"
                          onClick={() => handleDeleteUser(u)}
                          disabled={u.email === 'candidate@ccna.com'}
                          title={u.email === 'candidate@ccna.com' ? "Primary admin cannot be deleted" : "Delete Candidate"}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT USER MODAL */}
      {editingUser && (
        <div className="admin-modal-backdrop" onClick={() => setEditingUser(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h4 className="admin-modal-title">Edit Candidate: {editingUser.name}</h4>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setEditingUser(null)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleUpdateUser}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Full Name</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={editingUser.name || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Email Address</label>
                  <input
                    type="email"
                    className="admin-form-input"
                    value={editingUser.email || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">System Role</label>
                    <select
                      className="admin-select"
                      value={editingUser.role || 'user'}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    >
                      <option value="user">User (Candidate)</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Access Plan</label>
                    <select
                      className="admin-select"
                      value={editingUser.plan || 'free'}
                      onChange={(e) => setEditingUser({ ...editingUser, plan: e.target.value })}
                    >
                      <option value="free">Free Study Pass</option>
                      <option value="pro">CCNA Pro Pass</option>
                      <option value="unlimited">CCNA Unlimited Pass</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Set New Password (optional)</label>
                  <input
                    type="password"
                    className="admin-form-input"
                    placeholder="Leave blank to keep current password"
                    value={editingUser.password || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                  />
                </div>

                <div className="admin-form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    id="editIsVerified"
                    checked={Boolean(editingUser.is_verified)}
                    onChange={(e) => setEditingUser({ ...editingUser, is_verified: e.target.checked ? 1 : 0 })}
                  />
                  <label htmlFor="editIsVerified" className="admin-form-label" style={{ margin: 0, cursor: 'pointer' }}>
                    Mark email address as Verified
                  </label>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="btn-admin-secondary"
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-admin-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEW USER MODAL */}
      {isCreateOpen && (
        <div className="admin-modal-backdrop" onClick={() => onCloseCreate(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h4 className="admin-modal-title">Create New Candidate</h4>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => onCloseCreate(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateUser}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Candidate Name</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    placeholder="e.g. Alex Johnson"
                    value={newUserData.name}
                    onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Email Address</label>
                  <input
                    type="email"
                    className="admin-form-input"
                    placeholder="e.g. candidate@example.com"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Default Password</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={newUserData.password}
                    onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Role</label>
                    <select
                      className="admin-select"
                      value={newUserData.role}
                      onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                    >
                      <option value="user">User (Candidate)</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Assigned Plan</label>
                    <select
                      className="admin-select"
                      value={newUserData.plan}
                      onChange={(e) => setNewUserData({ ...newUserData, plan: e.target.value })}
                    >
                      <option value="free">Free Study Pass</option>
                      <option value="pro">CCNA Pro Pass</option>
                      <option value="unlimited">CCNA Unlimited Pass</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    id="newIsVerified"
                    checked={newUserData.isVerified}
                    onChange={(e) => setNewUserData({ ...newUserData, isVerified: e.target.checked })}
                  />
                  <label htmlFor="newIsVerified" className="admin-form-label" style={{ margin: 0, cursor: 'pointer' }}>
                    Pre-verify email address (no OTP required)
                  </label>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="btn-admin-secondary"
                  onClick={() => onCloseCreate(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-admin-primary">
                  Create Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
