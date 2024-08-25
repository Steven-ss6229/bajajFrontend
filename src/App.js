import React, { useState } from 'react';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [filter, setFilter] = useState(['all']);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: JSON.parse(jsonInput) }),
            });
            const result = await response.json();
            setResponse(result);
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const filteredResponse = () => {
        if (!response) return null;
        let filtered = {};
        if (filter.includes('numbers') || filter.includes('all')) filtered.numbers = response.numbers;
        if (filter.includes('alphabets') || filter.includes('all')) filtered.alphabets = response.alphabets;
        if (filter.includes('highest') || filter.includes('all')) filtered.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        return filtered;
    };

    return (
        <div className="App">
            <h1>Your Roll Number</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Enter JSON input here'
                ></textarea>
                <button type="submit">Submit</button>
            </form>
            <select onChange={(e) => setFilter(e.target.value.split(','))} multiple>
                <option value="all">All</option>
                <option value="numbers">Numbers</option>
                <option value="alphabets">Alphabets</option>
                <option value="highest">Highest Lowercase Alphabet</option>
            </select>
            {response && (
                <div className="response">
                    <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
