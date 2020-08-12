import React from "react";
import {
	sOpenObject,
	sLiteral,
	sString,
	sArrayOf,
	sObject,
	sOptionalProp,
	sNumber,
} from "@hediet/semantic-json";
import { DecoratedGridComponent } from "./GridVisualizer";
import {
	createVisualizer,
	ReactVisualization,
	globalVisualizationFactory,
} from "@hediet/visualization-core";

export const sGrid = sOpenObject({
	kind: sOpenObject({
		array: sLiteral(true),
	}),
	columnLabels: sArrayOf(
		sOpenObject({
			label: sOptionalProp(sString(), {}),
		})
	),
	rows: sArrayOf(
		sOpenObject({
			label: sOptionalProp(sString(), {}),
			columns: sArrayOf(
				sOpenObject({
					content: sOptionalProp(sString(), {}),
					tag: sOptionalProp(sString(), {
						description:
							"A value to identify this cell. Should be unique.",
					}),
					color: sOptionalProp(sString(), {}),
				})
			),
		})
	),
	markers: sOptionalProp(
		sArrayOf(
			sOpenObject({
				id: sString(),

				row: sNumber(),
				column: sNumber(),
				rows: sOptionalProp(sNumber(), {}),
				columns: sOptionalProp(sNumber(), {}),

				label: sOptionalProp(sString(), {}),
				color: sOptionalProp(sString(), {}),
			})
		),
		{}
	),
});

export const gridVisualizer = createVisualizer({
	id: "grid",
	name: "Grid",
	serializer: sGrid,
	getVisualization: (data, self) =>
		new ReactVisualization(self, { priority: 1000 }, () => (
			<DecoratedGridComponent data={data} />
		)),
});

globalVisualizationFactory.addVisualizer(gridVisualizer);
