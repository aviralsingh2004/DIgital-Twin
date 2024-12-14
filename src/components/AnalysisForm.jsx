import React, { useState } from 'react';
import { analyzeUrbanImpact } from '../services/groqService';
import { MultiAgentSystem } from '../services/multiAgentService';

function AnalysisForm() {
    const [proposal, setProposal] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const multiAgentSystem = new MultiAgentSystem();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const [groqAnalysis, agentAnalysis] = await Promise.all([
                analyzeUrbanImpact(proposal),
                multiAgentSystem.analyzeProposal(proposal)
            ]);
            
            setAnalysis({ groqAnalysis, agentAnalysis });
        } catch (error) {
            console.error('Analysis failed:', error);
        }
    };

    return (
        <div className="analysis-form">
            <h2>Impact Analysis</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                    placeholder="Enter your urban development proposal..."
                />
                <button type="submit">Analyze Impact</button>
            </form>
            {analysis && (
                <div className="analysis-results">
                    <h3>Analysis Results</h3>
                    <div className="groq-analysis">
                        <h4>AI Analysis:</h4>
                        <p>{analysis.groqAnalysis}</p>
                    </div>
                    <div className="agent-analysis">
                        <h4>Multi-Agent Analysis:</h4>
                        <p>Overall Score: {analysis.agentAnalysis.overallScore}</p>
                        <p>Consensus: {analysis.agentAnalysis.consensusReport}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AnalysisForm; 