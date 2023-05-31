import { SaveFilled } from "@ant-design/icons";
import { Button, Col, Divider, Form, Image, Input, InputNumber, Modal, Radio, Row, Select, Space } from "antd"
import React from "react";
import { Config } from "../../util/service";

const ModalForm = ({
    open=false,
    title=null,
    footer=null,
    onCancel,
    onOk,
    onFinish,
    onChangeImage,
    items,
    imgFile,
    listCategory
}) => {
    const [form] = Form.useForm() // 

    React.useEffect(()=>{
        if(items != null){
            form.setFieldsValue({
                category_id: items.category_id,
                name : items.name,
                price : items.price,
                barcode : items.barcode,
                quantity : items.quantity,
                description : items.description,
                status : items.status,
            })
        }
    },[items])


    const handleCancel = () => {
        form.resetFields() // clear data in form
        onCancel()
    }


    return (
        <Modal
            open={open}
            title={title}
            onCancel={handleCancel}
            onOk={onOk}
            footer={footer}
            maskClosable={false}
            width={"50%"}
            
        >
            <Form
                encType="multipart/form-data"
                form={form}
                name="form_product"
                layout='vertical'
                onFinish={(item)=>{
                    form.resetFields()
                    onFinish(item)
                }}
                initialValues={{
                    status:1
                }}
            >
                <Divider/> 

                <Form.Item
                    label={"Product name"}
                    name={"name"}
                    rules={[{ 
                        required: true, message: 'Please input product name!' 
                    }]}
                    // hasFeedback={<SaveFilled/>}
                    // validateStatus="error"
                    // help="Username does not exist!"
                >
                    <Input 
                        placeholder="Product name" 
                    />
                </Form.Item>

                <Row gutter={5}>
                    <Col span={12}>
                        <Form.Item
                            label={"Barcode"}
                            name={"barcode"}
                            rules={[{ 
                                required: true, message: 'Please input product barcode!' 
                            }]}
                        >
                            <Input 
                                placeholder="Barcode" 
                                disabled={items != null ? true : false }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={"Price"}
                            name={"price"}
                            rules={[{ 
                                required: true, message: 'Please input price!' 
                            }]}
                            
                        >
                            <InputNumber 
                                style={{width:'100%'}}
                                placeholder="Price" 
                            />
                        </Form.Item>
                    </Col>
                </Row>


                <Row gutter={5}>
                    <Col span={12}>
                        <Form.Item
                            label={"Quantity"}
                            name={"quantity"}
                            rules={[{ 
                                required: true, message: 'Please input product quantity!' 
                            }]}
                        >
                            <Input 
                                placeholder="Product quantity" 
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={"Category"}
                            name={"category_id"}
                            rules={[{ 
                                required: true, message: 'Please input product category_id!' 
                            }]}
                        >
                            <Select
                                placeholder="Please select a category"
                                options={listCategory}
                            >

                            </Select>
                        </Form.Item>
                    </Col>
                </Row>


                <Form.Item
                    name={"image"}
                >
                    <input 
                        type="file" 
                        multiple
                        onChange={onChangeImage}
                    />
                   

                    {imgFile != null ? 
                        <Image 
                            src={imgFile}
                            style={{width:100}}
                            alt={imgFile}
                        />
                    :
                        <div>
                            {items && <Image 
                                src={Config.imagePath+items.image}
                                style={{width:100}}
                                alt={items.image}
                            />}
                        </div>
                    }
                    
                    
                </Form.Item>


                <Form.Item
                    label={"Description"}
                    name={"description"}
                >
                    <Input.TextArea 
                        placeholder="Description" 
                    />
                </Form.Item>


                <Form.Item
                    label={"Status"}
                    name={"status"}
                    
                >
                   <Radio.Group>
                        <Radio value={1}>Active</Radio>
                        <Radio value={0}>Disable</Radio>
                   </Radio.Group>
                </Form.Item>

                <Form.Item style={{textAlign:'right'}}>
                    <Space>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="primary" htmlType='submit'><SaveFilled/>{items != null ? "Update" : "Save"}</Button>
                    </Space>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default ModalForm;