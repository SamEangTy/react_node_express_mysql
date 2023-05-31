import { SaveFilled } from "@ant-design/icons";
import { Button, Divider, Form, Image, Input, Modal, Space } from "antd"
import React, { Fragment } from "react";

const ModalForm = ({
    open=false,
    title=null,
    footer=null,
    onCancel,
    onOk,
    onFinish,
    onChnageFile,
    items,
    imgFile
}) => {
    const [form] = Form.useForm()

    React.useEffect(()=>{
        if(items != null){
            form.setFieldsValue({
                category_id: items.category_id,
                name : items.name,
                description : items.description,
                parent : items.parent
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
        >
            <Form
                form={form}
                name="form_category"
                layout='vertical'
                onFinish={(item)=>{
                    form.resetFields()
                    onFinish(item)
                }}
            >
                <Divider/> 

                <Form.Item
                    label={"Category name"}
                    name={"name"}
                    rules={[{ 
                        required: true, message: 'Please input category name!' 
                    }]}
                >
                    <Input 
                        placeholder="Category name" 
                    />
                </Form.Item>

                <Form.Item
                    label={"Description"}
                    name={"description"}
                >
                    <Input 
                        placeholder="Description" 
                    />
                </Form.Item>

                <Form.Item>
                    <input 
                        type="file"
                        onChange={onChnageFile}
                    />
                    {imgFile && 
                        <Image 
                            width={80}
                            alt={imgFile} 
                            src={imgFile}
                        />
                    }
                </Form.Item>

                <Form.Item
                    label={"Parent"}
                    name={"parent"}
                >
                    <Input 
                        placeholder="Parent" 
                    />
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