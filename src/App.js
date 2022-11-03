
import {useRef,useEffect} from 'react'
import * as d3 from 'd3'
import geoData from './geoData'
import eduData from './eduData'
import * as topojson from 'topojson'




function App() {
  const ref = useRef()



  useEffect(()=> {
    const svgElement = d3.select(ref.current);
    const tooltip = d3.select('body').append('div').attr('class','tooltip-style').style('opacity',0)
    var y = d3.scaleLinear()
    .range([ 0, 208])
    .domain(['0.7','0'])
    const formatPercent = d3.format('.0%')
    const path = d3.geoPath();
      svgElement.append('g')
      .selectAll('path')
      .data(topojson.feature(geoData.geoData, geoData.geoData.objects.counties).features)
      .enter().append('path')
      .attr('fill', function(d){
        const obj = eduData.eduData.find(({fips})=> fips === d.id)
        return (obj.bachelorsOrHigher > 60) ? '#060D11' : 
              (obj.bachelorsOrHigher >= 50 && obj.bachelorsOrHigher < 60) ? '#214158' : 
              (obj.bachelorsOrHigher >= 40 && obj.bachelorsOrHigher < 50) ? '#3C76A0' : 
              (obj.bachelorsOrHigher >= 30 && obj.bachelorsOrHigher < 40) ? '#4A8BBA' : 
              (obj.bachelorsOrHigher >= 20 && obj.bachelorsOrHigher < 30) ? '#73A6CA' : 
              (obj.bachelorsOrHigher >= 10 && obj.bachelorsOrHigher < 20) ? '#91B9D5' : 
        '#BAD3E5'
      })
      .attr('d', d3.geoPath())
      .style('stroke', 'black')
      .on('mouseenter', function(d,event){
        d3.select(this)
        .attr('stroke-width', '4px')
          tooltip.style('opacity',1);
          tooltip.style('left', (d.pageX-20)+'px')
          tooltip.style('top', ((d.pageY)-35)+'px')
          tooltip.text(function(d){
            const obj = eduData.eduData.find(({fips})=> fips === event.id)
            return `${obj.area_name}, ${obj.state}: ${obj.bachelorsOrHigher}%`
          })
          tooltip.style('font', '13px sans-serif')
        })
      .on('mouseleave', function(d,event){
        d3.select(this)
          .attr('stroke-width', 'none')
         tooltip.style('opacity', 0) 
      })
      svgElement.append('g')
      .append('path')
      .attr('d', path(topojson.feature(geoData.geoData, geoData.geoData.objects.states)))
      .attr('fill', 'none')
      .attr('stroke', '#272626')
      .attr('stroke-width', '2.5px')
      svgElement.append("g")
      .call(d3.axisLeft(y).tickFormat(formatPercent).ticks(7))
      .attr('transform', 'translate(1000,50)')

      svgElement.append('rect').attr('x',1002).attr('y',48).attr('width',30).attr('height',30).style('fill','#060D11')
      svgElement.append('rect').attr('x',1002).attr('y',78).attr('width',30).attr('height',30).style('fill','#214158')
      svgElement.append('rect').attr('x',1002).attr('y',108).attr('width',30).attr('height',30).style('fill','#3C76A0')
      svgElement.append('rect').attr('x',1002).attr('y',138).attr('width',30).attr('height',30).style('fill','#4A8BBA')
      svgElement.append('rect').attr('x',1002).attr('y',168).attr('width',30).attr('height',30).style('fill','#73A6CA')
      svgElement.append('rect').attr('x',1002).attr('y',198).attr('width',30).attr('height',30).style('fill','#91B9D5')
      svgElement.append('rect').attr('x',1002).attr('y',228).attr('width',30).attr('height',30).style('fill','#BAD3E5')

      svgElement.append('text')
        .attr('transform', 'translate('+(450)+' ,'+(630)+')')
        .style('text-anchor', 'middle')
        .text(`Created by egbonjefri for freeCodeCamp`)
        .style('font',"12px sans-serif")
        .attr('fill', 'black')
        svgElement.append('text')
        .attr('transform', 'translate('+(855)+' ,'+(590)+')')
        .style('text-anchor', 'middle')
        .text(`Source: `)
        .style('font',"15px sans-serif")
        .attr('fill', 'black')
        svgElement.append('text')
        .attr('transform', 'translate('+(1000)+' ,'+(590.5)+')')
        .style('text-anchor', 'middle')
        .html(`<a target='_blank' href='https://ers.usda.gov/data-products/county-level-data-sets/download-data.aspx'>USDA Economic Research Service</a>`)
        .style('font',"15px sans-serif")
        .style('text-decoration', 'underline')
        .attr('fill', 'black')
        svgElement.append('text')
        .attr('transform', 'translate('+(450)+' ,'+(-50)+')')
        .style('text-anchor', 'middle')
        .text(`United States Educational Attainment (2010-2014)`)
        .style('font',"36px sans-serif")
        .attr('fill', 'black')
        svgElement.append('text')
        .attr('transform', 'translate('+(450)+' ,'+(-20)+')')
        .style('text-anchor', 'middle')
        .text(`Percentage of individuals (aged 25 or older) with a Bachelor's Degree or higher`)
        .style('font',"18px sans-serif")
        .attr('fill', 'black')
  }, [])



  return (
    <div className="body">
      <svg ref={ref} 
    viewBox='-250 -100 1400 800'>
    </svg>
    </div>
  );
}

export default App;
