import {useEffect, useState} from 'react'
import { request } from '../../util/api'
import { Button, Image, Popconfirm, Space, Table, message } from 'antd'
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { Config, formatDateForClient, isEmptyOrNull } from '../../util/service'
import PageContainer from '../container/PageContainer'
import ModalForm from './ModalForm'
const ProductPage = () => {
    const [list,setList] = useState([])
    const [listCategory,setListCategory] = useState([])
    const [loading,setLoading] = useState(false)
    const [visibleModal,setVisibleModal] = useState(false)
    const [items,setItems] = useState(null)
    const [imgObj,setImgObj] = useState(null)
    const [imgObjMulti,setImgObjMulti] = useState(null)
    const [imgFile,setImageFile] = useState(null)

    useEffect(()=>{
        getList()
    },[])

    const getList = () => {
        setLoading(true)
        request("get","product/get-list",{}).then(res=>{
            setLoading(false)
            if(res.status == 200){
                var data = res.data 
                setList(data.list)

                var arrTmp = []
                data.list_category.map((item,_)=>{
                  arrTmp.push({
                    label : item.name,
                    value : item.category_id
                  })
                })
                setListCategory(arrTmp)
            }
        })
    }

    const onClickBtnRight = () => {
        setVisibleModal(true)
    }
    const onCloseModalForm = () => {
        setVisibleModal(false)
        setImageFile(null)
        setImgObj(null)
        setItems(null)
    }
    const onClickEditBtn = (param) => {
        setItems(param)
        setVisibleModal(true)
    }
    const onClickDeleteBtn  = (id) => {
        setLoading(true)
        request("delete","product/remove/"+id,{}).then(res=>{
            setLoading(false)
            if(res.status == 200){
                message.success(res.data.message)
                getList()
            }
        })
    }

    const onFinish = (item) => {
        setVisibleModal(false)
        setImageFile(null)
        setImgObj(null)
        setLoading(true)
        var form = new FormData() 
        form.append("name",item.name)
        form.append("barcode",item.barcode)
        form.append("price",item.price)
        form.append("quantity",item.quantity)
        form.append("category_id",item.category_id)
        form.append("description",isEmptyOrNull(item.description) ? null : item.description)
        form.append("status",item.status)
        form.append("create_by",1)
        if(imgObj){
            form.append("image",imgObj,imgObj.filename)
        }
        // if(imgObjMulti){

        //     // for (let i = 0; i < imgObjMulti.length; i++) {
        //     //     form.append("images",imgObjMulti[i],imgObjMulti[i].filename)
        //     // }
           
        // }
        // form.append("images",imgObjMulti)
        var method = "post"
        var url = "product/create"
        if(items != null){
            method = "put"
            url = "product/update"
            form.append("product_id",items.product_id)

        }
        request(method,url,form).then(res=>{
            if(res.status == 200){
                message.success(res.data.message)
                setItems(null)
                getList()
            }
        })
        
    }

    const onSearch = (text) => {
        setLoading(true)
        var param = ""
        if(!isEmptyOrNull(text)){
            param = "?text_search="+text // query parameter
            // param += "&from_date=2023-05-02&to_date=2023-05-02" // YYYY-MM-DD
        }
        request("get","product/get-list"+param,{}).then(res=>{
            setLoading(false)
            
            if(res.status == 200){
                var data = res.data 
                setList(data.list)
            }
        })
    }

    const onChangeImage = (event) => {
        // setImgObjMulti(event.target.files)
        setImgObj(event.target.files[0])// for past to api
        setImageFile(URL.createObjectURL(event.target.files[0])) // for preview
    }

    return (
        <PageContainer
            pageTitle='Product'
            loading={loading}
            btnRight = "New Product"
            onClickBtnRight = {onClickBtnRight}
            search={{
                title : "Product name",
                allowClear:true
            }}
            onSearch={onSearch}
        >
            <Table
                columns={[
                    {
                        title : "No",
                        render : (item,items,index) => (index + 1)+"/"+(items.product_id),
                        key : "No"
                    },
                    {
                        title : "Name",
                        key : "Name",
                        dataIndex:'name'
                    },
                    {
                      title : "Price",
                      key : "Price",
                      dataIndex:'price'
                    },
                    {
                      title : "Quantity",
                      key : "quantity",
                      dataIndex:'quantity'
                    },
                    {
                      title : "Category",
                      key : "category_name",
                      dataIndex:'category_name'
                    },
                    {
                        title : "Description",
                        key : "description",
                        dataIndex:'description'
                    },
                    {
                        title : "Image",
                        key : "image",
                        dataIndex:'image',
                        render : (item) => {
                            return (
                                <Image
                                    width={80}
                                    src={Config.imagePath + item}
                                    alt={item}
                                />
                            )
                        }
                    },
                    {
                        title : "Status",
                        key : "status",
                        dataIndex:'status',
                        render : (item) => item == 1 ? "Actived" : "Disabled"
                    },
                    {
                        title : "Creation",
                        key : "create_at",
                        dataIndex:'create_at',
                        render : (create_at) => formatDateForClient(create_at)
                    },
                    {
                        title : "Action",
                        key : "Action",
                        render : (item,items,index) => {
                            return (
                                <Space>
                                  <Popconfirm
                                    placement="topLeft"
                                    title={"Delete"}
                                    description={"Are sure to romove!"}
                                    onConfirm={()=>onClickDeleteBtn(items.product_id)}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    <Button size='small' danger><DeleteFilled/></Button>
                                  </Popconfirm>
                                    
                                    <Button onClick={()=>onClickEditBtn(items)} size='small' type="primary" ><EditFilled/></Button>
                                </Space>
                            )
                        }
                    },
                ]}
                dataSource={list}
            />
            <ModalForm 
                items={items}
                imgFile={imgFile}
                listCategory={listCategory}
                open={visibleModal}
                title={items != null ? "Update Product" : "New Product"}
                onCancel={onCloseModalForm}
                onFinish={onFinish}
                onChangeImage={onChangeImage}
            />
        </PageContainer>
    )
}

export default ProductPage;