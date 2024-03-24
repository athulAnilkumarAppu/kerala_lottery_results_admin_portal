import { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import Button from 'react-bootstrap/Button';

import { toast } from 'react-toastify';

import axios from 'axios'
import GridLoader from "./GridLoader";

const ResultGrid = ({
    allAdminResults, 
    setLotteryName,
    setFirstPrice,
    setSecondPrice,
    setThirdPrice,
    setFourthPrice,
    setFifthPrice,
    setThirdPriceCount,
    setFourthPriceCount,
    setFifthPriceCount,
    setMode,
    setEditDate,
    getAllResultService,
    gridLoading}: any)=> {

    const [gridData, setGridData] = useState<any>([])

    useEffect(()=> {
        const array = Object.keys(allAdminResults).map((item: any)=> allAdminResults[item])
        const data = array.map((item1: any, k: number)=> {
            return {...item1, slNo: k + 1}
        })

        setGridData(data)
    },[allAdminResults])

    const CustomActionCell = (props: any)=> {
        const onEditClick = ()=> {
            setMode('edit')
            setEditDate(props.dataItem.date)
            setThirdPriceCount(props.dataItem.result.thirdPrize?.length)
            setFourthPriceCount(props.dataItem.result.fourthPrize?.length)
            setFifthPriceCount(props.dataItem.result.fifthPrize?.length)
            setLotteryName(props.dataItem.name)
            setFirstPrice(props.dataItem.result.firstPrize)
            setSecondPrice(props.dataItem.result.secondPrize)
            setThirdPrice(props.dataItem.result.thirdPrize)
            setFourthPrice(props.dataItem.result.fourthPrize)
            setFifthPrice(props.dataItem.result.fifthPrize)
        }

        const onDeleteClick = ()=> {
            const params = {id: props.dataItem.date}
            axios.post('https://pdfcontentreader-1.onrender.com/deleteResultById', params).then((response: any)=> {
            if(response){
                getAllResultService()

                toast.success('Result deleted successfully')
            }else{
                toast.success('Something went wrong')
            }
        }).catch(()=> {
            toast.success('Something went wrong')
        })
        }
       return  <td><Button onClick={()=> onEditClick()}>Edit </Button>  <Button className="btn btn-danger" onClick={()=> onDeleteClick()}>Delete</Button></td>
    }


    return <>
    <h1>All datas</h1>

    {gridLoading && <GridLoader />}

    <Grid style={{ height: "100vh", width: '100vw' }} data={gridData}>
      <GridColumn field="slNo" title="Sl No" width="100px" />
      <GridColumn field="date" title="Date" width="150px" />
      <GridColumn field="name" title="Lottery Name" width="150px" />
      <GridColumn field="result.firstPrize" title="First Price"width="150px" />
      <GridColumn field="result.secondPrize" title="Second Price" width="150px"/>
      <GridColumn field="result.thirdPrize" title="Third Price" width="180px"/>
      <GridColumn field="result.fourthPrize" title="Fourth Price" width="180px"/>
      <GridColumn field="result.fifthPrize" title="Fifth Price" width="180px"/>
      <GridColumn  title="Actions" width="200px" cell={(props: any)=> CustomActionCell(props)}/>
    </Grid>
    </>
}

export default ResultGrid