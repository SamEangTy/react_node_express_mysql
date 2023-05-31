
import { useEffect, useState } from "react";
import PageContainer from "../container/PageContainer"
import {request} from "../../util/api"
import {  Col, Empty, Image, Row} from "antd";
import { Config, formatDateForClient } from "../../util/service";

const WishList = () => {

    const [customer,setCustomer] = useState([])
    const [cart_by_customer,setCartByCustomer] = useState([])
    const [loading,setLoading] = useState(false)
    const [indexSelect,setIndexSelect] = useState(0)


    useEffect(()=>{
        getListCustomer()
    },[])

    const getListCustomer = () => {
        setLoading(true)
        request("get","customer/get-list",{}).then(res=>{
           var data = res.data 
           setLoading(false)
           if(data && !data.error){
                setCustomer(data.list_customer)
                getCartByCustomer(data?.list_customer[0]?.customer_id)

           }
        })
    }

    const getCartByCustomer = (id) => {
        setLoading(true)
        request("get","wishlist/get-list/"+id,{}).then(res=>{
           var data = res.data 
           setLoading(false)
           if(data && !data.error){
                setCartByCustomer(data.list)
           }
        })
    }

    return (
        <Row gutter={5}>
            <Col span={10} style={{borderRight:"1px solid #eee"}}>
                <PageContainer
                    pageTitle="WishList"
                    loading={loading}
                    btnRight={"Save New"}
                >
                    {customer.map((item,index)=>{
                        return (
                            <div onClick={()=>{
                                setIndexSelect(index)
                                getCartByCustomer(item.customer_id)
                            }} style={{padding:10,borderBottom: '1px solid #eee',cursor:"pointer",backgroundColor: indexSelect == index && "#ddd"}} key={index}>
                                <div style={{fontSize:14,fontWeight:'bold'}}>{index+1}. {item.firstname}-{item.lastname} | {item.tel}</div>
                                <div>{item.gender == 1 ? "Male" : "Female"}</div>
                                <div>{item.email}</div>
                               
                            </div>
                        )
                    })}
                </PageContainer>
            </Col>
            <Col span={14}>
                {cart_by_customer.map((item,index)=>{
                        return (
                            <div style={{padding:10,borderBottom: '1px solid #eee',cursor:"pointer"}} key={index}>
                              <Row >
                                <Col span={4} style={{borderRight:'1px solid #eee'}} >
                                    <Image
                                        src={Config.imagePath + item.p_image}
                                        width={60}
                                        alt={item.p_image}
                                    />
                                </Col>
                                <Col span={20} style={{paddingLeft:10,marginTop:10}} >
                                    <div>{item.p_name}</div>  
                                    <div>Quantity : {item.quantity}</div>  
                                    <div>{formatDateForClient(item.create_at)}</div>  
                                </Col>
                              </Row>
                            
                            </div>
                        )
                })}
                {cart_by_customer.length == 0 && <Empty/>}
            </Col>
        </Row>
    )
}

export default WishList;