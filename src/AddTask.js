import { useState } from 'react';

export default function AddTask({ onCreated, apiBase = 'http://localhost:4000' }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Open',
    due_date: ''
  });
  const [loading, setLoading] = useState(false);

  async function submit(e){
    e.preventDefault();
    setLoading(true);
    const payload = { ...form, due_date: form.due_date || null };
    const res = await fetch(`${apiBase}/tasks`, {
      method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload)
    });
    if (res.ok) {
      setForm({ title:'', description:'', priority:'Medium', status:'Open', due_date:'' });
      onCreated && onCreated();
    } else {
      const err = await res.json();
      alert(err.error || 'Failed');
    }
    setLoading(false);
  }

  return (
    <form onSubmit={submit}>
      <h3>Add Task</h3>
      <div>
        <input required placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
      </div>
      <div>
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
      </div>
      <div>
        <label>Priority</label>
        <select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}>
          <option>Low</option><option>Medium</option><option>High</option>
        </select>
        <label style={{marginLeft:10}}>Status</label>
        <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
          <option>Open</option><option>In Progress</option><option>Done</option><option>Blocked</option>
        </select>
      </div>
      <div>
        <label>Due date</label>
        <input type="date" value={form.due_date} onChange={e=>setForm({...form,due_date:e.target.value})}/>
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Task'}</button>
    </form>
  );
}
