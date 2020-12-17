d3.csv("./data/sumo.csv").then(function (data) {
    console.log(data);

    // create SVG canvas for legend circles
    const legendMongolia = d3
        .selectAll(".legend-circle-mongolia")
        .append("svg")
        .attr("width", 20.8)
        .attr("height", 20.8)
        .append("circle")
        .attr("cx", 10.4)
        .attr("cy", 10.4)
        .attr("r", 8)
        .attr("fill", "#b0add2")
        .attr("fill-opacity", 0.8)
        .attr("stroke", "#FFD500")
        .attr("stroke-width", 2.4);

    const legendElsewhere = d3
        .selectAll(".legend-circle-elsewhere")
        .append("svg")
        .attr("width", 20.8)
        .attr("height", 20.8)
        .append("circle")
        .attr("cx", 10.4)
        .attr("cy", 10.4)
        .attr("r", 8)
        .attr("fill", "#b0add2")
        .attr("fill-opacity", 0.8)
        .attr("stroke", "#58595B")
        .attr("stroke-width", 0.8);

    // define dementions of SVG
    const width = document.querySelector("#height-vs-weight").clientWidth;
    const height = document.querySelector("#height-vs-weight").clientHeight;
    const margin = { top: 25, right: 25, bottom: 75, left: 75 };

    // create SVG canvas
    const svg = d3
        .select("#height-vs-weight")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // filter data
    const filterData = (year) => {
        return data.filter(function (d) {
            return d.basho === `${year}.01`;
        });
    };

    const data_1999 = filterData(1999);
    const data_2004 = filterData(2004);
    const data_2009 = filterData(2009);
    const data_2014 = filterData(2014);
    const data_2019 = filterData(2019);

    // determin min and max values of variables
    const weightDomain = {
        min1999: d3.min(data_1999, function (d) {
            return +d.weight_pounds;
        }),
        max1999: d3.max(data_1999, function (d) {
            return +d.weight_pounds;
        }),
        min2004: d3.min(data_2004, function (d) {
            return +d.weight_pounds;
        }),
        max2004: d3.max(data_2004, function (d) {
            return +d.weight_pounds;
        }),
        min2009: d3.min(data_2009, function (d) {
            return +d.weight_pounds;
        }),
        max2009: d3.max(data_2009, function (d) {
            return +d.weight_pounds;
        }),
        min2014: d3.min(data_2014, function (d) {
            return +d.weight_pounds;
        }),
        max2014: d3.max(data_2014, function (d) {
            return +d.weight_pounds;
        }),
        min2019: d3.min(data_2019, function (d) {
            return +d.weight_pounds;
        }),
        max2019: d3.max(data_2019, function (d) {
            return +d.weight_pounds;
        }),
    };

    const heightDomain = {
        min1999: d3.min(data_1999, function (d) {
            return +d.height_feet;
        }),
        max1999: d3.max(data_1999, function (d) {
            return +d.height_feet;
        }),
        min2004: d3.min(data_2004, function (d) {
            return +d.height_feet;
        }),
        max2004: d3.max(data_2004, function (d) {
            return +d.height_feet;
        }),
        min2009: d3.min(data_2009, function (d) {
            return +d.height_feet;
        }),
        max2009: d3.max(data_2009, function (d) {
            return +d.height_feet;
        }),
        min2014: d3.min(data_2014, function (d) {
            return +d.height_feet;
        }),
        max2014: d3.max(data_2014, function (d) {
            return +d.height_feet;
        }),
        min2019: d3.min(data_2019, function (d) {
            return +d.height_feet;
        }),
        max2019: d3.max(data_2019, function (d) {
            return +d.height_feet;
        }),
    };

    // create scales

    const xScale = d3
        .scaleLinear()
        .domain([weightDomain.min1999 - 10, weightDomain.max1999 + 10])
        .range([margin.left, width - margin.right]);

    const yScale = d3
        .scaleLinear()
        .domain([heightDomain.min1999 - 0.1, heightDomain.max1999 + 0.1])
        .range([height - margin.bottom, margin.top]);

    const colorScale = d3
        .scaleSequential()
        .domain([42, 1])
        .interpolator(d3.interpolatePurples);

    // draw axes
    const xAxis = svg
        .append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    const yAxis = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft().scale(yScale));

    // draw points (default by using 1999 data)
    const circles = svg
        .selectAll("circle")
        .data(data_1999)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScale(d.weight_pounds);
        })
        .attr("cy", function (d) {
            return yScale(d.height_feet);
        })
        .attr("r", 10)
        .attr("fill", function (d) {
            return colorScale(d.rank);
        })
        .attr("fill-opacity", 0.8)
        .attr("stroke", function (d) {
            if (d.shusshin === "Mongolia") {
                return "#FFD500";
            } else {
                return "#58595B";
            }
        })
        .attr("stroke-width", function (d) {
            if (d.shusshin === "Mongolia") {
                return 3;
            } else {
                return 1;
            }
        });

    // draw axis labels
    const xAxisLabel = svg
        .append("text")
        .attr("class", "axisLabel")
        .attr("x", width / 2)
        .attr("y", height - margin.bottom / 2 + 10)
        .attr("text-anchor", "middle")
        .text("Weight (lbs)");

    const yAxisLabel = svg
        .append("text")
        .attr("class", "axisLabel")
        .attr("x", -height / 2)
        .attr("y", margin.left / 2 - 10)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Height (ft)");

    // tooltip
    const tooltip = d3
        .select("#height-vs-weight")
        .append("div")
        .attr("class", "tooltip");

    circles
        .on("mouseover", function (e, d) {
            let cx = +d3.select(this).attr("cx");
            let cy = +d3.select(this).attr("cy");
            tooltip
                .style("visibility", "visible")
                .style("left", `${cx}px`)
                .style("top", `${cy}px`).html(`Name: <b>${d.rikishi}</b><br>
            Rank: <b>${d.rank}</b><br>
            Country: <b>${d.shusshin}</b><br>
            Weight: <b>${Math.round(d.weight_pounds * 10) / 10}</b> lbs<br>
            Height: <b>${
                d.height_feet_floor
            }</b>' <b>${Math.round(d.height_inches_remainder * 10) / 10}</b>"<br>
            Age: <b>${d.age_floor}</b>`);
            d3.select(this).attr("stroke", "#58595B").attr("stroke-width", 3);
        })
        .on("mouseout", function (e, d) {
            tooltip.style("visibility", "hidden");
            d3.select(this)
                .attr("stroke", function (d) {
                    if (d.shusshin === "Mongolia") {
                        return "#FFD500";
                    } else {
                        return "#58595B";
                    }
                })
                .attr("stroke-width", function (d) {
                    if (d.shusshin === "Mongolia") {
                        return 3;
                    } else {
                        return 1;
                    }
                });
        });

    // filter by checkboxes and rank range

    d3.select(".button").on("click", function () {
        d3.selectAll(".checkbox-for-country").each(function () {
            let rankMin = d3.select("#rank-range-min").property("value");
            let rankMax = d3.select("#rank-range-max").property("value");
            let isChecked = d3.select(this).property("checked");
            let checkboxValues = d3.select(this).property("value");
            let selection = circles.filter(function (d) {
                return d.country === checkboxValues;
            });
            if (isChecked) {
                selection
                    .filter(function (d) {
                        return +d.rank >= rankMin && +d.rank <= rankMax;
                    })
                    .attr("r", 10);
                selection
                    .filter(function (d) {
                        return +d.rank < rankMin || +d.rank > rankMax;
                    })
                    .attr("r", 0);
            } else {
                selection.attr("r", 0);
            }
        });
        if ($("[r=10]").length === 42) {
            const sorryMessage = d3
                .select("#height-vs-weight")
                .append("div")
                .attr("class", "sorryMessage");

            sorryMessage
                .style("visibility", "visible")
                .style("top", `${(height - margin.top - margin.bottom) / 2}px`)
                .style("left", `${(width - margin.right - margin.left) / 2}px`)
                .html(
                    `<span class="oops">Oops!</span><br>No wrestlers found (＞人＜;).<br>Try again with different criteria.`
                );
        } else {
            d3.select(".sorryMessage").remove();
        }
    });

    // data update

    d3.select("#year1999").on("click", function () {
        xScale.domain([weightDomain.min1999 - 10, weightDomain.max1999 + 10]);
        yScale.domain([heightDomain.min1999 - 0.1, heightDomain.max1999 + 0.1]);

        d3.selectAll(".checkbox-for-country").property("checked", true);
        d3.select("#rank-range-min").property("value", 1);
        d3.select("#rank-range-max").property("value", 42);
        d3.select(".sorryMessage").remove();

        let c = svg.selectAll("circle").data(data_1999, function (d) {
            return d.rank;
        });

        c.enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d.weight_pounds);
            })
            .attr("cy", function (d) {
                return yScale(d.height_feet);
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            })
            .merge(c)
            .transition()
            .duration(1500)
            .attr("cx", function (d) {
                return xScale(d.weight_pounds);
            })
            .attr("cy", function (d) {
                return yScale(d.height_feet);
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            });

        c.exit().transition().duration(1500).attr("r", 0).remove();

        xAxis.transition().duration(1500).call(d3.axisBottom().scale(xScale));
        yAxis.transition().duration(1500).call(d3.axisLeft().scale(yScale));
    });

    d3.select("#year2004").on("click", function () {
        xScale.domain([weightDomain.min2004 - 10, weightDomain.max2004 + 10]);
        yScale.domain([heightDomain.min2004 - 0.1, heightDomain.max2004 + 0.1]);

        d3.selectAll(".checkbox-for-country").property("checked", true);
        d3.select("#rank-range-min").property("value", 1);
        d3.select("#rank-range-max").property("value", 42);
        d3.select(".sorryMessage").remove();

        let c = svg.selectAll("circle").data(data_2004, function (d) {
            return d.rank;
        });

        c.enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d.weight_pounds);
            })
            .attr("cy", function (d) {
                return yScale(d.height_feet);
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            })
            .merge(c)
            .transition()
            .duration(1500)
            .attr("cx", function (d) {
                return xScale(d.weight_pounds);
            })
            .attr("cy", function (d) {
                return yScale(d.height_feet);
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            });
        c.exit().transition().duration(1500).attr("r", 0).remove();
        xAxis.transition().duration(1500).call(d3.axisBottom().scale(xScale));
        yAxis.transition().duration(1500).call(d3.axisLeft().scale(yScale));
    });

    d3.select("#year2009").on("click", function () {
        xScale.domain([weightDomain.min2009 - 10, weightDomain.max2009 + 10]);
        yScale.domain([heightDomain.min2009 - 0.1, heightDomain.max2009 + 0.1]);

        d3.selectAll(".checkbox-for-country").property("checked", true);
        d3.select("#rank-range-min").property("value", 1);
        d3.select("#rank-range-max").property("value", 42);
        d3.select(".sorryMessage").remove();

        let c = svg.selectAll("circle").data(data_2009, function (d) {
            return d.rank;
        });

        c.enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d.weight_pounds);
            })
            .attr("cy", function (d) {
                return yScale(d.height_feet);
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            })
            .merge(c)
            .transition()
            .duration(1500)
            .attr("cx", function (d) {
                return xScale(d.weight_pounds);
            })
            .attr("cy", function (d) {
                return yScale(d.height_feet);
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            });
        c.exit().transition().duration(1500).attr("r", 0).remove();
        xAxis.transition().duration(1500).call(d3.axisBottom().scale(xScale));
        yAxis.transition().duration(1500).call(d3.axisLeft().scale(yScale));
    });

    d3.select("#year2014").on("click", function () {
        xScale.domain([weightDomain.min2014 - 10, weightDomain.max2014 + 10]);
        yScale.domain([heightDomain.min2014 - 0.1, heightDomain.max2014 + 0.1]);

        d3.selectAll(".checkbox-for-country").property("checked", true);
        d3.select("#rank-range-min").property("value", 1);
        d3.select("#rank-range-max").property("value", 42);
        d3.select(".sorryMessage").remove();

        let c = svg.selectAll("circle").data(data_2014, function (d) {
            return d.rank;
        });

        c.enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d.weight_pounds);
            })
            .attr("cy", function (d) {
                return yScale(d.height_feet);
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            })
            .merge(c)
            .transition()
            .duration(1500)
            .attr("cx", function (d) {
                return xScale(d.weight_pounds);
            })
            .attr("cy", function (d) {
                return yScale(d.height_feet);
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            });
        c.exit().transition().duration(1500).attr("r", 0).remove();
        xAxis.transition().duration(1500).call(d3.axisBottom().scale(xScale));
        yAxis.transition().duration(1500).call(d3.axisLeft().scale(yScale));
    });

    d3.select("#year2019").on("click", function () {
        xScale.domain([weightDomain.min2019 - 10, weightDomain.max2019 + 10]);
        yScale.domain([heightDomain.min2019 - 0.1, heightDomain.max2019 + 0.1]);

        d3.selectAll(".checkbox-for-country").property("checked", true);
        d3.select("#rank-range-min").property("value", 1);
        d3.select("#rank-range-max").property("value", 42);
        d3.select(".sorryMessage").remove();

        let c = svg.selectAll("circle").data(data_2019, function (d) {
            return d.rank;
        });

        c.enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d.weight_pounds);
            })
            .attr("cy", function (d) {
                return yScale(d.height_feet);
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            })
            .merge(c)
            .transition()
            .duration(1500)
            .attr("cx", function (d) {
                return xScale(d.weight_pounds);
            })
            .attr("cy", function (d) {
                return yScale(d.height_feet);
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            });
        c.exit().transition().duration(1500).attr("r", 0).remove();
        xAxis.transition().duration(1500).call(d3.axisBottom().scale(xScale));
        yAxis.transition().duration(1500).call(d3.axisLeft().scale(yScale));
    });

    // SECOND VISUALIZATION ABOUT AGE AND RANK

    const widthForAge = document.querySelector("#age").clientWidth;
    const heightForAge = document.querySelector("#age").clientHeight;

    // create SVG canvas
    const svgForAge = d3
        .select("#age")
        .append("svg")
        .attr("width", widthForAge)
        .attr("height", heightForAge);

    // create scales
    const xScaleForAge = d3
        .scaleLinear()
        .domain([20, 37])
        .range([margin.left, width - margin.right]);

    const yScaleForAge = d3
        .scaleLinear()
        .domain([0.5, 9.5])
        .range([
            heightForAge - margin.bottom,
            heightForAge - margin.bottom - 20 * 9,
        ]);

    // draw axes
    const xAxisForAge = svgForAge
        .append("g")
        .attr("transform", `translate(0, ${heightForAge - margin.bottom})`)
        .call(d3.axisBottom().scale(xScaleForAge));

    const yAxisForAge = svgForAge
        .append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft().scale(yScaleForAge));
    console.log(yScaleForAge(0));

    // draw points (default by using 1999 data)
    const circlesForAge = svgForAge
        .selectAll("circle")
        .data(data_1999)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScaleForAge(d.age_floor);
        })
        .attr("cy", function (d) {
            return yScaleForAge(0.5) - d.count * 20 + 10;
        })
        .attr("r", 10)
        .attr("fill", function (d) {
            return colorScale(d.rank);
        })
        .attr("fill-opacity", 0.8)
        .attr("stroke", function (d) {
            if (d.shusshin === "Mongolia") {
                return "#FFD500";
            } else {
                return "#58595B";
            }
        })
        .attr("stroke-width", function (d) {
            if (d.shusshin === "Mongolia") {
                return 3;
            } else {
                return 1;
            }
        });

    // draw axis labels for age
    const xAxisLabelForAge = svgForAge
        .append("text")
        .attr("class", "axisLabel")
        .attr("x", widthForAge / 2)
        .attr("y", heightForAge - margin.bottom / 2 + 5)
        .attr("text-anchor", "middle")
        .text("Age");

    const yAxisLabelForAge = svgForAge
        .append("text")
        .attr("class", "axisLabel")
        .attr("x", -heightForAge / 2)
        .attr("y", margin.left / 2 - 5)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Number of wrestlers");

    // tooltip for age data
    const tooltipForAge = d3
        .select("#age")
        .append("div")
        .attr("class", "tooltip");

    circlesForAge
        .on("mouseover", function (e, d) {
            let cx = +d3.select(this).attr("cx");
            let cy = +d3.select(this).attr("cy");
            tooltipForAge
                .style("visibility", "visible")
                .style("left", `${cx}px`)
                .style("top", `${cy}px`).html(`Name: <b>${d.rikishi}</b><br>
        Rank: <b>${d.rank}</b><br>
        Country: <b>${d.shusshin}</b><br>
        Weight: <b>${Math.round(d.weight_pounds * 10) / 10}</b> lbs<br>
        Height: <b>${
            d.height_feet_floor
        }</b>' <b>${Math.round(d.height_inches_remainder * 10) / 10}</b>"<br>
        Age: <b>${d.age_floor}</b>`);
            d3.select(this).attr("stroke", "#58595B").attr("stroke-width", 3);
        })
        .on("mouseout", function (e, d) {
            tooltipForAge.style("visibility", "hidden");
            d3.select(this)
                .attr("stroke", function (d) {
                    if (d.shusshin === "Mongolia") {
                        return "#FFD500";
                    } else {
                        return "#58595B";
                    }
                })
                .attr("stroke-width", function (d) {
                    if (d.shusshin === "Mongolia") {
                        return 3;
                    } else {
                        return 1;
                    }
                });
        });

    // data update for age
    d3.select("#year1999ForAge").on("click", function (d) {
        xScaleForAge.domain([20, 37]);
        yScaleForAge.domain([0.5, 9.5]);

        let c = svgForAge.selectAll("circle").data(data_1999, function (d) {
            return d.rank;
        });

        c.enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScaleForAge(d.age_floor);
            })
            .attr("cy", function (d) {
                return yScaleForAge(0.5) - d.count * 20 + 10;
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            })
            .merge(c)
            .transition()
            .duration(1500)
            .attr("cx", function (d) {
                return xScaleForAge(d.age_floor);
            })
            .attr("cy", function (d) {
                return yScaleForAge(0.5) - d.count * 20 + 10;
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            });
        c.exit().transition().duration(1500).attr("r", 0).remove();

        xAxisForAge
            .transition()
            .duration(1500)
            .call(d3.axisBottom().scale(xScaleForAge));
        yAxisForAge
            .transition()
            .duration(1500)
            .call(d3.axisLeft().scale(yScaleForAge));
    });

    d3.select("#year2004ForAge").on("click", function (d) {
        xScaleForAge.domain([20, 37]);
        yScaleForAge.domain([0.5, 9.5]);

        let c = svgForAge.selectAll("circle").data(data_2004, function (d) {
            return d.rank;
        });

        c.enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScaleForAge(d.age_floor);
            })
            .attr("cy", function (d) {
                return yScaleForAge(0.5) - d.count * 20 + 10;
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            })
            .merge(c)
            .transition()
            .duration(1500)
            .attr("cx", function (d) {
                return xScaleForAge(d.age_floor);
            })
            .attr("cy", function (d) {
                return yScaleForAge(0.5) - d.count * 20 + 10;
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            });
        c.exit().transition().duration(1500).attr("r", 0).remove();

        xAxisForAge
            .transition()
            .duration(1500)
            .call(d3.axisBottom().scale(xScaleForAge));
        yAxisForAge
            .transition()
            .duration(1500)
            .call(d3.axisLeft().scale(yScaleForAge));
    });

    d3.select("#year2009ForAge").on("click", function (d) {
        xScaleForAge.domain([20, 37]);
        yScaleForAge.domain([0.5, 9.5]);

        let c = svgForAge.selectAll("circle").data(data_2009, function (d) {
            return d.rank;
        });

        c.enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScaleForAge(d.age_floor);
            })
            .attr("cy", function (d) {
                return yScaleForAge(0.5) - d.count * 20 + 10;
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            })
            .merge(c)
            .transition()
            .duration(1500)
            .attr("cx", function (d) {
                return xScaleForAge(d.age_floor);
            })
            .attr("cy", function (d) {
                return yScaleForAge(0.5) - d.count * 20 + 10;
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            });
        c.exit().transition().duration(1500).attr("r", 0).remove();

        xAxisForAge
            .transition()
            .duration(1500)
            .call(d3.axisBottom().scale(xScaleForAge));
        yAxisForAge
            .transition()
            .duration(1500)
            .call(d3.axisLeft().scale(yScaleForAge));
    });

    d3.select("#year2014ForAge").on("click", function (d) {
        xScaleForAge.domain([20, 40]);
        yScaleForAge.domain([0.5, 9.5]);

        let c = svgForAge.selectAll("circle").data(data_2014, function (d) {
            return d.rank;
        });

        c.enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScaleForAge(d.age_floor);
            })
            .attr("cy", function (d) {
                return yScaleForAge(0.5) - d.count * 20 + 10;
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            })
            .merge(c)
            .transition()
            .duration(1500)
            .attr("cx", function (d) {
                return xScaleForAge(d.age_floor);
            })
            .attr("cy", function (d) {
                return yScaleForAge(0.5) - d.count * 20 + 10;
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            });
        c.exit().transition().duration(1500).attr("r", 0).remove();

        xAxisForAge
            .transition()
            .duration(1500)
            .call(d3.axisBottom().scale(xScaleForAge));
        yAxisForAge
            .transition()
            .duration(1500)
            .call(d3.axisLeft().scale(yScaleForAge));
    });

    d3.select("#year2019ForAge").on("click", function (d) {
        xScaleForAge.domain([20, 37]);
        yScaleForAge.domain([0.5, 9.5]);

        let c = svgForAge.selectAll("circle").data(data_2019, function (d) {
            return d.rank;
        });

        c.enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScaleForAge(d.age_floor);
            })
            .attr("cy", function (d) {
                return yScaleForAge(0.5) - d.count * 20 + 10;
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            })
            .merge(c)
            .transition()
            .duration(1500)
            .attr("cx", function (d) {
                return xScaleForAge(d.age_floor);
            })
            .attr("cy", function (d) {
                return yScaleForAge(0.5) - d.count * 20 + 10;
            })
            .attr("r", 10)
            .attr("fill", function (d) {
                return colorScale(d.rank);
            })
            .attr("fill-opacity", 0.8)
            .attr("stroke", function (d) {
                if (d.shusshin === "Mongolia") {
                    return "#FFD500";
                } else {
                    return "#58595B";
                }
            })
            .attr("stroke-width", function (d) {
                if (d.shusshin === "Mongolia") {
                    return 3;
                } else {
                    return 1;
                }
            });
        c.exit().transition().duration(1500).attr("r", 0).remove();

        xAxisForAge
            .transition()
            .duration(1500)
            .call(d3.axisBottom().scale(xScaleForAge));
        yAxisForAge
            .transition()
            .duration(1500)
            .call(d3.axisLeft().scale(yScaleForAge));
    });
});
