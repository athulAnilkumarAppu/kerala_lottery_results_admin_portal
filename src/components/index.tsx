import { useEffect, useState } from "react"

import { toast } from 'react-toastify';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import axios from 'axios'
import ResultGrid from "./ResultGrid"



const AdminPortalIndex = ()=> {

    const [lotteryName, setLotteryName] = useState<string>('')
    const [firstPrice, setFirstPrice] = useState<string>('')
    const [secondPrice, setSecondPrice] = useState<string>('')

    const [thirdPrice, setThirdPrice] = useState<any>([])
    const [fourthPrice, setFourthPrice] = useState<any>([])
    const [fifthPrice, setFifthPrice] = useState<any>([])

    const [thirdPriceCount, setThirdPriceCount] = useState<number>(1)
    const [fourthPriceCount, setFourthPriceCount] = useState<number>(1)
    const [fifthPriceCount, setFifthPriceCount] = useState<number>(1)

    const [finalData, setFinalData] = useState<any>(null)

    const [allAdminResult, setAllAdminResult] = useState<any>([])

    const [mode, setMode] = useState<string>('add')

    const [editDate,  setEditDate] = useState<any>('')

    const [gridLoading, setGridLoading] = useState<boolean>(false)

    const addButtonDisabled = ()=> {
        if(lotteryName !== '' && firstPrice !== '' && secondPrice !== '' && thirdPrice?.length > 0 && fourthPrice?.length > 0 && fifthPrice?.length > 0){
            return false
        }
        return true
    }

    useEffect(()=> {
        const date =  Date()
        const result = {
          [date] :  
                {
                  "id": date,
                  "name": lotteryName,
                  "date": date,
                  "result": {
                    "firstPrize": firstPrice,
                    "secondPrize": secondPrice,
                    "thirdPrize": thirdPrice,
                    "fourthPrize": fourthPrice,
                    "fifthPrize": fifthPrice
                  }
                }
              
        }

        setFinalData(result)
    },[lotteryName, firstPrice,secondPrice,thirdPrice,fourthPrice,fifthPrice ])

    const getAllResultService = async ()=> {
        setGridLoading(true)
        await  axios.post('https://pdfcontentreader-1.onrender.com/getAllAdminResults', {}).then((response: any)=> {
            if(response){
                setAllAdminResult(response?.data?.fullResult ? response.data.fullResult : [])
            }else{
                toast.success('Something went wrong')
            }
        }).catch(()=> {
            toast.success('Something went wrong')
        }).finally(()=> {
            setGridLoading(false)
        })
    }

    useEffect(()=> {
        getAllResultService()
    },[])

    const onThirdPriceAddClick = ()=> {
        setThirdPriceCount(thirdPriceCount + 1)
    }

    const onFourthPriceAddClick = ()=> {
        setFourthPriceCount(fourthPriceCount + 1)
    }

    const onFifthPriceAddClick = ()=> {
        setFifthPriceCount(fifthPriceCount + 1)
    }

    const onLotteryNameChange = (e: any)=> {
        setLotteryName(e.target.value)
    }

    const onFirstPriceChange = (e: any)=> {
        setFirstPrice(e.target.value)
    }

    const onSecondPriceChange = (e: any)=> {
        setSecondPrice(e.target.value)
    }

    const onThirdPriceChange = (e: any, k: number)=> {
        const val = e.target.value
        const valArray = Array(thirdPriceCount).fill('').map((item: any, innerKey: number)=> {
            if(innerKey === k){
                return val
            }else{
                return thirdPrice[innerKey] ? thirdPrice[innerKey] : ''
            }
        })
        setThirdPrice(valArray)
    }

    const onFourthPriceChange = (e: any, k: number)=> {
        const val = e.target.value
        const valArray = Array(fourthPriceCount).fill('').map((item: any, innerKey: number)=> {
            if(innerKey === k){
                return val
            }else{
                return fourthPrice[innerKey] ? fourthPrice[innerKey] : ''
            }
        })

        setFourthPrice(valArray)
    }

    const onFifthPriceChange = (e: any, k: number)=> {
        const val = e.target.value
        const valArray = Array(fifthPriceCount).fill('').map((item: any, innerKey: number)=> {
            if(innerKey === k){
                return val
            }else{
                return fifthPrice[innerKey] ? fifthPrice[innerKey] : ''
            }
        })

        setFifthPrice(valArray)
    }

    const onThirdPriceRemoveClick = (k: number)=> {
        const decCount = thirdPriceCount - 1
        const removedArray = Array(decCount).fill('').map((item: any, innerKey: number)=> {
            if(innerKey !== k){
                return thirdPrice[innerKey]
            }
        })
       
        setThirdPrice(removedArray)
        thirdPriceCount > 1 && setThirdPriceCount(decCount)
       
    }

    const onFourthPriceRemoveClick = (k: number)=> {
        const decCount = fourthPriceCount - 1
        const removedArray = Array(decCount).fill('').map((item: any, innerKey: number)=> {
            if(innerKey !== k){
                return fourthPrice[innerKey]
            }
        })
       
        setFourthPrice(removedArray)
        fourthPriceCount > 1 && setFourthPriceCount(decCount)
    }

    const onFifthPriceRemoveClick = (k: number)=> {
        const decCount = fifthPriceCount - 1
        const removedArray = Array(decCount).fill('').map((item: any, innerKey: number)=> {
            if(innerKey !== k){
                return fifthPrice[innerKey]
            }
        })
       
        setFifthPrice(removedArray)
        fifthPriceCount > 1 && setFifthPriceCount(decCount)
    }


    const onAddTodayResultClick = async ()=> {
        const params = finalData
        axios.post('https://pdfcontentreader-1.onrender.com/addTodaysResult', params).then((response: any)=> {
            if(response){
                getAllResultService()

                toast.success('Result added successfully')
                setEditDate('')
                setThirdPrice([''])
                setFourthPrice([''])
                setFifthPrice([''])
                setThirdPriceCount(1)
                setFourthPriceCount(1)
                setFifthPriceCount(1)
                setLotteryName('')
                setFirstPrice('')
                setSecondPrice('')
                
            }else{
                toast.success('Something went wrong')
            }
        }).catch(()=> {
            toast.success('Something went wrong')
        })
    }

    const onUpdateClick = ()=> {
        const result =   
                  {
                    "id": editDate,
                    "name": lotteryName,
                    "date": editDate,
                    "result": {
                      "firstPrize": firstPrice,
                      "secondPrize": secondPrice,
                      "thirdPrize": thirdPrice,
                      "fourthPrize": fourthPrice,
                      "fifthPrize": fifthPrice
                    }
                  }
                
          
        const params = {id: editDate, updatedData: result}
        axios.post('https://pdfcontentreader-1.onrender.com/updateResultById', params).then((response: any)=> {
            if(response){
                getAllResultService()

                toast.success('Result updated successfully')
                setMode('add')
                setEditDate('')
                setThirdPrice([''])
                setFourthPrice([''])
                setFifthPrice([''])
                setThirdPriceCount(1)
                setFourthPriceCount(1)
                setFifthPriceCount(1)
                setLotteryName('')
                setFirstPrice('')
                setSecondPrice('')
               
            }else{
                toast.success('Something went wrong')
            }
        }).catch(()=> {
            toast.success('Something went wrong')
        })
    }
    



    return <>
  <Container className="Container">
      <Row>
        <h1>Add today's result</h1>
      </Row>
      <Row className="input-container">
        <Col>
          <div>
            <label htmlFor="lotteryName">Lottery Name</label>
            <input
              type="text"
              id="lotteryName"
              value={lotteryName}
              onChange={(e) => onLotteryNameChange(e)}
            />
          </div>
        </Col>
      </Row>
      <Row className="input-container">
        <Col>
          <div>
            <label htmlFor="firstPrice">First Prize</label>
            <input
              type="text"
              id="firstPrice"
              value={firstPrice}
              onChange={(e) => onFirstPriceChange(e)}
            />
          </div>
        </Col>
      </Row>
      <Row className="input-container">
        <Col>
          <label htmlFor="secondPrice">Second Prize</label>
          <input
            type="text"
            id="secondPrice"
            value={secondPrice}
            onChange={(e) => onSecondPriceChange(e)}
          />
        </Col>
      </Row>
      <Row className="input-container">
        <Col>
          <label>Third Prize</label> <Button onClick={() => onThirdPriceAddClick()}>Add</Button>
          <ul>
            {Array(thirdPriceCount).fill(null).map((item, k) => {
              return (
                <li key={k + 'third'}>
                  <input
                    type="text"
                    value={thirdPrice[k]}
                    onChange={(e) => onThirdPriceChange(e, k)}
                  />
                  {thirdPrice?.length > 1 && (
                    <Button onClick={() => onThirdPriceRemoveClick(k)}>remove</Button>
                  )}
                </li>
              );
            })}
          </ul>
        </Col>
      </Row>
      <Row className="input-container">
        <Col>
          <label>Fourth Prize</label> <Button onClick={() => onFourthPriceAddClick()}>Add</Button>
          <ul>
            {Array(fourthPriceCount).fill(null).map((item, k) => {
              return (
                <li key={k + 'fourth'}>
                  <input
                    type="text"
                    value={fourthPrice[k]}
                    onChange={(e) => onFourthPriceChange(e, k)}
                  />
                  {fourthPrice?.length > 1 && (
                    <Button onClick={() => onFourthPriceRemoveClick(k)}>remove</Button>
                  )}
                </li>
              );
            })}
          </ul>
        </Col>
      </Row>
      <Row className="input-container">
        <Col>
          <label>Fifth Prize</label> <Button onClick={() => onFifthPriceAddClick()}>Add</Button>
          <ul>
            {Array(fifthPriceCount).fill(null).map((item, k) => {
              return (
                <li key={k + 'fifth'}>
                  <input
                    type="text"
                    value={fifthPrice[k]}
                    onChange={(e) => onFifthPriceChange(e, k)}
                  />
                  {fifthPrice?.length > 1 && (
                    <Button onClick={() => onFifthPriceRemoveClick(k)}>remove</Button>
                  )}
                </li>
              );
            })}
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            className="add-update-button"
            disabled={addButtonDisabled()}
            onClick={mode === 'add' ? () => onAddTodayResultClick() : () => onUpdateClick()}
          >
            {mode === 'add' ? "Add today's Result" : 'Update'}
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <ResultGrid
            className="ResultGrid"
            allAdminResults={allAdminResult}
            setLotteryName={setLotteryName}
            setFirstPrice={setFirstPrice}
            setSecondPrice={setSecondPrice}
            setThirdPrice={setThirdPrice}
            setFourthPrice={setFourthPrice}
            setFifthPrice={setFifthPrice}
            setThirdPriceCount={setThirdPriceCount}
            setFourthPriceCount={setFourthPriceCount}
            setFifthPriceCount={setFifthPriceCount}
            setMode={setMode}
            setEditDate={setEditDate}
            getAllResultService={getAllResultService}
            gridLoading={gridLoading}
          />
        </Col>
      </Row>
    </Container>
    
    </>
}

export default AdminPortalIndex