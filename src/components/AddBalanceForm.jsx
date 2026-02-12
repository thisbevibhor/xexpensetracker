import { useState } from "react"

function AddBalanceForm({ onSubmit, onCancel }) {
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!amount || Number(amount) <= 0) return
        onSubmit(Number(amount))
        setAmount('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Balance</h3>
            <div className="form-row">
                <input type="number" placeholder="Income Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="input" required />
                <button type="submit" className="btn btn-submit">Add Balance</button>
                <button type="button" className="btn btn-cancel" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default AddBalanceForm