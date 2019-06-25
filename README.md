# dc-test
angular-dc-test

Tutorials:
### [https://animateddata.co.uk/articles/crossfilter/]
#### [https://www.codeproject.com/Articles/703261/Making-Dashboards-with-Dc-js-Part-3-Tips-and-Trick]

Ideas:

0. angular dc typings - [https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/dc/dc-tests.ts]
1. Two charts with same dim. do not filter.  Create duplicate dims. Instead.* 
2. Add chloropleth map. - see if region edits, if not use state or dma etc.
[https://jsfiddle.net/djmartin_umich/9VJHe/]
2b. Leaflet - https://github.com/Intellipharm/dc-addons#leafletjs
3. Scatterplot chart - explore Reductio exception
4. Line charts - see Stephen few percentage technique.
5. Date picker logic - service and UI, theme or slider.  Look for d3 example.
6.  Project data - use 2nd chartgroup ndx var.
7.  KPIs - add cards and summary metrics
8.  Circo.js circular date chart. https://github.com/nicgirault/circosJS
9. heat map - what to include
http://bl.ocks.org/tjdecke/5558084
10. Data table, pagination if possible, but without first.
https://github.com/HamsterHuey/intothevoid.io/blob/master/code/2017/dcjs%20sortable%20table/dcjsSortableTable.html
11. Determine what to do about detail sizes - scroll,limit, or expand.
12. Dollar amounts - 5.2M
13. BigData binning - https://github.com/uwdata/imMens/wiki
14. Scala CSV web service - https://github.com/melrief/PureCSV
15. Boxplot - what data? - https://dc-js.github.io/dc.js/examples/boxplot-time.html
16. Number charts - https://dc-js.github.io/dc.js/examples/number.html
17. Series - https://dc-js.github.io/dc.js/examples/series.html
18. Sparklines - https://dc-js.github.io/dc.js/examples/sparkline.html
19. Switching time intervals
20. Aggregated Data - https://dc-js.github.io/dc.js/examples/table-on-aggregated-data.html
21. Reduct.io - https://github.com/dc-js/dc.js/blob/b6bb3b214a1b1302fd65f6732ef2f1beb40ab62a/web/examples/sunburst-with-value-accessor.html (edited) 

# COMMON PITFALLS IN DASHBOARD DESIGN (Steven Few) 
### [http://www.perceptualedge.com/]

Knowing what to avoid isn’t everything, but it’s a good start. 
Here’s a list of the 13 mistakes that I’ll describe in detail:
```
1. Exceeding the boundaries of a single screen
2. Supplying inadequate context for the data
3. Displaying excessive detail or precision
4. Expressing measures indirectly
5. Choosing inappropriate media of display
6. Introducing meaningless variety
7. Using poorly designed display media
8. Encoding quantitative data inaccurately
9. Arranging the data poorly
10. Ineffectively highlighting what’s important
11. Cluttering the screen with useless decoration
12. Misusing or overusing color
13. Designing an unappealing visual display
```
