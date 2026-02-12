import { useState } from 'react'
import pizzaIcon from '../assets/Pizza_light.png'
import giftIcon from '../assets/Gift_light.png'
import suitcaseIcon from '../assets/suitcase_light.png'
import pencilIcon from '../assets/pencil.png'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// Map category name → icon image
const categoryIcons = {
    Food: pizzaIcon,
    Entertainment: giftIcon,
    Travel: suitcaseIcon
}

const ITEMS_PER_PAGE = 3

function TransactionList({ expenses, onDelete, onEdit }) {
    const [currentPage, setCurrentPage] = useState(1)

    if (expenses.length === 0) {
        return (
            <div className="transaction-section">
                <h3 className="section-title">Recent Transactions</h3>
                <div className="transaction-list">
                    <p className="no-transactions">No transactions yet</p>
                </div>
            </div>
        )
    }

    // Pagination math
    const totalPages = Math.ceil(expenses.length / ITEMS_PER_PAGE)
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const currentExpenses = expenses.slice(start, start + ITEMS_PER_PAGE)

    return (
        <div className="transaction-section">
            <h3 className="section-title">Recent Transactions</h3>
            <div className="transaction-list">
                {currentExpenses.map((expense) => (
                    <div key={expense.id} className="transaction-item">
                        <div className="transaction-icon">
                            <img src={categoryIcons[expense.category]} alt={expense.category} className="icon-img" />
                        </div>
                        <div className="transaction-details">
                            <h4>{expense.title}</h4>
                            <p className="transaction-date">{expense.date}</p>
                        </div>
                        <p className="transaction-amount">₹{expense.amount}</p>
                        <button type="button" className="btn-action btn-cross" onClick={() => onDelete(expense.id)}>
                            <span className="cross-icon"></span>
                        </button>
                        <button type="button" className="btn-action btn-edit" onClick={() => onEdit(expense)}>
                            <img src={pencilIcon} alt="edit" className="action-icon-img" />
                        </button>
                    </div>
                ))}

                {/* Pagination - only show if more than 1 page */}
                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            type="button"
                            className="btn-page"
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            disabled={currentPage === 1}
                        >
                            <FaChevronLeft />
                        </button>
                        <span className="page-number">{currentPage}</span>
                        <button
                            type="button"
                            className="btn-page"
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TransactionList