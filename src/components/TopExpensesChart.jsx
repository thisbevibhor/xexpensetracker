import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const ALL_CATEGORIES = ['Food', 'Entertainment', 'Travel']

function TopExpensesChart({ expenses }) {
    // Group by category, sum amounts
    const categoryTotals = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount
        return acc
    }, {})

    // Always show all 3 categories, with 0 if no data
    const chartData = ALL_CATEGORIES
        .map(cat => ({ name: cat, value: categoryTotals[cat] || 0 }))
        .sort((a, b) => b.value - a.value)

    return (
        <div className="bar-chart-box">
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData} layout="vertical" barCategoryGap={15}>
                    <XAxis type="number" hide />
                    <YAxis
                        type="category"
                        dataKey="name"
                        width={110}
                        tick={{ fill: '#222', fontSize: 14 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Bar
                        dataKey="value"
                        fill="#8884d8"
                        radius={[0, 10, 10, 0]}
                        barSize={25}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default TopExpensesChart
