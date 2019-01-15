// import React, {Component} from "react";
// import CanvasJS from 'canvasjs'

// import CanvasJSReact from 'canvasjs'
// class App extends Component {
// 	render() {
// 		const options = {
// 			theme: "dark2",
// 			animationEnabled: true,
// 			exportFileName: "New Year Resolutions",
// 			exportEnabled: true,
// 			title:{
// 				text: "Top Categories of New Year's Resolution"
// 			},
// 			data: [{
// 				type: "pie",
// 				showInLegend: true,
// 				legendText: "{label}",
// 				toolTipContent: "{label}: <strong>{y}%</strong>",
// 				indexLabel: "{y}%",
// 				indexLabelPlacement: "inside",
// 				dataPoints: [
// 					{ y: 32, label: "Health" },
// 					{ y: 22, label: "Finance" },
// 					{ y: 15, label: "Education" },
// 					{ y: 19, label: "Career" },
// 					{ y: 5, label: "Family" },
// 					{ y: 7, label: "Real Estate" }
// 				]
// 			}]
// 		}
// 		return (
// 		<div>
// 			<CanvasJSChart options = {options}
// 				/* onRef={ref => this.chart = ref} */
// 			/>
// 			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
// 		</div>
// 		);
// 	}
// }
// export default App