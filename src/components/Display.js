import React from 'react';

export function Display({ history, output }) {
	// CHANGE COLOR TO RED IF ERROR OCCURRED
	let colorStyle = {
		color: output === 'Error' ? '#f11' : '#fff'
	};

	return (
		<div style={colorStyle} className="result">
			<div className="history">{history}</div>
			<div className="output">{output}</div>
		</div>
	);
}


