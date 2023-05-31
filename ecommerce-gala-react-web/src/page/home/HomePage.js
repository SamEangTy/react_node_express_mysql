import React from 'react';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import {useNavigate} from "react-router-dom"
import "./HomePage.css"

const HomeScreen  = () => {
  const saleSummary = [
    {
      title: "This month",
      total_amount : 10020,
      total_item : 1345,
      total_invoice : 990
    },
    {
      title: "Last month",
      total_amount : 10020,
      total_item : 1345,
      total_invoice : 990
    },
    {
      title: "Last 3 months",
      total_amount : 10020,
      total_item : 1345,
      total_invoice : 990
    },
  ]
  return (
    <div>
      <div className='txt-title'>Sale Summary</div>
      <Row gutter={[10]}>
        {saleSummary.map((item,index)=>
          <Col key={index} span={8}>
            <div className='home-grid'>
              <div>
                <div className='txt-main'>{item.title}</div>
                <div className='txt-invoice'>{item.total_invoice} Invoices</div>
              </div>
              <div className='conten-amount'>
                <div className='txt-amount'>{(item.total_amount).toFixed(2)}$</div>
                <hr/>
                <div className='txt-item'>{item.total_item}PCS</div>
              </div>
            </div> 
          </Col>
        )}
        
      </Row>
    </div>
  )
  
};

export default HomeScreen;