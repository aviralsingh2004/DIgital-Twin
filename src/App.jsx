import React from 'react';
import Dashboard from './components/Dashboard';
import SimulationView from './components/SimulationView';
import AnalysisForm from './components/AnalysisForm';

function App() {
    return (
        <div className="container">
            <header>
                <h1>Smart City Digital Twin</h1>
            </header>
            <main>
                <Dashboard />
                <SimulationView />
                <AnalysisForm />
            </main>
        </div>
    );
}

export default App; 