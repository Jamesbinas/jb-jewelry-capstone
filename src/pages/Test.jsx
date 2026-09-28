import { useState, useEffect } from 'react'


const items = ['Gold Ring', 'Silver Necklace', 'Diamond Ring', 'Pearl Earrings', 'Gold Watch', 'Custom Bracelet']

function Test() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState(items);

    useEffect(() => {
        const filtered = items.filter(item => item.toLowerCase().includes(search.toLowerCase())
        )
        setResults(filtered)
    }, [search])

    return (
        <div style={{padding: '40px', color:'white', background: '#0a0a0a', minHeight: '100vh'}}>
            <h1 style={{color:'#FFD700'}}>Live Search</h1>
            <input
                type="text"
                placeholder="search jewelry..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{padding: '10px', width: '300px', marginBottom: '20px', background: '#1a1a1a', border: '1px solid #FFD700', color: 'white', borderRadius: '6px'  }}
            />
            <ul>
                {results.map((item,index) => (
                    <li key={index} style={{ color: '#aaaaaa', marginBottom: '8px'}}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default Test