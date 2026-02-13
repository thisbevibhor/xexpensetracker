import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const COLORS = {
    Food: '#A000FF',
    Entertainment: '#FF9304',
    Travel: '#FDE006'
}

// Always show all 3 categories
const ALL_CATEGORIES = ['Food', 'Entertainment', 'Travel']

function ExpensePieChart({ expenses }) {
    // Group expenses by category and sum amounts
    const categoryTotals = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount
        return acc
    }, {})

    // Build data array — only include categories that have data (for pie slices)
    const chartData = ALL_CATEGORIES
        .filter(cat => categoryTotals[cat] > 0)
        .map(cat => ({ name: cat, value: categoryTotals[cat] }))

    return (
        <div className="pie-chart-container">
            {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={90}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                        >
                            {chartData.map((entry) => (
                                <Cell key={entry.name} fill={COLORS[entry.name]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <div className="chart-empty-circle"></div>
            )}

            {/* Legend — always shows all 3 categories */}
            <div className="pie-legend">
                {ALL_CATEGORIES.map((cat) => (
                    <div key={cat} className="legend-item">
                        <span className="legend-dot" style={{ backgroundColor: COLORS[cat] }}></span>
                        <span>{cat}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExpensePieChart
