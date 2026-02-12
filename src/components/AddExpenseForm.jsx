import { useState, useEffect } from 'react'

function AddExpenseForm({ onSubmit, onCancel, editingExpense }) {

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')

    // Pre-fill form when editing an existing expense
    useEffect(() => {
        if (editingExpense) {
            setTitle(editingExpense.title)
            setPrice(String(editingExpense.amount))
            setCategory(editingExpense.category)
            setDate(editingExpense.date)
        }
    }, [editingExpense])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title || !price || !category || !date) return
        if (Number(price) <= 0) return

        const success = onSubmit({
            id: editingExpense ? editingExpense.id : Date.now(),  // Keep same ID when editing
            title: title,
            amount: Number(price),
            category: category,
            date: date
        })

        if (success) {
            setTitle('')
            setPrice('')
            setCategory('')
            setDate('')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>{editingExpense ? 'Edit Expense' : 'Add Expenses'}</h3>
            <div className="form-row">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input"
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="input"
                    required
                />
            </div>
            <div className="form-row">
                <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input"
                    required
                >
                    <option value="" disabled>Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Travel">Travel</option>
                </select>
                <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="input"
                    required
                />
            </div>
            <div className="form-row">
                <button type="submit" className="btn btn-submit">
                    {editingExpense ? 'Edit Expense' : 'Add Expense'}
                </button>
                <button type="button" className="btn btn-cancel" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default AddExpenseForm
