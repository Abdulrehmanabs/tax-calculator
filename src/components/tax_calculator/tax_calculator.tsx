"use client"
import { useEffect, useState } from 'react';

export function TaxCalculator() {
    const [income, setIncome] = useState(0);
    const [salaryType, setSalaryType] = useState('yearly');
    const [tax, setTax] = useState(0);

    const calculateTax = (income: number) => {
        const annualIncome = salaryType === 'monthly' ? income * 12 : income;
        let tax = 0;
        // Pakistan Income Tax Slabs for 2023-2024
        if (annualIncome <= 600000) {
            tax = 0;
        } else if (annualIncome <= 1200000) {
            tax = (annualIncome - 600000) * 0.025;
        } else if (annualIncome <= 2400000) {
            tax = (annualIncome - 1200000) * 0.125 + 15000;
        } else if (annualIncome <= 3600000) {
            tax = (annualIncome - 2400000) * 0.2 + 165000;
        } else if (annualIncome <= 6000000) {
            tax = (annualIncome - 3600000) * 0.25 + 405000;
        } else if (annualIncome <= 12000000) {
            tax = (annualIncome - 6000000) * 0.325 + 1005000;
        } else {
            tax = (annualIncome - 12000000) * 0.35 + 2955000;
        }

        return tax;
    };

    const handleCalculate = () => {
        const calculatedTax = calculateTax(Number(income));
        setTax(calculatedTax);
    };

    useEffect(() => {
        handleCalculate();
    }, [income, salaryType]);

    return (
        <div className="font-sans sm:min-w-[400px] sm:max-w-[400px]">
            <h1 className="text-2xl font-bold mb-4">Simple Tax Calculator</h1>
            <div className="mb-4">
                <label htmlFor="income" className="block mb-2 font-medium">Enter your income:</label>
                <input
                    type="number"
                    id="income"
                    value={income}
                    onChange={(e) => setIncome(+e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="salaryType" className="block mb-2 font-medium">Select salary type:</label>
                <select
                    id="salaryType"
                    value={salaryType}
                    onChange={(e) => setSalaryType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                >
                    <option value="yearly">Yearly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>
            <button
                onClick={handleCalculate}
                className="px-4 py-2 mt-6 w-full bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
            >
                Calculate Tax
            </button>
            {tax !== 0 ? (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold">Your Tax: {tax?.toLocaleString()} PKR</h2>
                </div>
            ) : (
                <div className="mt-4">
                    <h3 className='text-lg font-thin'>Your Annual Income should be above than 6 lac to calculate tax</h3>
                </div>
            )}
        </div>
    );
}