
import { useEffect, useState } from "react";
import PageContainer from "../container/PageContainer"
import {request} from "../../util/api"
import { Button, Space, Table } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { formatDateForClient } from "../../util/service";

const OrderStatusPage = () => {

    const [list,setList] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        getList()
    },[])

    const getList = () => {
        setLoading(true)
        request("get","order-status/get-list",{}).then(res=>{
           var data = res.data 
           setLoading(false)
           if(data && !data.error){
                setList(data.list)
           }
        })
    }

    return (
        <PageContainer
            pageTitle="PaymentMethod"
            loading={loading}
            btnRight={"Save New"}
        >
            <Table
                dataSource={list}            
                columns={[
                    {
                        key : "no",
                        title : "No",
                        render : (item,items,index) => index + 1
                    },
                    {
                        key : "name",
                        title : "Name",
                        dataIndex : "name"
                    },
                    {
                        key : "Description",
                        title : "Description",
                        dataIndex : "description"
                    },
                    {
                        key : "created",
                        title : "Created",
                        dataIndex : "create_at",
                        render : (item) => formatDateForClient(item)
                    },
                    {
                        key : "acton",
                        title : "Action",
                        render : () => {
                            return (
                                <Space>
                                    <Button danger  size="small"><DeleteFilled/></Button>
                                    <Button type="primary" size="small"><EditFilled/></Button>
                                </Space>
                            )
                        }
                    },

                ]}
            />
        </PageContainer>
    )
}

export default OrderStatusPage;