import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react'
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { MDBContainer } from "mdbreact";
import { Line } from "react-chartjs-2";
import {Bar} from 'react-chartjs-2';


export default function CovidStat() {

    const [covidData, setCovidData] = useState([]);
    const [tableContent, setTableContent] = useState();
    const [graphContent, setGraphContent] = useState();
    const [tableShow, setTableShow] = useState(true)
    const [graphShow, setGraphShow] = useState(false)

    useEffect(() => {
        axios.get('https://api.covid19api.com/summary').then((res) => {
            setCovidData(res.data.Countries);

        }).catch(error => { console.log(error) })

    }, [])


    function max() {
        let maxNew = 0;
        let maxIdTemp;
        covidData.map(obj => {
            if (obj.TotalConfirmed > maxNew) {
                maxNew = obj.TotalConfirmed;
                maxIdTemp = obj.ID;
            }
        })

        let tableDataMax = covidData.map(obj => {
            if (maxIdTemp === obj.ID) {
                return (
                    <tr key={obj.ID}>
                        <td>{obj.Country}</td>
                        <td>{obj.TotalConfirmed}</td>
                        <td>{obj.TotalDeaths}</td>
                        <td>{obj.TotalConfirmed - obj.TotalRecovered - obj.TotalDeaths}</td>
                        <td>{obj.TotalRecovered}</td>
                        <td>{obj.NewConfirmed}</td>
                        <td>{obj.NewDeaths}</td>
                        <td>{obj.NewRecovered}</td>
                    </tr>

                )
            }

        })

        setTableContent(tableDataMax);
    }

    function zero() {
        let tableDataZero = covidData.map(obj => {
            if (obj.NewConfirmed === 0) {
                return (

                    <tr key={obj.ID}>
                        <td>{obj.Country}</td>
                        <td>{obj.TotalConfirmed}</td>
                        <td>{obj.TotalDeaths}</td>
                        <td>{obj.TotalConfirmed - obj.TotalRecovered - obj.TotalDeaths}</td>
                        <td>{obj.TotalRecovered}</td>
                        <td>{obj.NewConfirmed}</td>
                        <td>{obj.NewDeaths}</td>
                        <td>{obj.NewRecovered}</td>
                    </tr>

                )
            }

        })

        setTableContent(tableDataZero);

    }

    function all() {
        let tableDataAll = covidData.map(obj => {
            return (

                <tr key={obj.ID}>
                    <td>{obj.Country}</td>
                    <td>{obj.TotalConfirmed}</td>
                    <td>{obj.TotalDeaths}</td>
                    <td>{obj.TotalConfirmed - obj.TotalRecovered - obj.TotalDeaths}</td>
                    <td>{obj.TotalRecovered}</td>
                    <td>{obj.NewConfirmed}</td>
                    <td>{obj.NewDeaths}</td>
                    <td>{obj.NewRecovered}</td>
                </tr>

            )
        })

        setTableContent(tableDataAll);

    }

    function zero() {
        let tableDataZero = covidData.map(obj => {
            if (obj.NewConfirmed === 0) {
                return (

                    <tr key={obj.ID}>
                        <td>{obj.Country}</td>
                        <td>{obj.TotalConfirmed}</td>
                        <td>{obj.TotalDeaths}</td>
                        <td>{obj.TotalConfirmed - obj.TotalRecovered - obj.TotalDeaths}</td>
                        <td>{obj.TotalRecovered}</td>
                        <td>{obj.NewConfirmed}</td>
                        <td>{obj.NewDeaths}</td>
                        <td>{obj.NewRecovered}</td>
                    </tr>

                )
            }

        })

        setTableContent(tableDataZero);

    }

    function bestRecovery() {

        let best = Number.MIN_VALUE;
        let bestIdTemp;
        covidData.map(obj => {
            if (obj.TotalRecovered / obj.TotalConfirmed > best) {
                best = obj.TotalRecovered / obj.TotalConfirmed;
                bestIdTemp = obj.ID;
            }
        })

        let tableDataBest = covidData.map(obj => {
            if (bestIdTemp === obj.ID) {
                return (
                    <tr key={obj.ID}>
                        <td>{obj.Country}</td>
                        <td>{obj.TotalConfirmed}</td>
                        <td>{obj.TotalDeaths}</td>
                        <td>{obj.TotalConfirmed - obj.TotalRecovered - obj.TotalDeaths}</td>
                        <td>{obj.TotalRecovered}</td>
                        <td>{obj.NewConfirmed}</td>
                        <td>{obj.NewDeaths}</td>
                        <td>{obj.NewRecovered}</td>
                    </tr>

                )
            }

        })

        setTableContent(tableDataBest);

    }

    function graph() {

        const countryList=[];
        covidData.map((item)=>{
            countryList.push(item.Country);
        })

        const totalConfirmedList=[];
        covidData.map((item)=>{
            totalConfirmedList.push(item.TotalConfirmed);
        })        

        // console.log(countryList);
        // console.log(totalConfirmedList);

        const graphState = {
            labels: countryList,
            datasets: [
                {
                    label: 'Total Confirmed',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: totalConfirmedList
                }
            ]
        }

        const graphData=
            <div>
                <Bar
                    data={graphState}
                    options={{
                        title: {
                            display: true,
                            text: 'Covid data',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
        


        setGraphContent(graphData)

    }

    return (
        <div>
            <div>
                <button className="btn btn-info btn-lg" onClick={all}>All</button>
                <button className="btn btn-warning btn-lg" onClick={max}>Max</button>
                <button className="btn btn-success btn-lg" onClick={zero}>Zero</button>
                <button className="btn btn-dark btn-lg" onClick={bestRecovery}>Best</button>
                <button className="btn btn-danger btn-lg" onClick={graph}>Graph</button>
            </div>

            { <table id="myTable" className="table table-striped table-hover text-left">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Country</th>
                        <th scope="col">Total Confirmed</th>
                        <th scope="col">Total Deaths</th>
                        <th scope="col">Total Active</th>
                        <th scope="col">Total Recovered</th>
                        <th scope="col">New Confirmed</th>
                        <th scope="col">New Deaths</th>
                        <th scope="col">New Recovered</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table> }

            <div>
                {graphContent}
            </div>


        </div>
    )
}