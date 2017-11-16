import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'chart',
	templateUrl: './chart.html',
	styleUrls: ['./chart.sass']
})

export class ChartComponent implements OnInit {
	@Input() params: Object;
	@Input() classes: String;

	private barChartOptions: Object = {
		scaleShowVerticalLines: false,
		responsive: true,
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true
				}
			}]
		}
	};

	private colors: Object[] = [{
		backgroundColor: '#FF7043'
	}, {
		backgroundColor: '#7986CB'
	}, {
		backgroundColor: '#9575CD'
	}, {
		backgroundColor: '#81C784'
	}, {
		backgroundColor: '#64B5F6'
	}];

	private barChartType: String = 'bar';
	private barChartLegend: Boolean = true;
	private barChartLabels: String[];
	private barChartData: Object[];

	private getBarData = function (params) {
		var res = {
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
		var data = this.getBarData(this.params);

		this.barChartLabels = data.labels;
		this.barChartData = data.barData;
	}
}
