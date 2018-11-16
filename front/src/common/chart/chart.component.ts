import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { isEqual } from 'lodash';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
	selector: 'chart',
	templateUrl: './chart.html',
	styleUrls: ['./chart.sass']
})

export class ChartComponent implements OnChanges {
	@Input() params: Object;
	@Input() classes: String;
	@ViewChild(BaseChartDirective) chartView: BaseChartDirective;

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

	ngOnChanges (simpleChange) {
		if (!isEqual(simpleChange.params.previousValue, simpleChange.params.currentValue)) {
			const data = this.getBarData(this.params);

			this.barChartLabels = data.labels;
			this.barChartData = data.barData;

			setTimeout(() => {
				this.chartView.chart.config.data.labels = data.labels;
				this.chartView.chart.update();
			}, 0);
		}
	}
}
