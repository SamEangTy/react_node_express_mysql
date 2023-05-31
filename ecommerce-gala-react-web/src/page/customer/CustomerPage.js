import "./CustomerPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  DatePicker,
  Button,
  Space,
  Popconfirm,
  Input,
  Modal,
  Divider,
  Select,
  Radio,
  ConfigProvider,
  Spin,
  message,
  Table,
  Image,
} from "antd";
import { Config } from "../../util/service";
import {
  DeleteFilled,
  EditFilled,
  SaveFilled,
  FilterOutlined,
  CompassOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { request } from "../../util/api";
import { formatDateForClient } from "../../util/service";
import dayjs from "dayjs";
// import 'dayjs/locale/km';
// import locale from 'antd/es/date-picker/locale/km_KH';
import "dayjs/locale/en";
import locale from "antd/locale/en_US";
// import { request } from "../../util/api"

const { Option } = Select;
const CustomerPage = () => {
  const [list, setList] = useState([]);
  const [totalRcord, setTotalRecord] = useState(0);
  const [defaultPageSize, setDefaultPageSize] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("1");
  const [dob, setDob] = useState(dayjs()); // return current date
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState(1);
  const [customerId, setCustomerID] = useState(null);
  const [imageProfile,setImageProfile] = useState(null)

  const [textSearch, setTextSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getList(); // call funcion getList
  }, [page]);

  // create a function fetch data from api
  const getList = () => {
    setLoading(true);
    request("get", "customer/get-list?page=" + page).then((res) => {
      if (res) {
        setList(res.data.list_customer);
        setTotalRecord(res.data.total_record);
        setDefaultPageSize(res.data.pagination);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  const onConfirmDelete = (id) => {
    setLoading(true);
    request("delete", "customer/delete/" + id).then((res) => {
      getList();
      setLoading(false);
      message.success(res.data.message);
    });
  };

  const handleCancel = () => {
    setVisibleModal(false);
    clearForm();
    setImageProfile(null)
  };

  const handSubmit = () => {
    setLoading(true);
    if (customerId == null) {
      var form = new FormData()
      form.append("firstname",firstname)
      form.append("lastname",lastname)
      form.append("gender",gender)
      form.append("dob",dayjs(dob).format("YYYY-MM-DD"))
      form.append("tel",tel)
      form.append("email",email)
      form.append("is_active",isActive)
      form.append("password",123456)
      form.append("username",email)
      form.append("myfile",imageProfile,imageProfile.name)

      // var param = {
      //   firstname: firstname,
      //   lastname: lastname,
      //   gender: gender,
      //   dob: dayjs(dob).format("YYYY-MM-DD"),
      //   tel: tel,
      //   email: email,
      //   is_active: isActive,
      // }
      request("post", "customer/create",form ).then((res) => {
        getList();
        clearForm();
        setVisibleModal(false);
        setLoading(false);
        message.success(res.data.message);
      });
    } else {

      var form = new FormData()
      form.append("customer_id",customerId)
      form.append("firstname",firstname)
      form.append("lastname",lastname)
      form.append("gender",gender)
      form.append("dob",dayjs(dob).format("YYYY-MM-DD"))
      form.append("tel",tel)
      form.append("email",email)
      form.append("is_active",isActive)
      form.append("password",123456)
      form.append("username",email)
      if(imageProfile){
        form.append("myfile",imageProfile,imageProfile.name)
      }
      

      request("put", "customer/update",form).then((res) => {
        getList();
        clearForm();
        setVisibleModal(false);
        setLoading(false);
        message.success(res.data.message);
      });
    }
  };

  const clearForm = () => {
    setFirstname("");
    setLastname("");
    setGender("1");
    setDob(dayjs());
    setTel("");
    setEmail("");
    setIsActive(1);
    setCustomerID(null);
    setImageProfile(null)
  };

  const handleCloseModal = () => {
    setVisibleModal(false);
    clearForm();
    setImageProfile(null)
  };

  const handleOpenModal = () => {
    setVisibleModal(true);
  };

  const handleClickEdit = (item, index) => {
    setVisibleModal(true);

    setFirstname(item.firstname);
    setLastname(item.lastname);
    setGender(item.gender + "");
    setDob(dayjs(item.dob).format("YYYY-MM-DD"));
    setTel(item.tel);
    setEmail(item.email);
    setIsActive(item.is_active);
    setCustomerID(item.customer_id);
  };

  const getStringGender = (gender) => {
    if (gender == 1) {
      return "Male";
    } else {
      return "Female";
    }
  };

  const onChangeImageProfile = (e) => {
    setImageProfile(e.target.files[0])
  }


  return (
    <div>
      <Spin spinning={loading}>
        <div className="rowBetween">
          <div>
            <Space>
              <div className="pageTitle">Customer</div>
              <Input.Search
                placeholder="Search"
                onChange={(event) => {
                  setTextSearch(event.target.value);
                }}
              />
              <DatePicker />
              <DatePicker />
              <Button onClick={() => getList()} type="primary">
                <FilterOutlined />
              </Button>
            </Space>
          </div>
          <Button onClick={handleOpenModal} type="primary">
            <SaveFilled /> Create New
          </Button>
        </div>
        <Table
          size="small"
          bordered={true}
          dataSource={list}
          pagination={{
            total: totalRcord, // tatal record
            defaultPageSize: Config.pagination, // total page
            defaultCurrent: 1,
            onChange: (page) => {
              setPage(page);
            },
          }}
          columns={[
            {
              title: "No",
              render: (value, record, index) => (index + 1)+"/"+(record.customer_id),
              // render : (value,record,index) => (<Button>{index+1}</Button>)
              // render : (value,record,index) => (
              //   <div>
              //     <div>{index}</div>
              //   </div>
              // )
            },
            {
              title: "Firstname",
              dataIndex: "firstname",
              key: "firstname",
              filtered: true,
            },
            {
              title: "Lastname",
              dataIndex: "lastname",
              key: "lastname",
            },
            {
              title: "Gender",
              dataIndex: "gender",
              key: "gender",
              render: (value, record, index) =>
                value == 1 ? "Male" : "Female", //
            },
            {
              title: "Dob",
              dataIndex: "dob",
              key: "dob",
              render: (value) => formatDateForClient(value),
            },
            {
              title: "Tel",
              dataIndex: "tel",
              key: "tel",
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Image",
              dataIndex: "image",
              key: "image",
              render : (item) => {
                return (
                  <div style={{textAlign:'center'}}>
                    {item != null ?
                      <img 
                        src={Config.imagePath+item}
                        alt={item}
                        width={50}
                        // height={60}
                        
                      />
                      :

                      <UserOutlined 
                        style={{fontSize:50}}
                      />
                    } 
                  </div>
                )
              }
            },
            // http://localhost/image_path/ecm_backend_g1/6c9ff491542e468927b541a37509e554
            {
              title: "Action",
              render: (_, record, index) => (
                <Space>
                  <Popconfirm
                    placement="topRight"
                    title={"Delete"}
                    description={"Are sure to remove this customer"}
                    onConfirm={() => onConfirmDelete(record.customer_id)}
                    okText="Delete"
                    cancelText="No"
                  >
                    <Button danger={true} size="small">
                      <DeleteFilled />
                    </Button>
                  </Popconfirm>

                  <Button
                    size="small"
                    type="primary"
                    onClick={() => handleClickEdit(record, index)}
                  >
                    <EditFilled />
                  </Button>
                </Space>
              ),
            },
          ]}
        />
        <Modal
          open={visibleModal}
          title={customerId == null ? "New customer" : "Update customer"}
          onCancel={handleCloseModal}
          footer={null}
          maskClosable={false}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Input
              value={firstname}
              placeholder="firstname"
              onChange={(event) => {
                setFirstname(event.target.value);
              }}
            />
            <Input
              value={lastname}
              placeholder="lastname"
              onChange={(event) => {
                setLastname(event.target.value);
              }}
            />
            <Select
              value={gender}
              defaultValue={"1"}
              style={{ width: "100%" }}
              onChange={(value) => {
                setGender(value);
              }}
            >
              <Option value={"1"}>Male</Option>
              <Option value={"0"}>Female</Option>
            </Select>
            <ConfigProvider locale={locale}>
              <DatePicker
                style={{ width: "100%" }}
                placement="bottomLeft"
                placeholder="Date of birth"
                format={"DD/MM/YYYY"} // user client
                value={dayjs(dob, "YYYY-MM-DD")} // for date picker
                onChange={(date_js, dateString) => {
                  setDob(date_js);
                }}
              />
            </ConfigProvider>

            <Input
              value={tel}
              placeholder="tel"
              onChange={(event) => {
                setTel(event.target.value);
              }}
            />

            <Input
              value={email}
              placeholder="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            <Radio.Group
              value={isActive}
              onChange={(event) => {
                setIsActive(event.target.value);
              }}
            >
              <Radio value={1}>Actived</Radio>
              <Radio value={0}>Disabled</Radio>
            </Radio.Group>

            {/* aaaa */}
            <div>
              <input 
                type={"file"}
                onChange={onChangeImageProfile}
              />
            </div>

            <Space style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handSubmit} type="primary">
                {customerId == null ? "Save" : "Update"}
              </Button>
            </Space>
          </Space>
        </Modal>
      </Spin>
    </div>
  );
};

export default CustomerPage;
