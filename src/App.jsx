import { useState } from 'react'
import './App.css'
import BalanceCard from './components/BalanceCard'
import Modal from './components/Modal'
import AddBalanceForm from './components/AddBalanceForm'
import AddExpenseForm from './components/AddExpenseForm'
import TransactionList from './components/TransactionList'

function App() {
  const [balance, setBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);  // Track which expense is being edited

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // --- HANDLER FUNCTIONS ---

  // When user submits the Add Balance form
  const handleAddBalance = (amount) => {
    setBalance(prev => prev + amount)
    setShowAddBalance(false)
  }

  // When user submits the Add Expense form (new expense)
  const handleAddExpense = (expense) => {
    if (expense.amount > balance) {
      alert("You don't have enough balance!")
      return false
    }
    setExpenses(prev => [...prev, expense])
    setBalance(prev => prev - expense.amount)
    setShowAddExpense(false)
    return true
  }

  // When user submits edited expense
  const handleUpdateExpense = (updatedExpense) => {
    const oldExpense = expenses.find(exp => exp.id === updatedExpense.id)
    const amountDiff = updatedExpense.amount - oldExpense.amount

    // Check if increased amount exceeds balance
    if (amountDiff > balance) {
      alert("You don't have enough balance!")
      return false
    }

    setExpenses(prev => prev.map(exp =>
      exp.id === updatedExpense.id ? updatedExpense : exp
    ))
    setBalance(prev => prev - amountDiff)
    setEditingExpense(null)
    return true
  }

  // Delete an expense: remove from list, add amount back to balance
  const handleDeleteExpense = (id) => {
    const expense = expenses.find(exp => exp.id === id)
    setExpenses(prev => prev.filter(exp => exp.id !== id))
    setBalance(prev => prev + expense.amount)
  }

  // Edit: open modal with pre-filled data
  const handleEditExpense = (expense) => {
    setEditingExpense(expense)
  }

  return (
    <div className="app">
      <h1 className='app-title'>Expense Tracker</h1>

      <div className="top-section">
        <BalanceCard label="Wallet Balance" amount={balance} amountClass="balance-amount" buttonText="+ Add Income" btnClass="btn-green" onButtonClick={() => setShowAddBalance(true)} />

        <BalanceCard label="Expenses" amount={totalExpenses} amountClass="expense-amount" buttonText="+ Add Expense" btnClass="btn-red" onButtonClick={() => setShowAddExpense(true)} />
        <div className="chart-section">
          <p>Pie Chart</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <TransactionList
          expenses={expenses}
          onDelete={handleDeleteExpense}
          onEdit={handleEditExpense}
        />
        <div className="chart-section">
          <p>Bar Chart</p>
        </div>
      </div>

      {/* Add Balance Modal */}
      <Modal isOpen={showAddBalance} onClose={() => setShowAddBalance(false)}>
        <AddBalanceForm onSubmit={handleAddBalance} onCancel={() => setShowAddBalance(false)} />
      </Modal>

      {/* Add Expense Modal */}
      <Modal isOpen={showAddExpense} onClose={() => setShowAddExpense(false)}>
        <AddExpenseForm onSubmit={handleAddExpense} onCancel={() => setShowAddExpense(false)} />
      </Modal>

      {/* Edit Expense Modal */}
      <Modal isOpen={editingExpense !== null} onClose={() => setEditingExpense(null)}>
        <AddExpenseForm
          onSubmit={handleUpdateExpense}
          onCancel={() => setEditingExpense(null)}
          editingExpense={editingExpense}
        />
      </Modal>
    </div>
  )
}

export default App