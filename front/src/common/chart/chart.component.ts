import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'chart',
	templateUrl: './chart.html',
	styleUrls: ['./chart.sass']
})

export class ChartComponent implements OnInit {
	@Input() params: object;
	@Input() classes: string;

	private barChartOptions:object = {
		scaleShowVerticalLines: false,
		responsive: true,
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero:true
				}
			}]
		}
	};

	private colors: object[] = [{
		backgroundColor: '#86C7F3'
	}, {
		backgroundColor: '#f59fa2'
	}, {
		backgroundColor: '#FFE29A'
	}, {
		backgroundColor: '#93D9D9'
	}, {
		backgroundColor: '#4BC0C0'
	}];

	private barChartType: String = 'bar';
	private barChartLegend: Boolean = true;
	private barChartLabels: String[];
	private barChartData :any[];

	private getBarData = function (params) {
		let res = {
			barData: [],
			labels: []
		};

		params.fields.forEach(function (field, fieldIndex) {
			let barData = [];
			let barLabels = []

			params.data.forEach(function (data, dataIndex) {
				barData.push(data[field]);
				barLabels.push(data.title);
			});

			res.barData.push({
				data: barData,
				label: params.names[fieldIndex],
			});

			res.labels = barLabels;
		});

		return res;
	}

	ngOnInit () {
		let data = this.getBarData(this.params);

		this.barChartLabels = data.labels;
		this.barChartData = data.barData;
	}
}
