function BalanceCard({ label, amount, amountClass, buttonText, btnClass, onButtonClick }) {
    return (
    <div className="balance-card">
      <h2>{label}: <span className={amountClass}>₹{amount}</span></h2>
      <button type="button" className={`btn ${btnClass}`} onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  )
}

export default BalanceCard